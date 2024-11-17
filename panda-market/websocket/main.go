package main

import (
	"fmt"
	"log"
	"net/http"
	"sync"
	"time"

	"github.com/gorilla/websocket"
	"github.com/rs/cors"
)

type ChatMessage struct {
	ID        string    `json:"id"`
	Content   string    `json:"content"`
	SenderId  string    `json:"senderId"`
	CreatedAt time.Time `json:"createdAt"`
}

type WebSocketServer struct {
	clients   map[*websocket.Conn]bool
	mu        sync.RWMutex
	upgrader  websocket.Upgrader
	broadcast chan ChatMessage
}

func NewWebSocketServer() *WebSocketServer {
	return &WebSocketServer{
		clients: make(map[*websocket.Conn]bool),
		upgrader: websocket.Upgrader{
			CheckOrigin: func(r *http.Request) bool {
				return true
			},
			ReadBufferSize:  1024,
			WriteBufferSize: 1024,
		},
		broadcast: make(chan ChatMessage),
	}
}

func (s *WebSocketServer) HandleConnection(w http.ResponseWriter, r *http.Request) {
	conn, err := s.upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Printf("Upgrade failed: %v", err)
		return
	}

	log.Printf("New client connected from %s", conn.RemoteAddr())

	s.addClient(conn)

	// removeClient를 defer하지 말고 직접
	s.setupPingPong(conn)
	s.readPump(conn)
}

func (s *WebSocketServer) addClient(conn *websocket.Conn) {
	s.mu.Lock()
	s.clients[conn] = true
	s.mu.Unlock()
}

// 기존코드 클라이언트 제거 로직을 여러단계에서 -> lock으로 묶어서 처리하는게 나아보임
func (s *WebSocketServer) removeClient(conn *websocket.Conn) error {
	s.mu.Lock()
	defer s.mu.Unlock()

	if _, exists := s.clients[conn]; !exists {
		return fmt.Errorf("client %s not found", conn.RemoteAddr())
	}

	if err := conn.Close(); err != nil {
		return fmt.Errorf("error closing connection: %v", err)
	}

	delete(s.clients, conn)
	log.Printf("Client %s disconnected", conn.RemoteAddr())
	return nil
}

func (s *WebSocketServer) setupPingPong(conn *websocket.Conn) {
	// TODO: 아래 기능들 구현 필요
	// 1. ConnectionState 초기화 및 설정 (pingInterval = 30s)
	// 2. Ping 핸들러에 타임스탬프 추가하여 레이턴시 측정
	// 3. 능동적 Ping 모니터링 고루틴 시작
	conn.SetPingHandler(func(string) error {
		err := conn.WriteControl(
			websocket.PongMessage,
			[]byte{},
			time.Now().Add(time.Second*60),
		)
		if err != nil {
			log.Printf("Error sending pong to %s: %v", conn.RemoteAddr(), err)
		}
		return err
	})
}

// readPump 개선: 세부적인 에러 처리
func (s *WebSocketServer) readPump(conn *websocket.Conn) {
	defer func() {
		if err := s.removeClient(conn); err != nil {
			log.Printf("Error removing client: %v", err)
		}
	}()

	for {
		var message ChatMessage
		err := conn.ReadJSON(&message)
		if err != nil {
			if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
				log.Printf("Unexpected close error from %s: %v", conn.RemoteAddr(), err)
			} else if websocket.IsCloseError(err, websocket.CloseGoingAway, websocket.CloseNormalClosure) {
				log.Printf("Client %s closed connection normally", conn.RemoteAddr())
			} else {
				log.Printf("Read error from %s: %v", conn.RemoteAddr(), err)
			}
			break
		}

		if !s.validateMessage(&message) {
			continue
		}

		s.broadcast <- message
	}
}

func (s *WebSocketServer) validateMessage(message *ChatMessage) bool {
	if message.Content == "" || message.SenderId == "" {
		log.Printf("Invalid message received from sender %s: %+v", message.SenderId, message)
		return false
	}

	if message.CreatedAt.IsZero() {
		message.CreatedAt = time.Now()
	}

	return true
}

// broadcastMessages 관련 -> 실패한 클라이언트 일괄 처리
func (s *WebSocketServer) broadcastMessages() {
	for message := range s.broadcast {
		failedClients := make([]*websocket.Conn, 0)

		// 읽기 잠금으로 클라이언트 목록 접근
		s.mu.RLock()
		for client := range s.clients {
			err := client.WriteJSON(message)
			if err != nil {
				log.Printf("Failed to send message to %s: %v", client.RemoteAddr(), err)
				failedClients = append(failedClients, client)
			}
		}
		s.mu.RUnlock()

		// 실패한 클라이언트들 일괄 처리
		if len(failedClients) > 0 {
			s.removeFailedClients(failedClients)
		}
	}
}

// 실패한 클라이언트들을 한 번에 처리할때 쓸 메서드
func (s *WebSocketServer) removeFailedClients(failedClients []*websocket.Conn) {
	s.mu.Lock()
	defer s.mu.Unlock()

	for _, client := range failedClients {
		if err := client.Close(); err != nil {
			log.Printf("Error closing failed client %s: %v", client.RemoteAddr(), err)
		}
		delete(s.clients, client)
		log.Printf("Removed failed client: %s", client.RemoteAddr())
	}
}

func (s *WebSocketServer) monitorClients() {
	ticker := time.NewTicker(time.Minute)
	defer ticker.Stop()

	for range ticker.C {
		s.mu.RLock()
		log.Printf("Connected clients: %d", len(s.clients))
		s.mu.RUnlock()
	}
}

func setupRoutes(server *WebSocketServer) http.Handler {
	corsHandler := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:3000"},
		AllowedMethods:   []string{"GET", "POST"},
		AllowCredentials: true,
	})

	mux := http.NewServeMux()
	mux.HandleFunc("/websocket", server.HandleConnection)
	return corsHandler.Handler(mux)
}

func main() {
	server := NewWebSocketServer()

	go server.broadcastMessages()
	go server.monitorClients()

	httpServer := &http.Server{
		Addr:              ":3001",
		Handler:           setupRoutes(server),
		ReadTimeout:       15 * time.Second,
		WriteTimeout:      15 * time.Second,
		IdleTimeout:       60 * time.Second,
		ReadHeaderTimeout: 5 * time.Second,
	}

	log.Println("WebSocket server starting on :3001")
	log.Fatal(httpServer.ListenAndServe())
}

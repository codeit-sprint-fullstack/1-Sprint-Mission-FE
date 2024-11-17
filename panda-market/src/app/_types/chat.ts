export interface User {
  id: string;
  name: string | null;
  image: string | null;
}

export interface Message {
  id: string;
  content: string;
  senderId: string;
  recipientId: string;
  createdAt: Date;
  sender: User;
  recipient: User;
}

export interface ChatResponse {
  messages: Message[];
  nextCursor?: string;
}

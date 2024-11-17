import { PrismaClient } from "@prisma/client";
import { Status } from "@prisma/client";
import pkg from "bcryptjs";
const { hash } = pkg;

const prisma = new PrismaClient();

async function main() {
  await prisma.like.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();

  const user1 = await prisma.user.create({
    data: {
      email: "seller1@example.com",
      name: "판매자1",
      password: await hash("password123", 12),
      image: "/icons/icon-user-profile.svg",
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: "rlagusdn123@codeit.com",
      name: "김현우",
      password: await hash("12341234", 12),
      image: "/icons/icon-user-profile.svg",
    },
  });

  const electronics = [
    {
      title: "애플 아이폰 14 Pro 256GB",
      description:
        "완전 새제품, 미개봉 상태. 자급제폰입니다. 색상: 스페이스 블랙",
      price: 1350000,
      images: [
        "/products/iphone1.jpg",
        "/products/iphone2.jpg",
        "/products/iphone3.jpg",
      ],
      status: Status.AVAILABLE,
      views: Math.floor(Math.random() * 1000),
      sellerId: user1.id,
    },
    {
      title: "삼성 갤럭시 S23 Ultra 512GB",
      description:
        "구매 2개월 된 S23 울트라입니다. 풀박스, 모든 구성품 포함. 상태 S급",
      price: 1100000,
      images: ["/products/s23-1.jpg", "/products/s23-2.jpg"],
      status: Status.AVAILABLE,
      views: Math.floor(Math.random() * 1000),
      sellerId: user2.id,
    },
  ];

  const clothing = [
    {
      title: "구찌 GG 자카드 니트 가디건",
      description: "22FW 구찌 가디건, 사이즈 M, 1회 착용. 택/영수증 있음",
      price: 890000,
      images: ["/products/gucci1.jpg", "/products/gucci2.jpg"],
      status: Status.AVAILABLE,
      views: Math.floor(Math.random() * 1000),
      sellerId: user1.id,
    },
    {
      title: "메종 마르지엘라 독일군 스니커즈",
      description: "마르지엘라 GAT 스니커즈 42사이즈. 상태 좋음",
      price: 350000,
      images: ["/products/margiela1.jpg", "/products/margiela2.jpg"],
      status: Status.SOLD,
      views: Math.floor(Math.random() * 1000),
      sellerId: user2.id,
    },
  ];

  const books = [
    {
      title: "클린 코드 / Clean Code",
      description: "로버트 C. 마틴의 클린 코드. 새책입니다.",
      price: 25000,
      images: ["/products/cleancode1.jpg", "/products/cleancode2.jpg"],
      status: Status.AVAILABLE,
      views: Math.floor(Math.random() * 1000),
      sellerId: user1.id,
    },
    {
      title: "모던 자바스크립트 Deep Dive",
      description: "JS Deep Dive 책 판매합니다. 필기 없음, 상태 좋음",
      price: 35000,
      images: ["/products/jsbook1.jpg", "/products/jsbook2.jpg"],
      status: Status.AVAILABLE,
      views: Math.floor(Math.random() * 1000),
      sellerId: user2.id,
    },
    {
      title: "리액트를 다루는 기술",
      description: "리액트의 기본부터 고급 개념까지 모두 다루는 책입니다.",
      price: 32000,
      images: ["/products/reactbook1.jpg", "/products/reactbook2.jpg"],
      status: Status.AVAILABLE,
      views: Math.floor(Math.random() * 1000),
      sellerId: user1.id,
    },
    {
      title: "자바스크립트 비동기 처리",
      description:
        "자바스크립트의 비동기 처리에 대해 심층적으로 다룬 책입니다.",
      price: 40000,
      images: ["/products/jsasync1.jpg", "/products/jsasync2.jpg"],
      status: Status.SOLD,
      views: Math.floor(Math.random() * 1000),
      sellerId: user1.id,
    },
    {
      title: "Node.js 완벽 가이드",
      description: "Node.js로 서버 개발을 위한 필독서입니다.",
      price: 45000,
      images: ["/products/nodejs1.jpg", "/products/nodejs2.jpg"],
      status: Status.AVAILABLE,
      views: Math.floor(Math.random() * 1000),
      sellerId: user2.id,
    },
    {
      title: "Vue.js 완벽 가이드",
      description: "Vue.js의 기본부터 고급 개념까지 다루는 책입니다.",
      price: 28000,
      images: ["/products/vuejs1.jpg", "/products/vuejs2.jpg"],
      status: Status.AVAILABLE,
      views: Math.floor(Math.random() * 1000),
      sellerId: user1.id,
    },
    {
      title: "TypeScript 완벽 가이드",
      description:
        "TypeScript의 기초부터 고급 사용법까지 학습할 수 있는 책입니다.",
      price: 37000,
      images: ["/products/tsbook1.jpg", "/products/tsbook2.jpg"],
      status: Status.AVAILABLE,
      views: Math.floor(Math.random() * 1000),
      sellerId: user1.id,
    },
    {
      title: "프로그래밍 스킬 향상",
      description: "프로그래밍 실력을 키울 수 있는 실습 중심의 책입니다.",
      price: 29000,
      images: ["/products/progskills1.jpg", "/products/progskills2.jpg"],
      status: Status.SOLD,
      views: Math.floor(Math.random() * 1000),
      sellerId: user2.id,
    },
    {
      title: "프론트엔드 개발자를 위한 웹 접근성",
      description: "웹 접근성 향상을 위한 실용적인 가이드북입니다.",
      price: 33000,
      images: ["/products/accessibility1.jpg", "/products/accessibility2.jpg"],
      status: Status.AVAILABLE,
      views: Math.floor(Math.random() * 1000),
      sellerId: user1.id,
    },
    {
      title: "AI와 머신러닝 입문",
      description: "AI와 머신러닝의 기본 개념을 설명하는 입문서입니다.",
      price: 50000,
      images: ["/products/ai1.jpg", "/products/ai2.jpg"],
      status: Status.AVAILABLE,
      views: Math.floor(Math.random() * 1000),
      sellerId: user1.id,
    },
  ];

  const allProducts = [...electronics, ...clothing, ...books];

  for (const product of allProducts) {
    const createdProduct = await prisma.product.create({
      data: product,
    });

    if (Math.random() > 0.5) {
      await prisma.like.create({
        data: {
          userId: Math.random() > 0.5 ? user1.id : user2.id,
          productId: createdProduct.id,
        },
      });
    }

    if (Math.random() > 0.3) {
      await prisma.comment.create({
        data: {
          content: `상품 상태 문의드립니다. ${Math.random().toString(36).substring(7)}`,
          authorId: Math.random() > 0.5 ? user1.id : user2.id,
          productId: createdProduct.id,
        },
      });
    }
  }
  const posts = [
    {
      title: "Next.js 13 앱 라우터 후기",
      content: `Next.js 13의 새로운 앱 라우터를 사용해봤습니다.
서버 컴포넌트와 클라이언트 컴포넌트의 구분이 명확해져서 좋네요.
라우트 그룹핑과 인터셉팅도 유용한 것 같습니다.
다만 아직 불안정한 부분이 있어서 프로덕션에는 신중히 도입해야 할 것 같아요.`,
      images: ["/community/nextjs1.jpg", "/community/nextjs2.jpg"],
      authorId: user1.id,
      views: Math.floor(Math.random() * 1000),
    },
    {
      title: "타입스크립트 꿀팁 공유",
      content: `타입스크립트를 2년째 사용하면서 알게 된 꿀팁들을 공유합니다.
1. Partial과 Required의 활용
2. 커스텀 타입 가드 작성법
3. satisfies 연산자의 활용
4. const assertion 활용하기
자세한 내용은 본문을 확인해주세요.`,
      images: ["/community/typescript1.jpg"],
      authorId: user2.id,
      views: Math.floor(Math.random() * 1000),
    },
    {
      title: "리액트 성능 최적화 방법",
      content: `리액트 애플리케이션의 성능을 개선하는 방법들을 정리해봤습니다.
- React.memo 적절히 사용하기
- useMemo와 useCallback 활용
- 가상화(Virtualization) 적용
- 코드 스플리팅
- 이미지 최적화
실제 프로젝트에 적용해본 경험을 공유합니다.`,
      images: ["/community/react1.jpg", "/community/react2.jpg"],
      authorId: user1.id,
      views: Math.floor(Math.random() * 1000),
    },
    {
      title: "프리랜서 개발자 1년 회고",
      content: `프리랜서로 1년간 일하면서 경험한 것들을 공유합니다.
작업 시간 관리, 클라이언트와의 소통, 계약서 작성 등
실제로 겪은 일들과 해결 방법에 대해 이야기해보려고 합니다.`,
      images: [],
      authorId: user2.id,
      views: Math.floor(Math.random() * 1000),
    },
    {
      title: "신입 개발자가 알아야 할 것들",
      content: `1년차 개발자가 되면서 알게 된 것들을 공유합니다.
- 깃/깃허브 사용법
- 코드 리뷰 문화
- 테스트 코드 작성
- 문서화의 중요성
- 커뮤니케이션 스킬
실무에서 정말 필요한 것들 위주로 정리했습니다.`,
      images: ["/community/newbie1.jpg"],
      authorId: user1.id,
      views: Math.floor(Math.random() * 1000),
    },
    {
      title: "새로 나온 라이브러리 추천",
      content: `최근에 나온 유용한 라이브러리들을 소개합니다.
1. Jotai - 상태관리 라이브러리
2. TanStack Router - 타입세이프 라우터
3. Tamagui - 리액트 네이티브 UI 라이브러리
각각의 장단점과 사용법을 간단히 설명하겠습니다.`,
      images: [],
      authorId: user2.id,
      views: Math.floor(Math.random() * 1000),
    },
  ];

  // products 생성 후에 posts 생성
  for (const post of posts) {
    const createdPost = await prisma.post.create({
      data: post,
    });

    // 50% 확률로 좋아요 생성
    if (Math.random() > 0.5) {
      await prisma.like.create({
        data: {
          userId: Math.random() > 0.5 ? user1.id : user2.id,
          postId: createdPost.id,
        },
      });
    }

    // 70% 확률로 댓글 생성
    if (Math.random() > 0.3) {
      await prisma.comment.create({
        data: {
          content: `좋은 정보 감사합니다! ${Math.random().toString(36).substring(7)}`,
          authorId: Math.random() > 0.5 ? user1.id : user2.id,
          postId: createdPost.id,
        },
      });
    }
  }

  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

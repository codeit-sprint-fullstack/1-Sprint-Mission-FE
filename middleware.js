import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(req) {
  const { pathname } = req.nextUrl;

  console.log(pathname);
  // /products 경로의 요청을 로그로 남기기
  if (pathname.startsWith("/products")) {
    console.log("Request made to:", pathname);

    // 요청에 쿠키 설정 (예시)
    // const response = NextResponse.next();
    // response.cookies.set("access-token", "cookieValue", {
    //   httpOnly: true, // 클라이언트에서 접근 불가
    //   path: "/", // 쿠키 경로
    // });

    return response;
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/products",
};

import { auth } from "@/auth";
import { NextResponse } from "next/server";

const middleware = auth((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;

    // 인증이 되어야 접근 가능 주소
    const protectedRoutes = ["/mypage", "/chat", "/products/create"];

    // /products/[id]/edit 패턴 체크
    const isProductEditRoute = /^\/products\/\d+\/edit$/.test(nextUrl.pathname);

    // 비로그인 사용자만 접근 가능
    const authRoutes = ["/login"];

    if (
        protectedRoutes.some((route) => nextUrl.pathname.startsWith(route)) ||
        isProductEditRoute
    ) {
        if (!isLoggedIn) {
            return NextResponse.redirect(new URL("/login", nextUrl));
        }
    }

    if (authRoutes.some((route) => nextUrl.pathname.startsWith(route))) {
        if (isLoggedIn) {
            return NextResponse.redirect(new URL("/", nextUrl));
        }
    }
});

export default middleware;

// 아래 경로는 미들웨어 실행하지 않음
export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

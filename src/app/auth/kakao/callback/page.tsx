"use client";

import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useRef, Suspense } from "react";

function KakaoCallbackContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const requestRef = useRef(false);

    useEffect(() => {
        const token = searchParams.get("token");

        if (!token || requestRef.current) return;
        requestRef.current = true;

        const processLogin = async () => {
            try {
                const result = await signIn("kakao-backend", {
                    redirect: false,
                    accessToken: token,
                });

                if (result?.ok) {
                    router.replace("/");
                } else {
                    router.replace("/login?error=signin_failed");
                }
            } catch (err) {
                console.error("로그인 프로세스 실패:", err);
                router.replace("/login?error=server_error");
            }
        };

        processLogin();
    }, [router, searchParams]);

    return (
        <div className="w-screen h-screen flex items-center justify-center font-semibold text-[28px]">
            로그인 중입니다...
        </div>
    );
}

export default function KakaoCallbackPage() {
    return (
        <Suspense
            fallback={
                <div className="w-screen h-screen flex items-center justify-center font-semibold text-[28px]">
                    로그인 중입니다...
                </div>
            }
        >
            <KakaoCallbackContent />
        </Suspense>
    );
}

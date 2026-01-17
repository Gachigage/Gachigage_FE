"use client";

// import { axiosServer } from "@/apis/axiosInstance"; // 제거: 백엔드가 이미 JWT를 직접 전달
import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export default function KakaoCallbackPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const requestRef = useRef(false);

    useEffect(() => {
        const token = searchParams.get("token"); // 변경: code → token

        if (!token || requestRef.current) return;
        requestRef.current = true;

        const processLogin = async () => {
            try {
                // 제거: 백엔드 API 호출 불필요 (이미 JWT를 받았음)
                // const { data } = await axiosServer.get(
                //     `/oauth2/authorization/kakao`,
                //     { params: { code } },
                // );

                const result = await signIn("kakao-backend", {
                    redirect: false,
                    accessToken: token, // 변경: data.accessToken → token (URL에서 직접 받은 JWT)
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

    return <div>로그인중..</div>;
}

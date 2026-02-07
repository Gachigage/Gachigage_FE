"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactNode, useState } from "react";
import { SessionProvider } from "next-auth/react";
import AuthErrorModal from "@/components/molecules/AuthErrorModal";

export default function Providers({ children }: { children: ReactNode }) {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        // 브라우저 탭을 다시 클릭했을 때, 기존 쿼리를 자동으로 다시 가져올지
                        refetchOnWindowFocus: false,
                    },
                },
            })
    );

    return (
        <SessionProvider>
            <QueryClientProvider client={queryClient}>
                {children}
                <AuthErrorModal />
                {/* <ReactQueryDevtools initialIsOpen={false} /> */}
            </QueryClientProvider>
        </SessionProvider>
    );
}

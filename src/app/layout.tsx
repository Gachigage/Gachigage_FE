import type { Metadata } from "next";
import "./globals.css";
import Providers from "./Providers";
import localFont from "next/font/local";
import NewRelic from "@/components/atoms/NewRelic";

const pretendard = localFont({
    src: "../assets/fonts/PretendardVariable.woff2",
    display: "swap",
    weight: "45 920",
    variable: "--font-pretendard",
});

export const metadata: Metadata = {
    title: "같이가게",
    description: "자영업자 플랫폼 같이가게",
    icons: {
        icon: "/favicon.ico",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ko" className={`${pretendard.variable}`}>
            <body className="antialiased">
                {process.env.NODE_ENV === "production" && <NewRelic />}
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}

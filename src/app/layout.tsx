import type { Metadata } from "next";
import "./globals.css";
import Providers from "./Providers";

export const metadata: Metadata = {
    title: "같이가게",
    description: "자영업자 플랫폼 같이가게",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ko">
            <body className="antialiased">
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}

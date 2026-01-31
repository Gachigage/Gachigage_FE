import Header from "@/components/atoms/Header";
import MobileNavigation from "@/components/atoms/MobileNavigation";

export default function ChatLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col w-screen h-screen overflow-hidden">
            <Header />
            {children}
            <MobileNavigation />
        </div>
    );
}

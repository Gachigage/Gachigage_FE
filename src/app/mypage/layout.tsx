import Header from "@/components/atoms/Header";
import MobileNavigation from "@/components/atoms/MobileNavigation";

export default function MypageLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col w-screen">
            <Header />
            {children}
            <MobileNavigation />
        </div>
    );
}

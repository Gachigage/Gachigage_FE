import Header from "@/components/atoms/Header";
import MobileNavigation from "@/components/atoms/MobileNavigation";
import NaverMapScript from "@/components/atoms/NaverMapScript";

export default function ProductLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col w-screen min-h-screen">
            <Header />
            <NaverMapScript />
            {children}
            <MobileNavigation />
        </div>
    );
}

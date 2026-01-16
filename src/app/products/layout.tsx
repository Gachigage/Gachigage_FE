import Header from "@/components/atoms/Header";

export default function ProductLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col w-screen">
            <Header />
            {children}
        </div>
    );
}

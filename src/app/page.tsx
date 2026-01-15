import { redirect } from "next/navigation";

export default function Home() {
    redirect("/products");
    return <div className="max-w-[402px] xl:max-w-[1152px]"></div>;
}

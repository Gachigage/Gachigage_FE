"use client";
import ChatList from "@/components/organisms/ChatList/ChatList";
import ChatRoom from "@/components/organisms/ChatRoom/ChatRoom";
import { useMediaQuery } from "@/lib/useMediaQuery";

export default function Chat() {
    const isDesktop = useMediaQuery("(min-width: 1024px)");
    if (isDesktop === null) return null;

    return (
        <div className="w-full min-h-screen flex justify-center">
            <div className="
                w-full
                h-full
                pt-[100px]
                pb-[120px]
                md:pb-[20px]
                lg:pb-[20px]
                max-w-[402px]
                md:max-w-[768px]
                xl:max-w-[1152px]
                flex
                flex-col
                flex-1
                min-h-0
            ">
                <div className="flex flex-row gap-3 flex-1 min-h-0">
                    <ChatList />
                    {isDesktop && <ChatRoom />}
                </div>
            </div>
        </div>
    );
}

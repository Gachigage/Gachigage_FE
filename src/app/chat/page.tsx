"use client";

import { useStomp } from "@/hooks/useStomp";
import { useMediaQuery } from "@/lib/useMediaQuery";

import ChatList from "@/components/organisms/ChatList/ChatList";
import { useChatRoomStore } from "@/store/chat/useChatroomStore";
import DesktopChatRoomContainer from "@/components/organisms/ChatRoom/DesktopChatRoomContainer";

export default function Chat() {
    const { selectedChatRoomId } = useChatRoomStore();
    
    useStomp(true); 

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
                    <DesktopChatRoomContainer chatRoomId={selectedChatRoomId} />
                </div>
            </div>
        </div>
    );
}

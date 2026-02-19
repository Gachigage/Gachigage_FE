"use client"

import { isEmpty } from "lodash";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";

import { useChatInfo } from "@/hooks/useChatInfo";
import { useChatSocket } from "@/hooks/useSocketChat";
import { useChatMessages } from "@/hooks/useChatMessage";

import { useChatUIStore } from "@/store/chat/useChatUIStore";

import OrderSheetModal from "@/components/atoms/OrderSheetModal";
import ChatTradeModal from "@/components/atoms/ChatTradeModal";

import ChatTradeInfo from "@/components/organisms/ChatRoom/ChatTradeInfo";
import ChatTradeContent from "@/components/organisms/ChatRoom/ChatTradeContent";
import ChatInput from "@/components/organisms/ChatRoom/ChatInput";
import ChatUserInfo from "@/components/organisms/ChatRoom/ChatUserInfo";

export default function ChatRoom() {
    const {isOpenOrderModal, isOpenChatTradeModal, closeTradeModal, closeOrderModal} = useChatUIStore();
    const { data: session, status } = useSession();
    const params = useParams();
    const chatRoomId = Number(params.id); 

    const { data: chatInfo } = useChatInfo({
        chatRoomId,
        accessToken: session?.accessToken,
        enabled: status === "authenticated",
    });
    const { data: chattings = [], isSuccess: isChatLoaded } = useChatMessages({ 
        chatRoomId, accessToken: session?.accessToken 
    });
    const { sendMessage } = useChatSocket({
        chatRoomId,
        accessToken: session?.accessToken,
        enabled: status === "authenticated" && isChatLoaded,
        memberId: chatInfo?.memberId,
    });
    
    return (
        <>
            {chatInfo && !isEmpty(chatInfo) &&
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
                        <div className="flex flex-col w-full h-full border border-gachigageGray1 bg-gachigageGray0 rounded-[8px]">
                            <ChatUserInfo chatInfo={chatInfo} />
                            <ChatTradeInfo chatInfo={chatInfo}/>
                            <ChatTradeContent chatInfo={chatInfo} chattings={chattings}/>
                            <ChatInput chatRoomId={chatInfo.chatRoomId} sendMessage={sendMessage}/>
                            {isOpenChatTradeModal &&
                                <ChatTradeModal
                                    chatInfo={chatInfo}
                                    isOpen={isOpenChatTradeModal}
                                    onClose={closeTradeModal}
                                    chatRoomId={chatInfo?.chatRoomId}
                                />
                            }
                        </div>
                    </div>
                </div>
            }
        </>
    )
}
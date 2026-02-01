"use client"

import { useChatUIStore } from "@/store/chat/useChatUIStore";
import OrderSheetModal from "@/components/molecules/OrderSheetModal";
import ChatTradeModal from "@/components/molecules/ChatTradeModal";
import ChatTradeInfo from "@/components/organisms/ChatRoom/ChatTradeInfo";
import ChatTradeContent from "@/components/organisms/ChatRoom/ChatTradeContent";
import ChatInput from "@/components/organisms/ChatRoom/ChatInput";
import ChatUserInfo from "@/components/organisms/ChatRoom/ChatUserInfo";

export default async function ChatRoom() {
    const {isOpenOrderModal, isOpenChatTradeModal, closeTradeModal, closeOrderModal} = useChatUIStore();
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
                <div className="flex flex-col w-full h-full border border-gachigageGray1 bg-gachigageGray0">
                    <ChatUserInfo />
                    <ChatTradeInfo />
                    <ChatTradeContent />
                    <ChatInput />
                    {isOpenOrderModal &&
                        <OrderSheetModal 
                            isOpen={isOpenOrderModal}
                            onClose={closeOrderModal}
                        />
                    }
                    {isOpenChatTradeModal &&
                        <ChatTradeModal
                            isOpen={isOpenChatTradeModal}
                            onClose={closeTradeModal}
                        />
                    }
                </div>
            </div>
        </div>
    )
}
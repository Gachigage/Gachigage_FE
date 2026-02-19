import OrderSheetModal from "@/components/atoms/OrderSheetModal";
import ChatTradeModal from "@/components/atoms/ChatTradeModal";

import { useChatUIStore } from "@/store/chat/useChatUIStore";

import ChatInput from "./ChatInput";
import ChatTradeContent from "./ChatTradeContent";
import ChatTradeInfo from "./ChatTradeInfo";
import { ChatRoomInfo } from "@/types/Chat";

interface ChatroomProps {
    chatInfo: ChatRoomInfo;
    chattings: any[];
    sendMessage: any;
}

export default function ChatRoom({chatInfo, chattings, sendMessage} : ChatroomProps) {
    const {isOpenOrderModal, isOpenChatTradeModal, closeTradeModal, closeOrderModal} = useChatUIStore();
    
    return (
        <div className="flex flex-col w-[402px] md:w-[964px] lg:w-[910px] h-full border border-gachigageGray1 bg-gachigageGray0 rounded-[8px]">
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
    )
}
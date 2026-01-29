import ChatInput from "./ChatInput";
import ChatTradeContent from "./ChatTradeContent";
import ChatTradeInfo from "./ChatTradeInfo";

export default function ChatRoom() {
    return (
        <div className="flex flex-col w-[402px] h-[639px] md:w-[964px] md:h-[944px] lg:w-[810px] lg:h-[850px] border border-gachigageGray1 bg-gachigageGray0 rounded-[8px]">
            <ChatTradeInfo />
            <ChatTradeContent />
            <ChatInput />
        </div>
    )
}
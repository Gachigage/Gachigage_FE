"use client";
import React, {useState} from "react";
import DefaultButton from "@/components/atoms/DefaultButton";
import { ChatMessageType } from "@/types/Chat";

interface sendPayloadProps {
    chatRoomId: number;
    messageType: ChatMessageType;
    content: string;
}
interface ChatInputProps {
    chatRoomId: number;
    sendMessage: ({chatRoomId, messageType, content}:sendPayloadProps) => void;
}
export default function ChatInput({chatRoomId, sendMessage} : ChatInputProps) {
    const [message, setMessage] = useState("");
    const [isComposing, setIsComposing] = useState(false); // 조합 중 상태

    const handleSendMessage = () => {
        if (!message.trim()) return;
        sendMessage({
            chatRoomId,
            messageType: "TEXT",
            content: message,
        });
        setMessage('');
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey && !isComposing) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <div className="flex flex-col shrink-0 justify-between items-end h-[84px] border border-gachigageGray3 bg-gachigageWhite rounded-b-[8px] p-[10px] m-[10px]">
             <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                onCompositionStart={() => setIsComposing(true)} // 조합 시작
                onCompositionEnd={() => setIsComposing(false)}   // 조합 종료
                placeholder="메세지 입력"
                className="
                    w-full
                    h-full
                    text-[16px]
                    resize-none
                    overflow-hidden
                    align-top
                    pt-[8px]
                    hover:border-transparent
                    focus:border-transparent
                    focus:outline-none
                "
            />
            <div className="w-full flex flex-row justify-end">
                <DefaultButton
                    name="전송"
                    className="w-[71px] h-[32px] bg-gachigageMint text-[13px] text-white border-gachigageBrightMint1"
                    onClick={handleSendMessage}
                />
            </div>
        </div>
    )
}
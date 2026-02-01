"use client";
import React, {useState} from "react";
import DefaultButton from "@/components/atoms/DefaultButton";
import { useChatRoom } from "@/hooks/useChatRoom";
import { useSendMessage } from "@/hooks/useSendMessage";

export default function ChatInput() {
    const roomId = "111";
    const [message, setMessage] = useState("");
    const { messages } = useChatRoom(roomId);
    const { send } = useSendMessage(roomId);

    const handleSendMessage = () => {
        send(message);
        setMessage("");
    }
    return (
        <div className="flex flex-col shrink-0 justify-between items-end h-[104px] gap-2 border border-gachigageGray3 bg-gachigageWhite rounded-b-[8px] p-[10px] m-[10px]">
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={"메세지 입력"}
                className="w-full text-[16px]"
             />
            <div className="w-full flex flex-row justify-end">   
                <DefaultButton name="전송" className="w-[71px] h-[32px] bg-gachigageMint text-[13px] text-white border-gachigageBrightMint1" onClick={handleSendMessage}/>
            </div>
        </div>
    )
}
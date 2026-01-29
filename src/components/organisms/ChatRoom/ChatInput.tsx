"use client";
import React, {useState} from "react";
import DefaultButton from "@/components/atoms/DefaultButton";
import Image from "next/image";
import attachIcon from "@/assets/icons/attach.svg";

export default function ChatInput() {
    const [message, setMessage] = useState("");
    return (
        <div className="flex flex-col justify-between items-end h-[104px] gap-2 border border-gachigageGray3 bg-gachigageWhite rounded-b-[8px] p-[10px] m-[10px]">
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                // onKeyDown={handleKeyDown}
                placeholder={"메세지 입력"}
                className="w-full text-[16px]"
             />
            <div className="w-full flex flex-row justify-between">
                <Image 
                    src={attachIcon}
                    alt="attach"
                />
                <DefaultButton name="전송" className="w-[71px] h-[32px] bg-gachigageMint text-[13px] text-white border-gachigageBrightMint1"/>
            </div>
        </div>
    )
}
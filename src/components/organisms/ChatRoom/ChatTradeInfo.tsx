"use client";   
import React, { useState } from "react";

import sampleProduct1 from "@/assets/images/sampleProduct1.png";
import Image from "next/image";
import DefaultButton from "@/components/atoms/DefaultButton";
import ChatTradeModal from "@/components/molecules/ChatTradeModal";

export default function ChatTradeInfo() {
    const [open, setOpen] = useState(false);
    const [flagChatTradeModal, setFlagChatTradeModal] = useState(false);
    
    return (
        <div className="w-full h-[180px] flex flex-row gap-3 p-[20px] bg-[#ffffff]">
            <Image src={sampleProduct1} alt="Sample Product 1" width={123} height={123}/>
            <div className="w-full flex flex-col justify-between">
                <div className="flex justify-between">
                    <div className="flex flex-row">
                        <span>상품명:</span>
                        <span>모던한 의자</span>
                    </div>
                    <div>접기</div>
                </div>
                <DefaultButton name="거래완료" className="w-full h-[40px] text-gachigageSubMint bg-white" onClick={() => setFlagChatTradeModal(true)}/>
            </div>
            {flagChatTradeModal &&
                <ChatTradeModal 
                    isOpen={flagChatTradeModal}
                    onClose={() => setFlagChatTradeModal(false)}
                />
            }
        </div>
    )
}
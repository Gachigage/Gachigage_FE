"use client";   
import React, { useMemo, useState } from "react";
import Image from "next/image";

import { useChatUIStore } from "@/store/chat/useChatUIStore";

import { ChatRoomInfo } from "@/types/Chat";

import DefaultButton from "@/components/atoms/DefaultButton";

import foldIcon from "@/assets/icons/fold.svg";
import expandIcon from "@/assets/icons/expand.svg";

interface ChatTradeInfoProps {
    chatInfo: ChatRoomInfo
}

export default function ChatTradeInfo({chatInfo}:ChatTradeInfoProps) {
    const [isOpenProfileImage, setIsOpenProfileImage] = useState<boolean>(true);
    const {openTradeModal} = useChatUIStore();
    
    const isDisabled = useMemo(() => {
        return chatInfo.amIBuyer
    },[chatInfo.amIBuyer])

    console.info(isDisabled)
    console.info(chatInfo)
    return (
        <div className={`w-full ${isOpenProfileImage ? 'h-[180px]' : 'h-[126px]'} flex flex-row shrink-0 gap-3 p-[20px] bg-[#ffffff]`}>
            {isOpenProfileImage && 
            <Image 
                src={chatInfo?.productImageUrl} 
                alt="productImage" 
                className="w-[132px] h-[132px] rounded-[8px]"
                width={132}
                height={132}
            />}
            <div className="w-full flex flex-col justify-between">
                <div className="flex justify-between">
                    <div className="flex flex-row text-[16px]">
                        <span className="pr-[5px]">상품명:</span>
                        <span>{chatInfo.productTitle}</span>
                    </div>
                    <div className="flex flex-row gap-1 items-center cursor-pointer" onClick={() => setIsOpenProfileImage(!isOpenProfileImage)}>
                        <div className="text-[13px] text-gachigageGray7">{isOpenProfileImage ? '접기' : '펼치기'}</div>
                            {isOpenProfileImage ? 
                                <Image
                                    src={foldIcon} 
                                    alt="fold" 
                                    className="w-[18px] h-[18px]"  
                                />:
                                <Image
                                    src={expandIcon} 
                                    alt="expand" 
                                    className="w-[18px] h-[18px]"  
                                />
                            }
                    </div>
                </div>
                <DefaultButton
                    name="거래요청" 
                    disabled={isDisabled}
                    className={`w-full h-[40px] 
                        ${isDisabled ? 'text-gachigageGray5 ' : 'text-gachigageSubMint'}
                        ${isDisabled ? 'bg-gachigageGray3' : 'bg-white'}
                        ${isDisabled ? 'disabled:cursor-not-allowed' : 'cursor-pointer'}
                    `} 
                    onClick={isDisabled ? '' : openTradeModal}
                 />
            </div>
        </div>
    )
}
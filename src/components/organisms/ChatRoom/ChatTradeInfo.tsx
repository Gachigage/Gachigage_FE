"use client";   
import React, { useMemo, useState } from "react";
import Image from "next/image";

import { useChatUIStore } from "@/store/chat/useChatUIStore";

import { ChatDetail, ChatRoomInfo } from "@/types/Chat";

import DefaultButton from "@/components/atoms/DefaultButton";

import foldIcon from "@/assets/icons/fold.svg";
import expandIcon from "@/assets/icons/expand.svg";


export default function ChatTradeInfo({chatInfo}:{chatInfo: ChatRoomInfo}) {
    //TO-BE : 거래완료 유무값을 백앤드에서 받아야함
    const [isOpenProfileImage, setIsOpenProfileImage] = useState<boolean>(true);
    const {openTradeModal} = useChatUIStore();
    
    const isDisabled = useMemo(() => {
        return chatInfo.amIBuyer
    },[chatInfo.amIBuyer])

    return (
        <div className={`w-full ${isOpenProfileImage ? 'h-[140px]' : 'h-[106px]'} flex flex-row shrink-0 gap-3 p-[10px] bg-[#ffffff] rounded-[8px]`}>
            {isOpenProfileImage && 
            <Image 
                src={chatInfo?.productImageUrl} 
                alt="productImage" 
                className="w-[112px] h-[112px] rounded-[8px]"
                width={112}
                height={112}
            />}
            <div className="w-full flex flex-col justify-between py-[10px]">
                <div className="flex justify-between">
                    <div className="flex flex-row text-[16px] min-w-[60px]">
                        <span className="pr-[5px] shrink-0">상품명:</span>
                        <span className="overflow-hidden text-ellipsis whitespace-nowrap">{chatInfo.productTitle}</span>
                    </div>
                    <div className="flex flex-row gap-1 items-center cursor-pointer shrink-0" onClick={() => setIsOpenProfileImage(!isOpenProfileImage)}>
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
                    className={`w-full h-[35px] 
                        ${isDisabled ? 'text-gachigageGray5 ' : 'text-gachigageSubMint'}
                        ${isDisabled ? 'bg-gachigageGray3' : 'bg-white'}
                        ${isDisabled ? 'disabled:cursor-not-allowed' : 'cursor-pointer'}
                    `} 
                    onClick={isDisabled ? undefined : openTradeModal}
                 />
            </div>
        </div>
    )
}
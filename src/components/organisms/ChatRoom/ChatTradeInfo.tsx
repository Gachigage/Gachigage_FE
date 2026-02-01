"use client";   
import React, { useState } from "react";

import sampleProduct1 from "@/assets/images/sampleProduct1.png";
import Image from "next/image";
import DefaultButton from "@/components/atoms/DefaultButton";
import foldIcon from "@/assets/icons/fold.svg";
import expandIcon from "@/assets/icons/expand.svg";
import { useChatUIStore } from "@/store/chat/useChatUIStore";

export default function ChatTradeInfo() {
    const [isOpenProfileImage, setIsOpenProfileImage] = useState<boolean>(true);
    const {openTradeModal} = useChatUIStore();
    return (
        <div className={`w-full ${isOpenProfileImage ? 'h-[180px]' : 'h-[126px]'} flex flex-row shrink-0 gap-3 p-[20px] bg-[#ffffff]`}>
            {isOpenProfileImage && <Image src={sampleProduct1} alt="Sample Product 1" width={123} height={123}/>}
            <div className="w-full flex flex-col justify-between">
                <div className="flex justify-between">
                    <div className="flex flex-row text-[16px]">
                        <span>상품명:</span>
                        <span>모던한 의자</span>
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
                <DefaultButton name="거래요청" className="w-full h-[40px] text-gachigageSubMint bg-white" onClick={openTradeModal}/>
            </div>
        </div>
    )
}
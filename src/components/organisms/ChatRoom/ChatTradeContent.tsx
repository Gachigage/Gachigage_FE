import { isEmpty } from "lodash";

import Image from "next/image";

import { ChatMessage, ChatRoomInfo } from "@/types/Chat";
import { formatChatTime } from "@/lib/formatTimeUtils";

import DefaultProfileImage from "@/assets/images/defaultProfileImage.png";
import { useEffect, useRef } from "react";
interface ChatTradeContentProps {
  chatInfo: ChatRoomInfo;
  chattings: ChatMessage[];
}

export default function ChatTradeContent({chatInfo, chattings}:ChatTradeContentProps) {
    const containerRef = useRef<HTMLDivElement>(null); 
    const isDifferentDay = (a: string, b: string) => {
        return new Date(a).toDateString() !== new Date(b).toDateString();
    }

    const formatDateDivider = (ts: string) => {
        const d = new Date(ts);
        return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;
    }

    const profileImage = (chat: any) => {
        if(chat.senderIsBuyer) {
            return !isEmpty(chatInfo.buyerImageUrl) ? chatInfo.buyerImageUrl : DefaultProfileImage
        } else {
            return !isEmpty(chatInfo.sellerImageUrl) ? chatInfo.sellerImageUrl : DefaultProfileImage 
        }
    }

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [chattings]);

    return (
        <>
            {!isEmpty(chattings) ?
                <div
                    ref={containerRef} 
                    className="flex-1 min-h-0 overflow-hidden w-full h-full bg-gachigageGray0 p-[15px] overflow-y-auto no-scrollbar">
                    {chattings.map((chat, index) => {
                        const prev = chattings[index - 1];
                        const showDateDivider = !prev || isDifferentDay(prev.sendAt, chat.sendAt);

                        return (
                            <div key={index} className="mb-4">
                            {showDateDivider && (
                                <div className="text-center text-sm text-gray-400 my-4">
                                <span>{formatDateDivider(chat.sendAt)}</span>
                                <div className="w-full border border-gachigageGray1 mt-2" />
                                </div>
                            )}
                            {!chat.me ? (
                                <div className="flex items-start gap-2">
                                    <Image
                                        src={profileImage(chat)}
                                        alt="sellerProfile"
                                        className="w-[41px] h-[41px] object-cover rounded-full shrink-0"
                                        width={41}
                                        height={41}
                                    />
                                    <div className="flex flex-col gap-1 text-[13px]">
                                        <div className="font-bold">{chat.senderIsBuyer ? chatInfo.buyerName : chatInfo.sellerName}</div>
                                        <div className="flex items-end gap-2">
                                        <div className="max-w-[210px] bg-white rounded-[8px] p-[8px] break-words">
                                            {chat.content}
                                        </div>
                                        <span className="text-gachigageGray7 text-xs">
                                            {formatChatTime(chat.sendAt)}
                                        </span>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex justify-end">
                                <div className="flex items-end gap-2 text-[13px]">
                                    <div className="flex flex-col text-gachigageGray7 text-xs items-end">
                                        {/* <span>{chat.read ? '읽음' : '1'}</span> */}
                                        <span>{formatChatTime(chat.sendAt)}</span>
                                    </div>
                                    <div className="max-w-[210px] bg-[#C7EEE3] rounded-[8px] p-[8px] break-words">
                                    {chat.content}
                                    </div>
                                </div>
                                </div>
                            )}
                            </div>
                        );
                    })}
                </div> :
                <div className="flex-1 min-h-0 overflow-hidden w-full h-full bg-gachigageGray0 p-[15px] overflow-y-auto no-scrollbar"></div>
            }
        </>
    )
}
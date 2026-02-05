import { useMemo } from "react";
import { isEmpty } from "lodash";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";

import { ChatMessage, ChatRoomInfo } from "@/types/Chat";

import { useChatMessages } from "@/hooks/useChatMessage";

import { formatChatTime } from "@/lib/formatTimeUtils";

interface ChatTradeContentProps {
  chatInfo: ChatRoomInfo;
  messages: ChatMessage[];
}

export default function ChatTradeContent({chatInfo, messages}:ChatTradeContentProps) { 
    const { data: session } = useSession();
    const params = useParams();
    const chatRoomId = Number(params.id); 
    const { data: chattings } = useChatMessages({ chatRoomId, accessToken: session?.accessToken });

    const mergedMessages = useMemo(() => {
        if (!chattings) return messages;

        return [...chattings, ...messages].sort(
        (a, b) => new Date(a.sendAt).getTime() - new Date(b.sendAt).getTime()
        );
    }, [chattings, messages]);

    const isDifferentDay = (a: string, b: string) => {
        return new Date(a).toDateString() !== new Date(b).toDateString();
    }

    const formatDateDivider = (ts: string) => {
        const d = new Date(ts);
        return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;
    }

    return (
        <>
            {!isEmpty(mergedMessages) &&
                <div className="flex-1 min-h-0 overflow-hidden w-full h-full bg-gachigageGray0 p-[15px] overflow-y-auto no-scrollbar">
                    {mergedMessages.map((chat, index) => {
                        const prev = mergedMessages[index - 1];
                        const showDateDivider = !prev || isDifferentDay(prev.sendAt, chat.sendAt);

                        return (
                            <div key={index} className="mb-4">
                            {showDateDivider && (
                                <div className="text-center text-sm text-gray-400 my-4">
                                <span>{formatDateDivider(chat.sendAt)}</span>
                                <div className="w-full border border-gachigageGray1 mt-2" />
                                </div>
                            )}
                            {!chat.senderIsBuyer ? (
                                <div className="flex items-start gap-2">
                                <Image
                                    src={chatInfo.sellerImageUrl}
                                    alt="sellerProfile"
                                    className="w-[41px] h-[41px] object-cover rounded-full shrink-0"
                                    width={41}
                                    height={41}
                                />
                                <div className="flex flex-col gap-1 text-[13px]">
                                    <div className="font-bold">{chatInfo.sellerName}</div>
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
                                    {chat.read && <span>읽음</span>}
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
                </div>
            }
        </>
    )
}
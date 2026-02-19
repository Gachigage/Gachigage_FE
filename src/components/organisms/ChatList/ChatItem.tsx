import Image from "next/image"
import Link from "next/link"

import { useMediaQuery } from "@/lib/useMediaQuery";
import { formatChatDay } from "@/lib/formatTimeUtils";

import ChatUnRead from "./ChatUnRead";
import DefaultProfileImage from "@/assets/images/defaultProfileImage.png"
import { useMemo } from "react";
import { useChatRoomStore } from "@/store/chat/useChatroomStore";

export default function ChatItem({chatItem}: {chatItem: any}) {
    const { selectChatRoomId } = useChatRoomStore();
    const isDesktop = useMediaQuery("(min-width: 1024px)");
    
    const profileImageSrc = useMemo(() => {
        return chatItem?.otherProfileImage && chatItem.otherProfileImage.trim() !== ""
        ? chatItem.otherProfileImage
        : DefaultProfileImage;
    },[chatItem?.otherProfileImage])

    const handleClick = () => {
        if (isDesktop) {
            selectChatRoomId(chatItem.chatRoomId);
        }
    };

    if (isDesktop === null) return null;
    if (!chatItem) return null;

    return (
        <>
            {isDesktop ? 
                <div
                    className="
                        flex
                        w-full
                        h-[107px]
                        bg-white
                        rounded-[8px]
                        px-[8px]
                        py-[15px]
                        cursor-pointer
                    "
                    onClick={handleClick}
                >
                    <div className="flex flex-row gap-5 w-full h-full">
                        <Image
                            src={profileImageSrc}
                            alt="profile"
                            className="w-[41px] h-[41px] object-cover rounded-full shrink-0"
                            width={41}
                            height={41}
                        />
                        <div className="flex flex-col justify-between h-full w-full min-w-0">
                            <div className="flex flex-col">
                                <div className="w-full flex justify-between font-bold text-[16px]">
                                    <span>{chatItem.otherName}</span>
                                    {/* <ChatUnRead unreadCount={chatItem.unreadCount}/> */}
                                </div>
                                <div className="text-[13px] text-gachigageGray7 line-clamp-2 leading-[18px] mt-1">
                                    {chatItem.lastMessage}
                                </div>
                            </div>  
                            <div className="text-[13px] text-gachigageGray7">
                                {formatChatDay(chatItem.lastMessageTime)}
                            </div>
                        </div>
                    </div>
                </div>:
                <Link
                    href={`/chat/${chatItem.chatRoomId}`}
                    className="
                        flex
                        w-full
                        h-[107px]
                        bg-white
                        rounded-[8px]
                        px-[8px]
                        py-[15px]
                        cursor-pointer
                    "
                >
                    <div className="flex flex-row gap-5 w-full h-full">
                        <Image
                            src={profileImageSrc}
                            alt="profile"
                            className="w-[41px] h-[41px] object-cover rounded-full shrink-0"
                            width={41}
                            height={41}
                        />
                        <div className="flex flex-col justify-between h-full w-full min-w-0">
                            <div className="flex flex-col">
                                <div className="w-full flex justify-between font-bold text-[16px]">
                                    <span>{chatItem.otherName}</span>
                                    {/* <ChatUnRead unreadCount={chatItem.unreadCount}/> */}
                                </div>
                                <div className="text-[13px] text-gachigageGray7 line-clamp-2 leading-[18px] mt-1">
                                    {chatItem.lastMessage}
                                </div>
                            </div>  
                            <div className="text-[13px] text-gachigageGray7">
                                {formatChatDay(chatItem.lastMessageTime)}
                            </div>
                        </div>
                    </div>
                </Link>                                                             
            }
        </>
    )
}
import Image from "next/image"
import Link from "next/link"

import { useMediaQuery } from "@/lib/useMediaQuery";
import { formatChatDay } from "@/lib/formatTimeUtils";

import ChatUnRead from "./ChatUnRead";
import DefaultProfileImage from "@/assets/images/defaultProfileImage.png"
import { useMemo } from "react";

export default function ChatItem({chatItem}: {chatItem: any}) {
    const isDesktop = useMediaQuery("(min-width: 1024px)");
    
    const profileImageSrc = useMemo(() => {
        return chatItem?.otherProfileImage && chatItem.otherProfileImage.trim() !== ""
        ? chatItem.otherProfileImage
        : DefaultProfileImage;
    },[chatItem?.otherProfileImage])

    // if (isDesktop === null) return null;
    if (!chatItem) return null;
    return (
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
        //TO-BE: 8일이후 수정예정
        // <>
        //     {isDesktop ?
        //     <div className="w-full h-[107px] bg-white rounded-[8px] p-[8px] cursor-pointer">
        //         <div className="flex flex-row gap-2">
        //             <Image 
        //                 src={item.profileImage} 
        //                 alt="profile" 
        //                 className="w-[41px] h-[41px] object-cover rounded-full shrink-0" 
        //                 width={41} 
        //                 height={41}
        //             />
        //             <div className="flex flex-col gap-2">
        //                 <div className="font-bold text-[16px]">{item.otherName}</div>
        //                 <div className="text-[13px] text-gachigageGray7 line-clamp-2 leading-[18px]">{item.lastMessage}</div>
        //                 <div className="text-[13px] text-gachigageGray7">{item.lastMessageTime.split('T')[0]}</div>
        //             </div>
        //         </div>
        //     </div>:
        //     <Link
        //         href={`/chat/${item.chatId}`}
        //         className="w-full h-[107px] bg-white rounded-[8px] p-[8px] cursor-pointer">
        //         <div className="flex flex-row gap-2">
        //             <Image 
        //                 src={item.profileImage} 
        //                 alt="profile" 
        //                 className="w-[41px] h-[41px] object-cover rounded-full shrink-0" 
        //                 width={41} 
        //                 height={41}
        //             />
        //             <div className="flex flex-col gap-2">
        //                 <div className="font-bold text-[16px]">{item.username}</div>
        //                 <div className="text-[13px] text-gachigageGray7 line-clamp-2 leading-[18px]">{item.lastMessage}</div>
        //                 <div className="text-[13px] text-gachigageGray7">{item.timestamp.split('T')[0]}</div>
        //             </div>
        //         </div>
        //     </Link>
        //     }       
        // </>   
    )
}
import Image from "next/image";
import Link from "next/link";

import { ChatRoomInfo } from "@/types/Chat";

import backArrow from "@/assets/icons/backArrow.svg";

interface ChatUserInfoProps {
    chatInfo: ChatRoomInfo
}
export default function ChatUserInfo({chatInfo}: ChatUserInfoProps) {
 
    return (
        <div className="w-full px-[10px] h-[62px] flex items-center bg-[#ffffff] shrink-0">
            <div className="flex items-center gap-2 cursor-pointer">
                <Link href="/chat" className="flex items-center">
                <Image
                    src={backArrow}
                    alt="back"
                    width={28}
                    height={28}
                />
                </Link>
            <span className="text-[20px] font-bold">{chatInfo.unreadCount}</span>
        </div>
            <span className="
                absolute
                left-1/2
                -translate-x-1/2
                text-gachigageDark
                font-semibold
                text-[24px]
                leading-[120%]
                whitespace-nowrap
            ">
                {chatInfo.sellerName}
            </span>
        </div>
    )
}
import Image from "next/image";
import Link from "next/link";

import { ChatRoomInfo } from "@/types/Chat";

import backArrow from "@/assets/icons/backArrow.svg";
import { useQueryClient } from "@tanstack/react-query";

interface ChatUserInfoProps {
    chatInfo: ChatRoomInfo
}
export default function ChatUserInfo({chatInfo}: ChatUserInfoProps) {
    const queryClient = useQueryClient();

    const handleBackClick = () => {
        queryClient.invalidateQueries({ queryKey: ["chatList"] });
    };

    return (
        <div className="w-full px-[10px] h-[42px] flex items-center bg-[#ffffff] shrink-0 rounded-[8px]">
            <div className="flex items-center gap-2 cursor-pointer" onClick={handleBackClick}>
                <Link href="/chat" className="flex items-center">
                    <Image
                        src={backArrow}
                        alt="back"
                        width={24}
                        height={24}
                    />
                </Link>
                {/* {chatInfo.unreadCount > 0 && <span className="text-[20px] font-bold">{chatInfo.unreadCount}</span>} */}
            </div>
            <span className="
                absolute
                left-1/2
                -translate-x-1/2
                text-gachigageDark
                font-semibold
                text-[22px]
                leading-[120%]
                whitespace-nowrap
            ">
                {chatInfo.amIBuyer ? chatInfo.sellerName : chatInfo.buyerName}
            </span>
        </div>
    )
}
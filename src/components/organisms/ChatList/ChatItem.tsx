import { useMediaQuery } from "@/lib/useMediaQuery";
import Image from "next/image"
import Link from "next/link"

export default function ChatItem({item}: {item: any}) {
    const isDesktop = useMediaQuery("(min-width: 1024px)");
    if (isDesktop === null) return null;

    return (
        <>
            {isDesktop ?
            <div className="w-full h-[107px] bg-white rounded-[8px] p-[8px] cursor-pointer">
                <div className="flex flex-row gap-2">
                    <Image 
                        src={item.profileImage} 
                        alt="profile" 
                        className="w-[41px] h-[41px] object-cover rounded-full shrink-0" 
                        width={41} 
                        height={41}
                    />
                    <div className="flex flex-col gap-2">
                        <div className="font-bold text-[16px]">{item.username}</div>
                        <div className="text-[13px] text-gachigageGray7 line-clamp-2 leading-[18px]">{item.lastMessage}</div>
                        <div className="text-[13px] text-gachigageGray7">{item.timestamp.split('T')[0]}</div>
                    </div>
                </div>
            </div>:
            <Link
                href={`/chat/${item.chatId}`}
                className="w-full h-[107px] bg-white rounded-[8px] p-[8px] cursor-pointer">
                <div className="flex flex-row gap-2">
                    <Image 
                        src={item.profileImage} 
                        alt="profile" 
                        className="w-[41px] h-[41px] object-cover rounded-full shrink-0" 
                        width={41} 
                        height={41}
                    />
                    <div className="flex flex-col gap-2">
                        <div className="font-bold text-[16px]">{item.username}</div>
                        <div className="text-[13px] text-gachigageGray7 line-clamp-2 leading-[18px]">{item.lastMessage}</div>
                        <div className="text-[13px] text-gachigageGray7">{item.timestamp.split('T')[0]}</div>
                    </div>
                </div>
            </Link>
            }       
        </>   
    )
}
import DefaultButton from "@/components/atoms/DefaultButton";
import ChatItem from "./ChatItem";
import profileImage from "@/assets/images/profileImage.png";
import { useChatList } from "@/hooks/useChatList";
import { useSession } from "next-auth/react";

export default function ChatList() {
    const { data: session, status } = useSession();
    const chat = {
        username: "이태경",
        profileImage: profileImage,
        lastMessage: "안녕하세요, 의자 문의 드립니다. 의자 너무 예쁘네요. 꼭 사고 싶습니다. 제가기 전까지 팔지 말아 주세요.",
        timestamp: "2024-01-15T14:30:00",
        chatId: '111'
    }

    const chatList = [
        chat,
        chat,
        chat,
        chat,
        chat,
        chat,
        chat,
        chat,
        chat,
        chat,
    ]

    const { data, isLoading } = useChatList({accessToken: session?.accessToken});
    // console.info(isLoading)
    console.info(data)
    return (
        <div className="
                flex flex-col
                max-w-[402px]
                md:max-w-[768px]
                xl:max-w-[1152px]
                md:w-full
                lg:w-[270px]
                shrink-0
                gap-1
                no-scrollbar
        ">
            <div className="flex flex-row gap-2 shrink-0">
                <DefaultButton
                className="w-full h-[33px] text-gachigageGray7 border-gachigageGray7"
                name="전체"
                />
                <DefaultButton
                className="w-full h-[33px] text-gachigageGray7 border-gachigageGray7"
                name="안읽음"
                />
            </div>
            <div className="
                flex-1
                min-h-0
                border-gachigageGray1
                bg-gachigageGray0
                rounded-[8px]
                overflow-y-auto
            ">
                <div className="flex flex-col gap-2 p-[5px]">
                {chatList.map((item, index) => (
                    <ChatItem item={item} key={index} />
                ))}
                </div>
            </div>
        </div>
    )
}
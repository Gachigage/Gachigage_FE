import isEmpty from "lodash/isEmpty";

import { useSession } from "next-auth/react";

import { useChatList } from "@/hooks/useChatList";

import DefaultButton from "@/components/atoms/DefaultButton";

import ChatItem from "./ChatItem";

export default function ChatList() {
    const { data: session } = useSession();
    const { data: chatList = [] } = useChatList({accessToken: session?.accessToken});

    return (
        <>
            {chatList && !isEmpty(chatList) && 
                <div className="
                    flex flex-col
                    max-w-[402px]
                    md:max-w-[768px]
                    xl:max-w-[1152px]
                    md:w-full
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
                        {chatList.map((chatItem, index) => (
                            <ChatItem key={index} chatItem={chatItem}/>
                        ))}
                    </div>  
                </div>
            </div>}
        </>
    )
}
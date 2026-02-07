import { useState } from "react";
import isEmpty from "lodash/isEmpty";

import { useSession } from "next-auth/react";

import { useChatList } from "@/hooks/useChatList";
import DefaultButton from "@/components/atoms/DefaultButton";

import ChatItem from "./ChatItem";

export default function ChatList() {
    const { data: session } = useSession();
    const { data: chatList = [] } = useChatList({accessToken: session?.accessToken});
    const [filter, setFilter] = useState<"ALL" | "UNREAD">("ALL");

    const filteredChatList = filter === "ALL" ? chatList
      : chatList.filter((chat) => chat.unreadCount > 0);

    return (
        <>
            {filteredChatList && !isEmpty(filteredChatList) && 
                <div className="
                    flex flex-col
                    w-full
                    gap-2
                    no-scrollbar
                    px-2
                    md:px-0
                    md:max-w-[768px]
                    xl:max-w-[1152px]
                ">
                <div className="flex flex-row gap-2 shrink-0">
                     <DefaultButton
                        className={`w-full h-[33px] ${
                            filter === "ALL"
                            ? "text-gachigageDarkMint1 border-gachigageDarkMint1"
                            : "text-gachigageGray7 border-gachigageGray7"
                        }`}
                        name="전체"
                        onClick={() => setFilter("ALL")}
                        />
                    <DefaultButton
                        className={`w-full h-[33px] ${
                            filter === "UNREAD"
                            ? "text-gachigageDarkMint1 border-gachigageDarkMint1"
                            : "text-gachigageGray7 border-gachigageGray7"
                        }`}
                        name="안읽음"
                        onClick={() => setFilter("UNREAD")}
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
                        {filteredChatList.map((chatItem, index) => (
                            <ChatItem key={index} chatItem={chatItem}/>
                        ))}
                    </div>  
                </div>
            </div>}
        </>
    )
}
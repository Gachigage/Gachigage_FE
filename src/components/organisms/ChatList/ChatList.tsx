import { useState } from "react";
import isEmpty from "lodash/isEmpty";
import Image from "next/image";

import { useSession } from "next-auth/react";
import { useChatList } from "@/hooks/useChatList";
import DefaultButton from "@/components/atoms/DefaultButton";
import ChatItem from "./ChatItem";

import emptyChatListIcon from "@/assets/icons/emptyChatList.svg";

export default function ChatList() {
    const { data: session } = useSession();
    const { data: chatList = [] } = useChatList({accessToken: session?.accessToken});
    const [filter, setFilter] = useState<"ALL" | "UNREAD">("ALL");

    const filteredChatList = filter === "ALL" ? chatList
      : chatList.filter((chat) => chat.unreadCount > 0);

    return (
        <>
            {filteredChatList && !isEmpty(filteredChatList) ?
                <div className="
                    flex flex-col
                    w-full
                    lg:w-[270px]
                    lg:min-w-[270px]
                    lg:max-w-[270px]
                    lg:shrink-0
                    gap-2
                    px-2
                ">
                    <div className="flex flex-row gap-2 shrink-0">
                        {/* <DefaultButton
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
                        /> */}
                    </div>
                    <div className="
                        flex-1
                        min-h-0
                        border-gachigageGray1
                        bg-gachigageGray0
                        rounded-[8px]
                        overflow-y-auto
                        no-scrollbar
                    ">
                        <div className="flex flex-col gap-2 p-[5px]">
                            {filteredChatList.map((chatItem, index) => (
                                <ChatItem key={index} chatItem={chatItem}/>
                            ))}
                        </div>  
                    </div>
                </div> :
                <div className="
                    flex flex-col
                    w-full
                    items-center
                    justify-center
                    lg:w-[270px]
                    lg:min-w-[270px]
                    lg:max-w-[270px]
                    lg:bg-gachigageGray0
                    lg:shrink-0
                    lg:rounded-[8px]
                    gap-2
                    px-2
                ">
                    <div className="lg:hidden">
                        <Image
                        src={emptyChatListIcon}
                        alt="emptyChatListIcon"
                        />
                    </div>
                    <span className="text-gachigageGray5 text-[16px] lg:text-gachigageGray5">
                        <span className="lg:hidden">
                        문의하기를 통해 대화를 시작해보세요.
                        </span>
                        <span className="hidden lg:inline">
                        대화방이 없어요.
                        </span>
                    </span>
                </div>
            }
        </>
    )
}
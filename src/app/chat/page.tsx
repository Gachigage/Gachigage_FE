import ChatList from "@/components/organisms/ChatList/ChatList";
import ChatRoom from "@/components/organisms/ChatRoom/ChatRoom";

export default function Chat() {
    return (
        <div className="w-full h-full flex justify-center">
            <div className="w-full pt-[138px] pb-[134px] md:pb-[60px] max-w-[402px] md:max-w-[768px] xl:max-w-[1152px] flex flex-col gap-[48px] md:gap-[60px]">
                <div className="flex flex-row gap-3">
                    <ChatList />
                    <ChatRoom />
                </div>
            </div>
        </div>
    )
}
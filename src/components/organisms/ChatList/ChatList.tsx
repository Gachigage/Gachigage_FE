import DefaultButton from "@/components/atoms/DefaultButton";
import ChatItem from "./ChatItem";
import profileImage from "@/assets/images/profileImage.png";

export default function ChatList() {
    const chat = {
        username: "이태경",
        profileImage: profileImage,
        lastMessage: "안녕하세요, 의자 문의 드립니다. 의자 너무 예쁘네요. 꼭 사고 싶습니다. 제가기 전까지 팔지 말아 주세요.",
        timestamp: "2024-01-15T14:30:00",
    }

    const chatList = [
        chat,
        chat,
        chat,
        chat,
        chat,

    ]
    
    return (
        <div className="flex flex-col w-[612px] h-[639px] md:w-[916px] md:h-[844px] lg:w-[270px] lg:h-[850px] gap-1">
        {/* <div className="h-full flex flex-col w-[612px] md:w-[916px] lg:w-[270px] gap-1"> */}
            <div className="flex flex-row gap-2">
                <DefaultButton className="w-[131px] h-[33px] text-gachigageGray7 border-gachigageGray7" name="전체" />
                <DefaultButton className="w-[131px] h-[33px] text-gachigageGray7 border-gachigageGray7" name="안읽음" />
            </div>
            <div className="h-full border-gachigageGray1 bg-gachigageGray0 rounded-[8px]">
              <div className="flex flex-col justify-center gap-2 p-[5px]">
                {chatList.map((item, index) => (
                    <ChatItem item={item} key={index} />
                ))}
              </div>
            </div>
        </div>
    )
}
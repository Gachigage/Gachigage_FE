import Image from "next/image";
import profileImage from "@/assets/images/profileImage.png";

export default function ChatTradeContent() { 
    const content= {
        username: "이태경",
        senderRole: 'BUYER',
        content: '안녕하세요, 의자 문의 드립니다. 의자 너무 예쁘네요. 꼭 사고 싶습니다. 제가 가기 전까지 팔지 말아 주세요.',
        createdAt: "2026-01-27T12:30:00",
        roomId: '',
        isRead: false,
        profileImage: profileImage,
    }
    const content2 = {
        username: "",
        senderRole: 'SELLER',
        content: '문의 주셔서 감사합니다. 몇개나 구매 하실건가요?',
        createdAt: "2026-01-28T12:30:00",
        roomId: '',
        isRead: true,
        profileImage: profileImage,
    }
    const chattings = [
        content,
        content2
    ]

    // 날짜가 바뀌었는지 확인 (string 기준)
    function isDifferentDay(a: string, b: string) {
        return new Date(a).toDateString() !== new Date(b).toDateString();
    }

    // 날짜 구분선용 포맷 (string 기준)
    function formatDateDivider(ts: string) {
        const d = new Date(ts);
        return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;
    }

    return (
        <div className="w-full h-full bg-gachigageGray0 p-[15px]">
            {chattings.map((chat, index) => {
                const prev = chattings[index - 1];
                const showDateDivider = !prev || isDifferentDay(prev.createdAt, chat.createdAt);
                return (
                    <div key={index} className="flex flex-col">
                        {showDateDivider && (
                            <div className="text-center text-sm text-gray-400 my-3">
                                <span>{formatDateDivider(chat.createdAt)}</span>
                                <p className="w-full border border-gachigageGray1 mt-[5px]"/>
                            </div>
                        )}
                        {chat.senderRole === 'BUYER' ?
                         <div className="flex flex-row h-[110px] gap-2 justify-start">
                            <Image 
                                src={chat.profileImage} 
                                alt="profile" 
                                className="w-[41px] h-[41px] object-cover rounded-full shrink-0" 
                                width={41} 
                                height={41}
                            />
                            <div className="flex flex-col items-start gap-2 text-[13px]">
                                <div className="font-bold">{chat.username}</div>
                                <div className="flex flex-row gap-2 items-end">
                                    <div className="flex w-[210px] bg-white rounded-[8px] p-[5px]">{chat.content}</div>
                                    <div className="text-gachigageGray7">{chat.createdAt.split('T')[0]}</div>
                                </div>
                                </div>
                            </div> : 
                            <div className="flex flex-col items-end gap-2 text-[13px]">
                                <div className="font-bold">{chat.username}</div>
                                <div className="flex flex-row gap-2 items-end">
                                    <div className="flex flex-col text-gachigageGray7">
                                        {chat.isRead && <span>읽음</span>}
                                        <span>{chat.createdAt.split('T')[0]}</span>
                                    </div>
                                    <div className="flex w-[210px] bg-[#C7EEE3] rounded-[8px] p-[5px]">{chat.content}</div>
                                </div>
                            </div>
                        }
                    </div>
                )
            })}
        </div>
    )
}
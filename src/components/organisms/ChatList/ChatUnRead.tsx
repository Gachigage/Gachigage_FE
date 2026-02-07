interface ChatUnReadProps {
  unreadCount: number;
}

export default function ChatUnRead({unreadCount} : ChatUnReadProps) {
    if (unreadCount <= 0) return null;

    return (
        <div className="w-[25px] h-[20px] flex items-center justify-center border border-[#2E8E82] bg-gachigageBrightMint3 rounded-[8px]">
            <span className="text-[#2E8E82] text-[13px]">{unreadCount}</span>
        </div>
    )
}
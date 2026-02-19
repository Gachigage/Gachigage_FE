import Image from "next/image";

import emptyChatListIcon from "@/assets/icons/emptyChatList.svg";

export default function EmptyChatRoom() {
  return (
    <div className="flex flex-col w-[402px] md:w-[964px] lg:w-[810px] h-full
                    border border-gachigageGray1 rounded-[8px]
                    items-center justify-center gap-2">
      <Image src={emptyChatListIcon} alt="emptyChatListIcon" />
      <span className="text-gachigageGray5 text-[16px]">
        대화방을 선택하여 대화를 시작해보세요.
      </span>
    </div>
  );
}

import { useCreateChatRoom } from "@/hooks/useChatRoomMutation";

export default function InquireButton(productId: number) {
    const { mutate: createRoom, isPending } = useCreateChatRoom();
    return (
        <button
            onClick={() => createRoom(productId)}
            className={`w-full h-[56px] flex items-center justify-center  bg-gachigageMint text-gachigageWhite leading-[120%] text-[24px]  font-semibold cursor-pointer
            md:border-[0.5px] border-gachigageBrightMint1 md:rounded-[8px] 
        `}
        >
            문의하기
        </button>
    );
}

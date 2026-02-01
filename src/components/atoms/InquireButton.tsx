"use client"

import { useCreateChatRoom } from "@/hooks/useChatRoomMutation";
import { useSession } from "next-auth/react";

interface InquireButtonProps {
    productId: number;
}

export default function InquireButton({ productId }: InquireButtonProps) {
    const { mutate: createRoom, isPending } = useCreateChatRoom();
    const { data: session, status } = useSession();
    
    const handleClick = () => {
        console.log("세션 상태:", status);
        console.log("세션 데이터:", session);
        
        if (status === "unauthenticated" || !session) {
            window.location.href = "/login";
            return;
        }
        
        createRoom({ productId, accessToken: session.accessToken });
    };
    
    // return (
    //     <button
    //         onClick={handleClick}
    //         disabled={isPending || status === "loading"}
    //         className={`w-full h-[56px] flex items-center justify-center bg-gachigageMint text-gachigageWhite leading-[120%] text-[24px] font-semibold cursor-pointer
    //         md:border-[0.5px] border-gachigageBrightMint1 md:rounded-[8px] 
    //         ${(isPending || status === "loading") ? 'opacity-50 cursor-not-allowed' : ''}
    //     `}
    //     >
    //         {isPending ? '생성 중...' : status === "loading" ? '확인 중...' : '문의하기'}
    //     </button>
    // );
    return (
        <button
            onClick={handleClick}
            className={`w-full h-[56px] flex items-center justify-center  bg-gachigageMint text-gachigageWhite leading-[120%] text-[24px]  font-semibold cursor-pointer
            md:border-[0.5px] border-gachigageBrightMint1 md:rounded-[8px] 
        `}
        >
            문의하기
        </button>
    );
}
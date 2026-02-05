"use client";

import Link from "next/link";

type InquireOrEditButtonType = {
    isOwner: boolean;
    productId: number;
};

export default function InquireOrEditButton({
    isOwner,
    productId,
}: InquireOrEditButtonType) {
    /*
        1. 문의하기 버튼을 누르면 채팅 창으로 이동해야함. (로직은 어떻게? 그냥 라우팅만?)
        2. 수정하기 버튼을 누르면 store에 정보 다 넣고 수정하기 페이지로 이동해야함. (이때 productId가 필요한데 이거는 store에 넣는게 좋을까 아니면 파라미터 등으로 받는게 좋을까, 아니면 폴더를 [id] 폴더 밑에 edit 폴더를 넣고 라우팅을 그렇게 해서 id를 빼는게 좋을까)
    */

    return (
        <Link
            href={isOwner ? `/products/${productId}/edit` : ""}
            className={`w-full h-[56px] flex items-center justify-center  bg-gachigageMint text-gachigageWhite leading-[120%] text-[24px]  font-semibold cursor-pointer
            md:border-[0.5px] border-gachigageBrightMint1 md:rounded-[8px] 
        `}
        >
            {isOwner ? "수정하기" : "문의하기"}
        </Link>
    );
}

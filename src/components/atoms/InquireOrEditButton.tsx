"use client";

type InquireOrEditButtonType = {
    isOwner: boolean;
    isEditorInquireClick?: () => void;
};

export default function InquireOrEditButton({
    isOwner,
    isEditorInquireClick,
}: InquireOrEditButtonType) {
    // TODO: 문의하기 버튼 채팅으로 어떻게 라우팅할지 논의 필요
    // TODO: 수정하기 버튼을 누르면 store에 정보 다 넣고 수정하기 페이지로 이동해야함

    return (
        <button
            className={`w-full h-[56px] flex items-center justify-center  bg-gachigageMint text-gachigageWhite leading-[120%] text-[24px]  font-semibold cursor-pointer
            md:border-[0.5px] border-gachigageBrightMint1 md:rounded-[8px] 
        `}
            onClick={isEditorInquireClick}
        >
            {isOwner ? "수정하기" : "문의하기"}
        </button>
    );
}

import DefaultButton from "@/components/atoms/DefaultButton";

export default function ProfileCard() {
    return (
        <div className="w-full">
            <div className="text-dSubTitle mb-[20px]">내 정보</div>
            <div className="flex flex-col
                w-full
                md:flex-row
                justify-center 
                md:justify-normal
                items-center
                gap-6 md:gap-10
                mx-auto
                px-[24px]
                max-w-[1152px]
                h-[462px]
                md:h-[268px]
                rounded-[8px]
                bg-[#F0F0F0]
                border border-[#E7E6E6]
            ">
                <div className="w-[172px] h-[172px]">
                    <div className="w-full h-full bg-gray-300 rounded-full" />
                </div>
                <div className="flex flex-col gap-3">
                    <div className="text-dSubTitle">닉네임</div>
                    <div className="--text-dBody text-[var(--color-gachigageGray7)] flex flex-col gap-1">
                        <div className="flex flex-row">
                            <span className="pr-[5px]">이메일:</span>
                            <span>abcedf11111@naver.com</span>
                        </div>
                        <div>최근 3일 이내 활동</div>
                        <div>2026년 1월 13일 가입</div>
                    </div>
                    <div className="flex flex-row gap-2">
                        <DefaultButton name="프로필 사진 등록" borderColor="border-[var(--color-gachigageSubMint)]" backgroundColor="bg-white" color="text-gachigageSubMint"/>
                        <DefaultButton name="닉네임 변경" borderColor="border-[var(--color-gachigageSubMint)]" backgroundColor="bg-white" color="text-gachigageSubMint"/>
                    </div>
                </div>
            </div>
        </div>
    )
}
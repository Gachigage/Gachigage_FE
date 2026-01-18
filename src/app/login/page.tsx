import KakaoLoginButton from "@/components/atoms/KakaoLoginButton";
import SkipButton from "@/components/atoms/SkipButton";
import Image from "next/image";

export default function LoginPage() {
    return (
        <div className="relative w-screen h-screen flex flex-col items-center bg-gachigageWhite">
            <div
                className="w-full h-full flex flex-col 
                md:w-[368px] md:h-auto md:block md:absolute md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2"
            >
                <div
                    className="flex-grow flex flex-col items-center justify-center w-full
                    md:flex-grow-0 md:absolute md:bottom-full md:left-0 md:mb-[56px] gap-[24px]"
                >
                    <Image
                        src={"/logo.svg"}
                        alt="같이가게 로고"
                        width={60}
                        height={60}
                        className="w-[60px] h-[60px] md:w-[50px] md:h-[50px]"
                    />
                    <div className="flex flex-col gap-[16px] items-center">
                        <p className="font-normal text-gachigageGray7">
                            자영업의 모든 순간을 함께,
                        </p>
                        <p className="font-bold text-[18px] text-[#2E8E82]">
                            같이 가게
                        </p>
                    </div>
                </div>

                <div
                    className="flex flex-col gap-[24px] px-[20px] mb-[56px]
                    md:mb-0 md:px-0"
                >
                    <KakaoLoginButton />
                    <div className="w-full md:w-[368px] flex items-center">
                        <div className="grow border-t border-[#D9D9D9]"></div>
                        <span className="text-[13px] font-normal text-gachigageGray5 px-[13px]">
                            또는
                        </span>
                        <div className="grow border-t border-[#D9D9D9]"></div>
                    </div>
                    <SkipButton />
                </div>
            </div>
        </div>
    );
}

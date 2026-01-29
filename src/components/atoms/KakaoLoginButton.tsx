import Image from "next/image";
import Link from "next/link";
import kakao from "@/assets/icons/kakao.svg";

const KAKAO_AUTH_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/oauth2/authorization/kakao`;

export default function KakaoLoginButton() {
    return (
        <Link
            href={KAKAO_AUTH_URL}
            className="w-full md:w-[368px] h-[56px] flex items-center justify-center gap-[10px] bg-[#FEE500] rounded-[12px] font-medium font-['system-ui','-apple-system','BlinkMacSystemFont']"
        >
            <Image src={kakao} alt="kakao icon" width={19} height={19} />
            카카오로 시작하기
        </Link>
    );
}

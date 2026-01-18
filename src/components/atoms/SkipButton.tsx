import Link from "next/link";

export default function SkipButton() {
    return (
        <Link
            href="/"
            className="w-full md:w-[368px] h-[56px] rounded-[12px] border-[0.5px] border-gachigageGray3 bg-gachigageWhite flex items-center justify-center text-gachigageGray7 font-normal"
        >
            다음에 할래요
        </Link>
    );
}

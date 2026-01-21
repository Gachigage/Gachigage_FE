import Link from "next/link";

export default function ProductAddButton() {
    return (
        <Link
            href="/products/create"
            className="w-[114px] h-[32px] cursor-pointer md:w-[230px] md:h-[54px] xl:w-[186px] xl:h-[56px] flex items-center justify-center bg-gachigageMint border-[0.5px] border-gachigageBrightMint1 rounded-[8px] text-gachigageWhite font-normal text-[13px] md:font-medium xl:font-semibold md:text-[18px] hover:bg-gachigageDarkMint1"
        >
            물품 등록
        </Link>
    );
}

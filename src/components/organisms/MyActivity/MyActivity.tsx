import DefaultButton from "@/components/atoms/DefaultButton"
import MyActivityItem from "./MyActivityItem"
import moreIcon from "@/assets/icons/more.svg"
import Image from "next/image"
import Link from "next/link"

export default function MyActivity() {
    const post = {
        title: '게시글 제목',
        content: '약간의 본문입니다. 최대 두줄까지 노출시키면 좋을 것 같습니다.Lorem ipsum dolor sit amet, consectetur Lorem ipsum  dolor sit amet, consectetur Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, consectetur',  
        date: '2026-01-13',
        comments: 120,
        likes: 120, 
    }

    const postList = [
        post,
        post,   
        post,
        post,
    ]
    return (
        <div className="w-full flex flex-col gap-7">
            <div className="text-dSubTitle">내 활동</div>
            <div className="flex flex-row gap-3">
                <DefaultButton name="작성한 게시글" borderColor="border-[var(--color-gachigageGray3)]" />
                <DefaultButton name="작성한 댓글" borderColor="border-[var(--color-gachigageGray3)]" />
            </div>
            <div className="flex flex-row justify-between items-center">
                <span>최신순</span>
                <Link href="#" className="flex flex-row gap-1">
                    <span>더보기</span>
                    <Image src={moreIcon} alt="더보기"/>
                </Link>
            </div>
            <div className="flex flex-col gap-5 border-[var(--color-gachigageGray3)] py-4">
                {postList.map((post, index) => (
                    <MyActivityItem post={post} index={index} key={index}/>
                ))}
            </div>
        </div>
    )
}
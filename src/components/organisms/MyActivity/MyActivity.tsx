import DefaultButton from "@/components/atoms/DefaultButton"
import MyActivityItem from "./MyActivityItem"

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
        post,
        post,
        post,
        post,
    ]
    return (
        <div className="w-full">
            <div className="text-dSubTitle mb-[20px]">내 활동</div>
            <div className="flex flex-row gap-3">
                <DefaultButton name="작성한 게시글" borderColor="border-[var(--color-gachigageGray3)]" />
                <DefaultButton name="작성한 댓글" borderColor="border-[var(--color-gachigageGray3)]" />
            </div>
            <div className="flex flex-col gap-1 border-[var(--color-gachigageGray3)] py-4">
                {postList.map((post, index) => (
                    <MyActivityItem post={post} index={index} key={index}/>
                ))}
            </div>
        </div>
    )
}
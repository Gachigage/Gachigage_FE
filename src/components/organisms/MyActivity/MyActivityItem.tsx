export default function MyActivityItem(props: {post: {title: string; content: string; date: string; comments: number; likes: number}, index: number}) {
    const { post, index } = props;

    return (
        <div key={index} className="flex flex-col gap-3 border-b-[var(--color-gachigageGray3)] pb-2 last:border-0">
            <div className="font-bold">{post.title}</div>            
            <div className="text-gachigageGray7">{post.content}</div>
            <div className="flex flex-row gap-2 text-gachigageGray7">
                <div className="flex flex-row">
                    <span className="pr-[5px]">작성일:</span>
                    <span>{post.date}</span>
                </div> 
                <p className="pr-[5px] pl-[5px]">|</p>
                <div>댓글 {post.comments}</div>
                <p className="pr-[5px] pl-[5px]">|</p>
                <div>좋아요 {post.likes}</div>
            </div>
        </div>
    )
}
export default function MyActivityItem(props: {post: {title: string; content: string; date: string; comments: number; likes: number}, index: number}) {
    const { post, index } = props;

    return (
        <div key={index} className="flex flex-col border-b-[var(--color-gachigageGray3)] pb-2 last:border-0">
            <div className="text-dBody font-bold">{post.title}</div>            
            <div className="--text-dBody text-[var(--color-gachigageGray7)]">{post.content}</div>
            <div className="flex flex-row gap-2 --text-dBody text-[var(--color-gachigageGray6)]">
                <div>{post.date}</div>  
                <div>댓글 {post.comments}</div>
                <div>좋아요 {post.likes}</div>
            </div>
        </div>
    )
}
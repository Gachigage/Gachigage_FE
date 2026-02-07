interface DefaultButtonProps {
    className?: string;
    name: string;
    onClick?: () => void;
}
export default function DefaultButton({ className, name, onClick }: DefaultButtonProps) {
    return (
        <button 
            onClick={onClick}
            className={`
                rounded-[8px]
                border
                cursor-pointer
                ${className}
        `}>
            {name}
        </button>
    )
}
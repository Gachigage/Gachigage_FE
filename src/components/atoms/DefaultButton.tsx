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
            ${className}
            w-[148px]
            md:w-[245px]
            h-[40px]
            rounded-[8px]
            border
            cursor-pointer
        `}>
            {name}
        </button>
    )
}
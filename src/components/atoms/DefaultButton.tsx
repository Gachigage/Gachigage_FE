interface DefaultButtonProps {
    className?: string;
    name: string;
    disabled?: boolean;
    onClick?: () => void;
}
export default function DefaultButton({ className, name, disabled = false, onClick }: DefaultButtonProps) {
    return (
        <button 
            disabled={disabled}
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
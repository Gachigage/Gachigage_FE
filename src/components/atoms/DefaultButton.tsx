export default function DefaultButton(props: {name: string, borderColor?: string, backgroundColor?: string, color?: string, onClick?: () => void}) {
    const {color, borderColor, backgroundColor, onClick} = props;
    
    return (
        <button 
            className={`
            w-[148px]
            md:w-[245px]
            h-[40px]
            rounded-[8px]
            border
            ${color || ''}
            ${borderColor || ''}
            ${backgroundColor || ''}
        `}>
            {props.name}
        </button>
    )
}
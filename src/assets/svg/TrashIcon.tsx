interface IconProps {
    width?: number
    height?: number
    color?: string
}

function TrashIcon({ width = 24, height = 24, color = '#042354' }: IconProps) {
    return (
        <svg width={width} height={height} viewBox="0 0 21 23" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.5 5.5V4.7C14.5 3.5799 14.5 3.01984 14.282 2.59202C14.0903 2.21569 13.7843 1.90973 13.408 1.71799C12.9802 1.5 12.4201 1.5 11.3 1.5H9.7C8.57989 1.5 8.01984 1.5 7.59202 1.71799C7.21569 1.90973 6.90973 2.21569 6.71799 2.59202C6.5 3.01984 6.5 3.5799 6.5 4.7V5.5M8.5 11V16M12.5 11V16M1.5 5.5H19.5M17.5 5.5V16.7C17.5 18.3802 17.5 19.2202 17.173 19.862C16.8854 20.4265 16.4265 20.8854 15.862 21.173C15.2202 21.5 14.3802 21.5 12.7 21.5H8.3C6.61984 21.5 5.77976 21.5 5.13803 21.173C4.57354 20.8854 4.1146 20.4265 3.82698 19.862C3.5 19.2202 3.5 18.3802 3.5 16.7V5.5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
}
  
export default TrashIcon
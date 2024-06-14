interface IconProps {
    width?: number
    height?: number
    color?: string
}
  
function FileIcon({ width = 24, height = 24, color = "#042354" }: IconProps) {
    return (
        <svg width={width} height={height} viewBox="0 0 19 23" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.5 1.76953V5.90007C11.5 6.46012 11.5 6.74015 11.609 6.95406C11.7049 7.14222 11.8578 7.2952 12.046 7.39108C12.2599 7.50007 12.5399 7.50007 13.1 7.50007H17.2305M13.5 12.5H5.5M13.5 16.5H5.5M7.5 8.5H5.5M11.5 1.5H6.3C4.61984 1.5 3.77976 1.5 3.13803 1.82698C2.57354 2.1146 2.1146 2.57354 1.82698 3.13803C1.5 3.77976 1.5 4.61984 1.5 6.3V16.7C1.5 18.3802 1.5 19.2202 1.82698 19.862C2.1146 20.4265 2.57354 20.8854 3.13803 21.173C3.77976 21.5 4.61984 21.5 6.3 21.5H12.7C14.3802 21.5 15.2202 21.5 15.862 21.173C16.4265 20.8854 16.8854 20.4265 17.173 19.862C17.5 19.2202 17.5 18.3802 17.5 16.7V7.5L11.5 1.5Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
}

export default FileIcon
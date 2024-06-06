interface IconProps {
    width?: number
    height?: number
    color?: string
  }
  
function AddIcon({ width = 24, height = 24, color = "#042354" }: IconProps) {
    return (
        <svg width={width} height={height} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 1V15M1 8H15" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
}

export default AddIcon
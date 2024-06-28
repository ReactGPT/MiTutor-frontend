interface IconProps {
  size?:number
  color?: string
}

function IconClose({size = 20 , color="white"}: IconProps) {
  return(
    <svg width={size} height={size} viewBox="0 0 14 14" fill={color} xmlns="http://www.w3.org/2000/svg">
      <path d="M13 1L1 13M1 1L13 13" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  )
}

export default IconClose
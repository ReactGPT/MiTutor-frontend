type IconProps = {
  className?:string;
  size?:number;
  fill?:string;
}


function IconDetails({
  className = "",
  size = 6,
}: IconProps) {
  return (
      <svg className={`${className} h-${size} w-${size}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 12H21M3 6H21M3 18H15" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
  );
}

export default IconDetails;
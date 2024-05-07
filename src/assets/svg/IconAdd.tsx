type IconProps = {
  className?: string;
  size?: number;
};

function IconAdd({
  className = "",
  size = 6,
}: IconProps) {
  return (
    <svg className={`${className} h-${size} w-${size}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 5V19M5 12H19"
      />
    </svg>
  );
}

export default IconAdd;
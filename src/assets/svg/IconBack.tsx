type IconProps = {
  className?: string;
  size?: number;
};

function IconBack({
  className = "",
  size = 24,
}: IconProps) {
  return (
    <svg className={`${className} h-${size} w-${size}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M20 12H4M4 12L10 18M4 12L10 6"
      />
    </svg>
  );
}

export default IconBack;

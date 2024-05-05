type IconProps = {
  className?: string;
  size?: number;
};

function IconSearch({
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
        d="m21 21-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
      />
    </svg>
  );
}

export default IconSearch;
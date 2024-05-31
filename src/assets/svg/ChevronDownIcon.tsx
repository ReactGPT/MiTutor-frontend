type IconProps = {
  className?: string;
  size?: number;
}

function ChevronDownIcon({
  className = "",
  size = 4,
}: IconProps) {
  return (
    <svg className={`${className} h-${size} w-${size}`} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd" // Corrige fillrule a fillRule
        clipRule="evenodd" // Corrige cliprule a clipRule
        d="M2.41842 6.41842C2.97631 5.86053 3.88083 5.86053 4.43872 6.41842L12 13.9797L19.5613 6.41842C20.1192 5.86053 21.0237 5.86053 21.5816 6.41842C22.1395 6.97631 22.1395 7.88083 21.5816 8.43872L13.0102 17.0102C12.4523 17.568 11.5477 17.568 10.9898 17.0102L2.41842 8.43872C1.86053 7.88083 1.86053 6.97631 2.41842 6.41842Z"
      />
    </svg>
  );
}

export default ChevronDownIcon;





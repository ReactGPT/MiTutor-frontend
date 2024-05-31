type IconProps = {
  className?: string;
  size?: number;
};

function IconBack({ className = "", size = 24 }: IconProps) {
  return (
    <svg
      className={`${className} h-${size} w-${size}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
		    d="M21.489 9.5L19.4896 11.5L17.489 9.5M19.7341 11C19.7704 10.6717 19.7891 10.338 19.7891 10C19.7891 5.02944 15.7596 1 10.7891 1C5.8185 1 1.78906 5.02944 1.78906 10C1.78906 14.9706 5.8185 19 10.7891 19C13.6163 19 16.1391 17.6963 17.7891 15.6573M10.7891 5V10L13.7891 12"
		    stroke="#042354"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default IconBack;

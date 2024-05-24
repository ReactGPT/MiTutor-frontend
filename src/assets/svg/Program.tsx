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
        d="M19.5 3L8.5 3M19.5 17L8.5 17M19.5 10L8.5 10M4.5 3C4.5 3.82843 3.82843 4.5 3 4.5C2.17157 4.5 1.5 3.82843 1.5 3C1.5 2.17157 2.17157 1.5 3 1.5C3.82843 1.5 4.5 2.17157 4.5 3ZM4.5 17C4.5 17.8284 3.82843 18.5 3 18.5C2.17157 18.5 1.5 17.8284 1.5 17C1.5 16.1716 2.17157 15.5 3 15.5C3.82843 15.5 4.5 16.1716 4.5 17ZM4.5 10C4.5 10.8284 3.82843 11.5 3 11.5C2.17157 11.5 1.5 10.8284 1.5 10C1.5 9.17157 2.17157 8.5 3 8.5C3.82843 8.5 4.5 9.17157 4.5 10Z"
		stroke="#042354"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

export default IconBack;

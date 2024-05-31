import React from 'react';

type IconProps = {
  className?: string;
  size?: number;
};

function IconAlertCircle({
  className = "",
  size = 6,
}: IconProps) {
  return (
    <svg className={`${className} h-${size} w-${size}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <path
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 8V12M12 16H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
      />
    </svg>
  );
}

export default IconAlertCircle;

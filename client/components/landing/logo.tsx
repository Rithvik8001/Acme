import type { SVGProps } from "react";

interface AcmeLogoProps extends SVGProps<SVGSVGElement> {
  size?: number;
}

export function AcmeLogo({ size = 20, className, ...props }: AcmeLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <line
        x1="9.5"
        y1="4"
        x2="2.5"
        y2="16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
      />
      <line
        x1="10.5"
        y1="4"
        x2="17.5"
        y2="16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
      />
      <line
        x1="5.5"
        y1="12"
        x2="14.5"
        y2="12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
      />
      <rect x="8" y="0" width="4" height="4" fill="currentColor" />
      <rect
        x="0"
        y="16"
        width="4"
        height="4"
        fill="currentColor"
        opacity="0.5"
      />
      <rect
        x="16"
        y="16"
        width="4"
        height="4"
        fill="currentColor"
        opacity="0.5"
      />
    </svg>
  );
}

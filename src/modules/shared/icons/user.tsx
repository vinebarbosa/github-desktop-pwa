import React from "react";

export function UserIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 21.0315V19.0315C20 17.9706 19.5786 16.9532 18.8284 16.2031C18.0783 15.4529 17.0609 15.0315 16 15.0315H8C6.93913 15.0315 5.92172 15.4529 5.17157 16.2031C4.42143 16.9532 4 17.9706 4 19.0315V21.0315"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 11.0315C14.2091 11.0315 16 9.24063 16 7.03149C16 4.82236 14.2091 3.03149 12 3.03149C9.79086 3.03149 8 4.82236 8 7.03149C8 9.24063 9.79086 11.0315 12 11.0315Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

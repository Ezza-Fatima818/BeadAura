import React from "react";

export default function JumpRing({
  size = 42,
  color = "#D4AF37",
}) {

  return (

    <svg
      width={size}
      height={size}

      viewBox="0 0 100 100"
    >

      <circle
        cx="50"
        cy="50"

        r="32"

        fill="none"

        stroke={color}

        strokeWidth="10"

        strokeLinecap="round"

        strokeDasharray="192 8"

        transform="rotate(35 50 50)"
      />

    </svg>

  );
}
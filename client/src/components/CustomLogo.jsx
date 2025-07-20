import React from "react";

const CustomLogo = ({ width = 130 }) => {
  return (
    <div className="flex items-center">
      <svg
        width={width}
        viewBox="0 0 90 20"
        xmlns="http://www.w3.org/2000/svg"
        className="inline-block"
      >
        <rect x="0" y="2" width="30" height="18" rx="4" fill="#FF0000" />
        <polygon points="12,6 12,14 20,10" fill="white" />
      </svg>
    </div>
  );
};

export default CustomLogo;

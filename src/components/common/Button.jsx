import React from "react";

const Button = ({ value, type, className, onClick }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`uppercase hover:bg-white border border-black hover:text-black duration-300 text-sm tracking-tight bg-black text-white cursor-pointer p-2 ${className}`}
    >
      {value}
    </button>
  );
};

export default Button;

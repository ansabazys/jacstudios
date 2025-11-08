import React, { forwardRef } from "react";

const InputBox = ({
  label,
  type = "text",
  placeholder = "",
  onChange,
  errors,
  className = "",
  register,
  ...rest
}) => {
  return (
    <div className={`flex w-full flex-col gap-1 ${className}`}>
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}

      <input
        type={type}
        className="border w-full p-2 outline-none"
        autoComplete="true"
        placeholder={placeholder}
        {...rest}
        onChange={onChange}
      />
      {errors && <p className="text-red-400 text-xs">{errors}</p>}
    </div>
  );
};

export default InputBox;

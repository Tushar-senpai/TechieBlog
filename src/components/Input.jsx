import React, { useId } from "react";

const Input = React.forwardRef(function Input(
  { label, type = "text", className = "", ...props },
  ref
) {
  const id = useId();

  return (
    <div className="w-full">
      {label && (
        <label
          className="inline-block mb-1 text-left"
          htmlFor={id}
          style={{
            paddingLeft: "0px",
            marginBottom: "4px",
            display: "block",
          }}
        >
          {label}
        </label>
      )}
      <input
        type={type}
        className={`px-3 p-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
        ref={ref}
        {...props}
        id={id}
      />
    </div>
  );
});

export default Input;

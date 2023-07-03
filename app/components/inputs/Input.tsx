import React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type,
  disabled,
  formatPrice,
  required,
  register,
  errors,
  onChange,
}) => {
  let inputClassName = `
    peer w-full transition disabled:opacity-70 disabled:cursor-not-allowed
    ${formatPrice ? "pl-9" : "pl-4"}
    ${errors[id] ? "border-rose-500" : "border-neutral-300"}
    ${errors[id] ? "focus:border-rose-500" : "focus:border-black"}
    ${type === "checkbox"
      ? "ml-2 mt-2 w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-60"
      : "p-2 pt-8 font-light bg-white border-2 rounded-md outline-none"}
  `;

  if (type === "email" && errors[id]) {
    inputClassName += " border-rose-500"; // Add specific style for email error
  }

  if (type === "password" && errors[id]) {
    inputClassName += " border-rose-500"; // Add specific style for password error
  }

  if (type === "text" && id === "name" && errors[id]) {
    inputClassName += " border-rose-500"; // Add specific style for name error
  }

  if (type === "tel" && id === "contact" && errors[id]) {
    inputClassName += " border-rose-500"; // Add specific style for phone error
  }

  return (
    <div className="w-full relative">
      <input
        className={inputClassName}
        id={id}
        disabled={disabled}
        {...register(id, {
          required: required && `${label} is required.`,
          ...(type === "email" && {
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email address.",
            },
          }),
          ...(type === "password" && {
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters long.",
            },
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
              message:
                "Password must contain at least one uppercase letter, one lowercase letter, and one digit.",
            },
          }),
          ...(type === "text" && id === "name" && {
            minLength: {
              value: 3,
              message: "This field must contain at least 3 characters.",
            },
            maxLength: {
              value: 50,
              message: "Name must not exceed 50 characters.",
            },
          }),
          ...(type === "tel" && id === "contact" && {
            pattern: {
              value: /^(\+92|0|92)[0-9]{10}$/,
              message: "Invalid phone number.",
            },
          }),
        })}
        placeholder=" "
        type={type}
        onChange={onChange}
      />

      <label
        className={`
          absolute text-md duration-150 transform -translate-y-3 top-5 z-10 origin-[0]
          ${formatPrice ? "left-9" : "left-4"}
          ${errors[id] ? "text-rose-500" : "text-black-500"}
          ${
            type === "checkbox"
              ? "ml-6 text-md"
              : "peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
          }
        `}
      >
        {label}
      </label>
      {errors[id] && (
        <span className="text-rose-500 text-sm mt-1">
          {errors[id]?.message as React.ReactNode}
        </span>
      )}
    </div>
  );
};

export default Input;

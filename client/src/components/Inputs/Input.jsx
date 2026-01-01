import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Input = ({
  value,
  onChange,
  label,
  placeholder,
  type = "text",
  allowInput = true,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";

  return (
    <div className="w-full">
      {/* Label */}
      {label && (
        <label
          className="
            block
            text-[9px] sm:text-[10px]
            font-black
            uppercase
            tracking-[0.25em]
            text-[var(--color-text)]
            opacity-40
            mb-2 sm:mb-3
            ml-1
          "
        >
          {label}
        </label>
      )}

      {/* Input wrapper */}
      <div
        className="
          flex items-center gap-3
          px-4 py-3 sm:py-3.5
          rounded-2xl
          bg-[var(--color-divider)]
          border border-[var(--color-border)]
          transition-all
          focus-within:border-primary/40
          focus-within:ring-1
          focus-within:ring-primary/30
        "
      >
        <input
          type={isPassword ? (showPassword ? "text" : "password") : type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={!allowInput}
          className="
            w-full
            bg-transparent
            outline-none
            text-sm sm:text-base
            text-[var(--color-text)]
            placeholder:text-gray-400 dark:placeholder:text-gray-500
            disabled:opacity-40
          "
          aria-label={label || placeholder}
        />

        {/* Password toggle */}
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="
              text-[var(--color-text-muted)]
              hover:text-primary
              transition-colors
              flex items-center
            "
          >
            {showPassword ? (
              <FaRegEye size={18} />
            ) : (
              <FaRegEyeSlash size={18} />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;

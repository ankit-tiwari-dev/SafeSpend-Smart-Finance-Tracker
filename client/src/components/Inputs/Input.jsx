import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Input = (props) => {
  const {
    value,
    onChange,
    label,
    placeholder,
    type,
    allowInput = true,
  } = props;
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-text)] opacity-40 mb-3 ml-1">
        {label}
      </label>

      <div className="input-box">
        <input
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          placeholder={placeholder}
          className="w-full bg-transparent outline-none placeholder-gray-400 dark:placeholder-gray-500 focus:ring-primary"
          style={{
            color: "var(--color-text)",
          }}
          value={value}
          onChange={(e) => onChange(e)}
          disabled={!allowInput}
        />

        {type === "password" && (
          <div className="flex items-center">
            {showPassword ? (
              <FaRegEye
                size={22}
                className="text-primary cursor-pointer"
                onClick={() => togglePasswordVisibility()}
              />
            ) : (
              <FaRegEyeSlash
                size={22}
                className="text-gray-400 dark:text-gray-500 cursor-pointer"
                onClick={() => togglePasswordVisibility()}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Input;

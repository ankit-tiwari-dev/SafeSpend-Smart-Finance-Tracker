import { getInitials } from "../../utils/helper";

const CharAvatar = ({
  fullName = "",
  width = "w-12",
  height = "h-12",
  style = "",
}) => {
  const initials = getInitials(fullName) || "?";

  return (
    <div
      aria-label={fullName || "User avatar"}
      title={fullName || "User"}
      className={`
        ${width} ${height} ${style}
        flex items-center justify-center
        rounded-full
        bg-gray-100
        text-gray-900
        font-semibold
        select-none
        ring-1 ring-gray-200
        overflow-hidden
      `}
    >
      <span className="text-xs sm:text-sm leading-none">
        {initials.toUpperCase()}
      </span>
    </div>
  );
};

export default CharAvatar;

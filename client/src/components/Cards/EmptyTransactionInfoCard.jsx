import { RiHistoryFill } from "react-icons/ri";

const EmptyTransactionInfoCard = ({
  title = "No transactions yet",
  description = "Your recent transactions will appear here.",
}) => {
  return (
    <div
      className="flex items-center justify-center w-full h-full px-4"
      aria-label="Empty transactions placeholder"
    >
      <div className="flex flex-col items-center text-center max-w-sm gap-3 opacity-80">
        {/* Icon */}
        <RiHistoryFill
          className="text-4xl sm:text-5xl mb-1"
          style={{ color: "var(--color-text-muted)" }}
          aria-hidden="true"
        />

        {/* Title */}
        <h5 className="text-base sm:text-lg font-medium text-[var(--color-text)] truncate">
          {title}
        </h5>

        {/* Description */}
        <p className="text-sm sm:text-base text-[var(--color-text-muted)] leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

export default EmptyTransactionInfoCard;

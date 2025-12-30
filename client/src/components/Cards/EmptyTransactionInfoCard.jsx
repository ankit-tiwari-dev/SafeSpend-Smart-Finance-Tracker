import { RiHistoryFill } from "react-icons/ri";

const EmptyTransactionInfoCard = (prop) => {
  const { title, description } = prop;

  return (
    <div className="flex items-center justify-center h-full w-full">
      <div className="flex flex-col items-center text-center max-w-xs">
        <div className="mb-1">
          <RiHistoryFill
            className="text-6xl"
            style={{ color: "var(--color-text-muted)" }}
          />
        </div>
        <h5
          style={{
            fontSize: "18px",
            fontWeight: "500",
            color: "var(--color-text)",
            marginBottom: "8px",
          }}
        >
          {title}
        </h5>
        <p
          style={{
            fontSize: "14px",
            color: "var(--color-text-muted)",
          }}
        >
          {description}
        </p>
      </div>
    </div>
  );
};

export default EmptyTransactionInfoCard;

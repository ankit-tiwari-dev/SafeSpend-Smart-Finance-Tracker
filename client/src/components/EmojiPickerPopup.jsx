import { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { LuImage, LuX } from "react-icons/lu";

const EmojiPickerPopup = (props) => {
  const { icon, onSelect } = props;

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row items-center gap-5 mb-6">
      <div
        className="flex items-center gap-4 cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <div
          className="w-12 h-12 flex items-center justify-center text-2xl rounded-lg"
          style={{
            backgroundColor: "var(--color-surface)",
            color: "var(--color-primary)",
            border: "1px solid var(--color-border)",
          }}
        >
          {icon ? (
            <img src={icon} alt="Icon" className="w-12 h-12" />
          ) : (
            <LuImage />
          )}
        </div>

        <p style={{ color: "var(--color-text)", fontSize: "14px", fontWeight: "500" }}>{icon ? "Change Icon" : "Pick Icon"}</p>
      </div>

      {isOpen && (
        <div className="relative animate-in zoom-in-95 duration-300">
          <button
            className="w-10 h-10 flex items-center justify-center bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl absolute -top-4 -right-4 z-10 cursor-pointer text-[var(--color-text)] hover:scale-110 transition-transform shadow-lg"
            onClick={() => setIsOpen(false)}
          >
            <LuX />
          </button>

          <div className="rounded-[32px] overflow-hidden border border-[var(--color-border)] shadow-2xl">
            <EmojiPicker
              open={isOpen}
              onEmojiClick={(emoji) => onSelect(emoji?.imageUrl || "")}
              theme={document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default EmojiPickerPopup;

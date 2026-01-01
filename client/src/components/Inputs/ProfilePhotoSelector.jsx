import { useState, useRef, useEffect } from "react";
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";

const ProfilePhotoSelector = ({ image, setImage }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  // Update preview URL when image prop changes
  useEffect(() => {
    if (image) {
      const url = typeof image === "string" ? image : URL.createObjectURL(image);
      setPreviewUrl(url);

      // Clean up object URL for memory
      return () => {
        if (typeof image !== "string") URL.revokeObjectURL(url);
      };
    } else {
      setPreviewUrl(null);
    }
  }, [image]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  return (
    <div className="flex justify-center mb-6">
      {/* Hidden file input */}
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      {/* Profile placeholder */}
      {!previewUrl ? (
        <div className="w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center bg-purple-100 rounded-full relative">
          <LuUser className="text-4xl sm:text-5xl text-primary" />

          {/* Upload button */}
          <button
            type="button"
            onClick={onChooseFile}
            aria-label="Upload profile photo"
            className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center bg-primary text-white rounded-full absolute -bottom-1 -right-1 hover:scale-105 transition-transform"
          >
            <LuUpload size={16} />
          </button>
        </div>
      ) : (
        <div className="relative w-20 h-20 sm:w-24 sm:h-24">
          {/* Preview image */}
          <img
            src={previewUrl}
            alt="Profile Preview"
            className="w-full h-full rounded-full object-cover border border-[var(--color-border)] shadow-sm"
          />

          {/* Remove button */}
          <button
            type="button"
            onClick={handleRemoveImage}
            aria-label="Remove profile photo"
            className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center bg-red-500 text-white rounded-full absolute -bottom-1 -right-1 hover:scale-105 transition-transform"
          >
            <LuTrash size={14} />
          </button>

          {/* Change button overlay */}
          <button
            type="button"
            onClick={onChooseFile}
            aria-label="Change profile photo"
            className="absolute inset-0 rounded-full bg-black/0 hover:bg-black/10 transition-colors"
          />
        </div>
      )}
    </div>
  );
};

export default ProfilePhotoSelector;

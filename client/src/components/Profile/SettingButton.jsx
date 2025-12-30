const SettingButton = ({ icon, onClick, tooltip }) => {
  return (
    <div className="relative group">
      <button className="action-btn" type="button" onClick={onClick}>
        {icon}
      </button>
      {tooltip && (
        <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition transform bg-white shadow-md rounded-lg border border-gray-100 text-xs px-2 py-1 z-10 whitespace-nowrap text-gray-500">
          {tooltip}
        </span>
      )}
    </div>
  );
};

export default SettingButton;

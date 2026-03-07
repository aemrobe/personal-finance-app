function ProgressBar({
  percentage,
  themeColor,
  newPercentage,
  containerClass,
  isAddType,
}) {
  return (
    <div
      className={`w-full bg-surface-secondary rounded flex gap-0.5 ${containerClass}`}
    >
      <div
        style={{
          width: `calc(${percentage}% - 0.0625rem)`,
          backgroundColor: `${!newPercentage ? themeColor : ""}`,
        }}
        className={`${newPercentage ? "rounded-l bg-surface-inverse" : "rounded"}  h-full`}
      ></div>
      {newPercentage && (
        <div
          style={{
            width: `calc(${newPercentage}% - 0.0625rem)`,
          }}
          className={`rounded-r bg-green-500 h-full ${isAddType ? "bg-icon-success" : "bg-surface-destroy"}`}
        ></div>
      )}
    </div>
  );
}

export default ProgressBar;

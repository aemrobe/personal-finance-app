import SpinnerMini from "./SpinnerMini";

function SpinnerMiniContainer({
  position = "inset-0",
  backgroundColor = "",
  size = "",
}) {
  return (
    <div
      className={`rounded-xl absolute z-25  ${position} pointer-events-none  flex items-center justify-center ${backgroundColor}`}
    >
      <SpinnerMini size={size} />
      <span className="sr-only">Processing request...</span>
    </div>
  );
}

export default SpinnerMiniContainer;

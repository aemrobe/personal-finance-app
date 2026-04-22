import SpinnerMini from "./SpinnerMini";

function SpinnerMiniContainer({ backgroundColor = "", size = "" }) {
  return (
    <div
      className={`rounded-xl absolute z-25  inset-0 pointer-events-none  flex items-center justify-center ${backgroundColor}`}
    >
      <SpinnerMini size={size} />
      <span className="sr-only">Processing request...</span>
    </div>
  );
}

export default SpinnerMiniContainer;

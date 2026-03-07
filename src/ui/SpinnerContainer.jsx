import Spinner from "./Spinner";

function SpinnerContainer({
  className = "bg-surface-app/50 backdrop-blur-sm",
}) {
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center ${className}`}
    >
      <Spinner />
    </div>
  );
}

export default SpinnerContainer;

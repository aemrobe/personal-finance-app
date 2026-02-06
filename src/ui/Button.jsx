import SpinnerMini from "./SpinnerMini";

function Button({ children, icon, variant, isActionButton, isLoading }) {
  const baseStyle = isActionButton
    ? "text-preset-4-bold p-4"
    : "p-0 text-preset-4";

  const variants = {
    primary:
      "text-content-inverse  bg-surface-inverse hover:bg-surface-inverse-hover",
    secondary:
      "text-content-main bg-surface-secondary hover:bg-surface-secondary-hover border border-surface-secondary hover:border-border-base",
    tertiary: "bg-transparent text-content-secondary hover:text-content-main",
    destroy:
      "bg-surface-destroy hover:bg-surface-destroy-hover text-content-inverse",
  };

  return (
    <button
      disabled={isLoading}
      className={`cursor-pointer disabled:cursor-not-allowed focusable-ring capitalize flex justify-center items-center gap-3  rounded-lg transition-colors duration-700 ${isLoading ? "opacity-80" : ""} ease-in-out ${baseStyle} ${variants[variant]} relative`}
    >
      {isLoading && (
        <div className="absolute inset-0  flex items-center justify-center">
          <SpinnerMini />
          <span className="sr-only">Processing request...</span>
        </div>
      )}

      <div className={`${isLoading ? "opacity-0" : ""}`}>
        {children}
        {icon && icon}
      </div>
    </button>
  );
}

export default Button;

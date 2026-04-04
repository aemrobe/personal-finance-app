import SpinnerMiniContainer from "./SpinnerMiniContainer";

function Button({
  children,
  icon,
  variant,
  isActionButton,
  isLoading,
  disabled,
  className,
  onClick,
  ...props
}) {
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
      onClick={onClick}
      data-variant={variant}
      disabled={isLoading || disabled}
      className={`cursor-pointer  focusable-ring flex justify-center items-center gap-3  rounded-lg transition-colors duration-700 disabled-button ease-in-out ${baseStyle} ${variants[variant]} relative ${className}`}
      {...props}
    >
      {isLoading && <SpinnerMiniContainer />}

      <div className={`${isLoading ? "opacity-0" : ""}`}>{children}</div>

      <span className={`${isLoading ? "opacity-0" : ""}`}> {icon && icon}</span>
    </button>
  );
}

export default Button;

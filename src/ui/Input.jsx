import { forwardRef } from "react";

const Input = forwardRef(function Input(
  {
    onChange,
    isLoading,
    labelForIcon,
    label,
    id,
    onIconClick,
    icon,
    errorId,
    prefix = false,
    helperText = "",
    error,
    ...props
  },
  ref,
) {
  return (
    <div className="flex flex-col">
      {label && (
        <label
          className="capitalize mb-1 self-start  text-preset-5-bold text-content-secondary"
          htmlFor={id}
        >
          {label}
        </label>
      )}

      <div
        className={`relative overflow-hidden focusable-ring ${error ? "[--ring-color:var(--color-border-error)]" : ""} border ${error ? "border-border-error" : "border-border-base"} rounded-lg flex items-center`}
      >
        {prefix && (
          <span
            aria-hidden="true"
            className={
              "mr-3 text-preset-4 text-content-placeholder absolute left-5"
            }
          >
            $
          </span>
        )}

        <input
          ref={ref}
          id={id}
          aria-invalid={error ? true : false}
          aria-describedby={error ? errorId : null}
          disabled={isLoading}
          onChange={onChange}
          className={`min-w-0 outline-none py-3 ${prefix ? "pl-10" : "pl-5"}  ${icon ? "pr-12" : "pr-5"} text-content-main placeholder:text-content-placeholder text-preset-4 rounded-lg flex-auto
         disabled-input
            `}
          {...props}
        />

        {icon && (
          <button
            aria-label={labelForIcon}
            type="button"
            onClick={onIconClick}
            className="ml-4 absolute right-5 outline-none"
          >
            {icon}
          </button>
        )}
      </div>

      {error ? (
        <Text
          text={error}
          errorId={errorId}
          textColor={error ? "text-content-error" : "text-content-secondary"}
        />
      ) : (
        helperText && (
          <Text text={helperText} textColor={"text-content-secondary"} />
        )
      )}
    </div>
  );
});

function Text({ text, textColor, errorId = "" }) {
  return (
    <p id={errorId} className={`text-preset-5 ${textColor} mt-1 self-end`}>
      {text}
    </p>
  );
}
export default Input;

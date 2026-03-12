import { SelectedIcon } from "./Icons";

function SelectOption({
  option,
  optionProperty1,
  optionProperty2,
  handleSelect,
  isUsed,
  isSelected,
  isColor,
}) {
  return (
    <li className="py-1" role="none">
      <button
        onClick={() => {
          handleSelect(option);
        }}
        type="button"
        role="option"
        aria-selected={isSelected}
        disabled={isUsed}
        className={`focusable-ring rounded-lg py-2 flex items-center w-full ${isUsed ? "disabled:cursor-not-allowed" : "cursor-pointer"}`}
      >
        {isColor && (
          <span
            aria-hidden="true"
            style={{ backgroundColor: option[optionProperty2] }}
            className={`inline-block w-4 h-4 rounded-full ${isUsed ? "opacity-10" : "opacity-100"}`}
          ></span>
        )}

        <span
          className={`ml-3 text-preset-4 capitalize ${isUsed ? "text-content-secondary" : "text-content-main"}`}
        >
          {option[optionProperty1]}
        </span>

        {isColor && (
          <span className="ml-auto text-preset-5 text-content-secondary">
            {isUsed ? "Already used" : ""}
          </span>
        )}

        {isColor && isSelected && !isUsed && (
          <span className="p-[0.0937rem]">
            <SelectedIcon className={"text-icon-success w-3.5 h-3.5"} />
            <span className="sr-only">selected</span>
          </span>
        )}

        {!isColor && isSelected && !isUsed && (
          <span className="sr-only">selected</span>
        )}
      </button>
    </li>
  );
}

export default SelectOption;

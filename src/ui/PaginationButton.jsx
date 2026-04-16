import { CaretLeftIcon, CaretRightIcon } from "./Icons";

function PaginationButton({ buttonText }) {
  return (
    <button className="border border-border-base text-content-main capitalize py-3 md:py-[0.593rem] px-4 text-preset-4 flex items-center gap-4 rounded-lg hover:bg-surface-tertiary-hover hover:text-content-inverse group h-10 w-12 md:w-24 transition-all duration-200 ease-in-out">
      {buttonText === "Next" && (
        <span className="hidden md:inline-block">{buttonText}</span>
      )}

      <span className="size-4 flex items-center justify-center text-content-secondary group-hover:text-content-inverse transition-colors duration-200">
        {buttonText === "Next" ? (
          <CaretRightIcon className={"h-2.75"} />
        ) : (
          <CaretLeftIcon className={"h-2.75"} />
        )}
      </span>

      {buttonText !== "Next" && (
        <span className="hidden md:inline-block">{buttonText}</span>
      )}
    </button>
  );
}

export default PaginationButton;

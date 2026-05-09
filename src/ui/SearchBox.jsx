import { useEffect, useRef } from "react";
import SearchIcon from "./Icons/SearchIcon";

function SearchBox({
  searchTerm,
  isLoading,
  onChange,
  placeholder,
  className = "",
}) {
  const inputRef = useRef(null);
  const wasLoading = useRef(isLoading);
  const didUserType = useRef(false);

  const handleInputChange = (e) => {
    didUserType.current = true;
    onChange(e);
  };

  useEffect(() => {
    if (wasLoading.current && !isLoading && didUserType.current) {
      inputRef.current.focus();
      didUserType.current = false;
    }

    wasLoading.current = isLoading;
  }, [isLoading]);

  return (
    <div
      className={`group transition-colors duration-500 flex focusable-ring min-w-0  justify-between items-center border border-border-base hover:border-content-main hover:cursor-pointer  rounded-lg gap-2 focusable-ring-within relative ${className}`}
    >
      <label htmlFor="search-transaction" className="sr-only">
        {placeholder}
      </label>

      <input
        ref={inputRef}
        type="text"
        id="search-transaction"
        value={searchTerm}
        disabled={isLoading}
        onChange={handleInputChange}
        name="transactions"
        placeholder={placeholder}
        className="group-hover:cursor-pointer py-3 pl-5 pr-13 rounded-lg disabled-input text-ellipsis whitespace-nowrap text-preset-4 text-content-main group-hover:placeholder:text-content-main transition-colors duration-500 disabled:cursor-not-allowed min-w-0 focus:outline-none placeholder:text-content-placeholder placeholder:text-preset-4 flex-1 "
      />

      <SearchIcon
        className={"absolute right-5  w-3.5 h-3.5 text-content-main shrink-0"}
      />
    </div>
  );
}

export default SearchBox;

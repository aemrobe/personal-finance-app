import SearchIcon from "./Icons/SearchIcon";

function SearchBox({ searchTerm, isLoading, onChange, className = "" }) {
  return (
    <div
      className={`flex focusable-ring min-w-0  justify-between items-center border border-border-base rounded-lg gap-2 focusable-ring-within relative ${className}`}
    >
      <label htmlFor="search-transaction" className="sr-only">
        Search transaction
      </label>

      <input
        type="text"
        id="search-transaction"
        value={searchTerm}
        disabled={isLoading}
        onChange={onChange}
        name="transactions"
        placeholder="Search transaction"
        className=" py-3 pl-5 pr-13 rounded-lg disabled-input text-ellipsis whitespace-nowrap text-preset-4 text-content-placeholder disabled:cursor-not-allowed min-w-0 focus:outline-none placeholder:text-content-placeholder placeholder:text-preset-4 flex-1 "
      />

      <SearchIcon
        className={"absolute right-5  w-3.5 h-3.5 text-content-main shrink-0"}
      />
    </div>
  );
}

export default SearchBox;

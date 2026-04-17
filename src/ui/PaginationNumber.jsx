function PaginationNumber({ isActive, children }) {
  return (
    <button
      className={`border  size-10 flex items-center justify-center  text-preset-4 rounded-lg ${isActive ? "bg-surface-inverse text-content-inverse border-surface-inverse cursor-default" : "text-content-main hover:bg-surface-tertiary-hover hover:text-content-inverse border-border-base cursor-pointer"}  transition-all duration-200 ease-in-out`}
    >
      {children}
    </button>
  );
}

export default PaginationNumber;

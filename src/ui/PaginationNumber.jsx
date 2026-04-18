function PaginationNumber({ isActive, children, onClick, isEllipsis }) {
  return (
    <button
      onClick={onClick}
      tabIndex={isEllipsis ? -1 : 0}
      aria-hidden={isEllipsis ? "true" : "false"}
      aria-label={isEllipsis ? undefined : `Page ${children}`}
      aria-current={isActive ? "page" : undefined}
      className={`border  size-10 flex items-center justify-center  text-preset-4 rounded-lg ${isActive ? "bg-surface-inverse text-content-inverse border-surface-inverse cursor-default" : isEllipsis ? "text-content-main border-border-base pointer-events-none cursor-default" : "text-content-main  hover:bg-surface-tertiary-hover hover:text-content-inverse border-border-base cursor-pointer"}  transition-all duration-200 ease-in-out focusable-ring`}
    >
      {children}
    </button>
  );
}

export default PaginationNumber;

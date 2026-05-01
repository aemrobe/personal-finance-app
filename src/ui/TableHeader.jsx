function TableHeader({
  children,
  className = `md:grid-cols-[auto_repeat(3,1fr)]`,
  isTable,
}) {
  return (
    <div
      role={isTable ? "row" : undefined}
      className={`hidden md:py-3 md:mb-6 md:items-center md:grid md:gap-8 ${className} md:border-b md:border-border-subtle`}
    >
      {children}
    </div>
  );
}

export default TableHeader;

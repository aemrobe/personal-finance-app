function TableTitle({ isTable, className, children }) {
  return (
    <div
      role={isTable ? "columnheader" : undefined}
      className={`text-preset-5 text-content-secondary ${className}`}
    >
      {children}
    </div>
  );
}

export default TableTitle;

function TableTitle({ className, children }) {
  return (
    <div
      role="columnheader"
      className={`text-preset-5 text-content-secondary ${className}`}
    >
      {children}
    </div>
  );
}

export default TableTitle;

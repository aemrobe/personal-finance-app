function TransactionDataContainer({ children, className = "", role = "" }) {
  return (
    <ul role={role ? role : undefined} className={className}>
      {children}
    </ul>
  );
}

export default TransactionDataContainer;

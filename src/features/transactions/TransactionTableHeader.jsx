import TransactionTableTitle from "./TransactionTableTitle";

function TransactionTableHeader() {
  return (
    <div
      role="row"
      className={`hidden md:py-3 md:mb-6 md:items-center md:grid md:gap-8 md:grid-cols-[auto_repeat(3,1fr)] md:border-b md:border-border-subtle`}
    >
      <TransactionTableTitle className={"md:w-68"}>
        Recipient / Sender
      </TransactionTableTitle>

      <TransactionTableTitle>Category</TransactionTableTitle>

      <TransactionTableTitle>Transaction Date</TransactionTableTitle>

      <TransactionTableTitle className="text-right">
        Amount
      </TransactionTableTitle>
    </div>
  );
}

export default TransactionTableHeader;

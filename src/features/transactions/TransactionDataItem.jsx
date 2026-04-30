import { formatCurrency, formatDate } from "../../utils/helpers";

function TransactionDataItem({
  transaction,
  page = "transaction",
  isTable = false,
}) {
  const { avatar, name, category, amount, date } = transaction;

  const isTransactionsPage = page === "transaction";

  return (
    <li
      role={isTable ? "row" : undefined}
      className={`flex items-center py-4 border-b border-border-subtle first:pt-0 last:pb-0 last:border-b-0 ${isTransactionsPage ? "md:grid md:gap-8 md:grid-cols-[auto_repeat(3,1fr)]" : ""}`}
    >
      <div
        role={isTable ? "cell" : undefined}
        className={`${isTransactionsPage ? "md:flex md:items-center  md:w-68" : ""}`}
      >
        <img
          className="w-8 h-8 rounded-full"
          src={avatar}
          alt={`${name}'s profile`}
        />

        {isTransactionsPage && (
          <p
            className={`hidden md:block md:ml-4 text-preset-4-bold text-content-main `}
          >
            {name}
          </p>
        )}
      </div>

      <div
        role={isTable ? "cell" : undefined}
        className={`ml-3 ${isTransactionsPage ? "md:flex md:items-center md:ml-0 " : ""}`}
      >
        <p
          className={`${isTransactionsPage ? "md:hidden" : ""} text-preset-4-bold text-content-main mb-1`}
        >
          {name}
        </p>
        {isTransactionsPage && (
          <p className="text-preset-5 text-content-secondary"> {category}</p>
        )}
      </div>

      {isTransactionsPage && (
        <p
          role={isTable ? "cell" : undefined}
          className={`  hidden md:block text-preset-5 text-content-secondary`}
        >
          {formatDate(date)}
        </p>
      )}

      <div
        role={isTable ? "cell" : undefined}
        className={` ml-auto text-right ${isTransactionsPage ? "md:ml-0" : ""}`}
      >
        <p
          className={`text-preset-4-bold mb-1 ${isTransactionsPage ? "md:mb-0" : ""} ${amount > 0 ? "text-icon-success" : "text-content-main"}`}
        >
          {`${amount > 0 ? "+" : ""}${formatCurrency(amount)}`}
        </p>
        <p
          className={`text-preset-5 text-content-secondary ${isTransactionsPage ? "md:hidden" : ""}`}
        >
          {formatDate(date)}
        </p>
      </div>
    </li>
  );
}

export default TransactionDataItem;

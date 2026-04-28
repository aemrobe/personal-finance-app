import { formatCurrency, formatDate } from "../../utils/helpers";

function TransactionDataItem({ transaction, page = "transaction" }) {
  const { avatar, name, category, amount, date } = transaction;

  return (
    <li className="flex items-center py-4 border-b border-border-subtle first:pt-0 last:pb-0 last:border-b-0">
      <img
        className="w-8 h-8 rounded-full"
        src={avatar}
        alt={`${name}'s profile`}
      />

      <div className="ml-3">
        <p className="text-preset-4-bold text-content-main mb-1">{name}</p>
        {page === "transaction" && (
          <p className="text-preset-5 text-content-secondary"> {category}</p>
        )}
      </div>

      <div className="ml-auto text-right">
        <p
          className={`text-preset-4-bold mb-1 ${amount > 0 ? "text-icon-success" : "text-content-main"}`}
        >
          {`${amount > 0 ? "+" : ""}${formatCurrency(amount)}`}
        </p>
        <p className="text-preset-5 text-content-secondary">
          {formatDate(date)}
        </p>
      </div>
    </li>
  );
}

export default TransactionDataItem;

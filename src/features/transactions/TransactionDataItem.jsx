import { formatCurrency, formatDate } from "../../utils/helpers";

function TransactionDataItem({ transaction }) {
  const { avatar, name, category, amount, date } = transaction;

  return (
    <li className="flex items-center py-4 border-b border-border-subtle first:pt-0 last:pb-0 last:border-b-0">
      <img
        className="w-8 h-8 rounded-full"
        src={avatar}
        alt={`${name}'s profile`}
      />

      <div className="ml-3">
        <p className="text-preset-4-bold mb-1">{name}</p>
        <p className="text-preset-5"> {category}</p>
      </div>

      <div className="ml-auto text-right">
        <p className="text-preset-4-bold mb-1">{formatCurrency(amount)}</p>
        <p className="text-preset-5">{formatDate(date)}</p>
      </div>
    </li>
  );
}

export default TransactionDataItem;

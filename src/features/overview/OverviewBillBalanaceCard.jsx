import { formatCurrency } from "../../utils/helpers";

function OverviewBillBalanaceCard({ title, balance, borderColor }) {
  return (
    <li
      className={`border-l-4 ${borderColor} bg-surface-app py-5 px-4 flex items-center justify-between rounded-lg`}
    >
      <h3 className="text-content-secondary text-preset-4">{title}</h3>

      <p className="text-content-main text-preset-4-bold">
        {formatCurrency(balance)}
      </p>
    </li>
  );
}

export default OverviewBillBalanaceCard;

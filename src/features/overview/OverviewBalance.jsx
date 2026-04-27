import { formatCurrency } from "../../utils/helpers";

function OverviewBalance({
  title,
  balance,
  backgroundColor = "bg-surface-primary",
  titleColor = "text-content-secondary",
  textColor = "text-content-main",
}) {
  return (
    <li
      className={`${backgroundColor} 
     rounded-xl p-5`}
    >
      <h2
        className={`text-preset-4 
    ${titleColor} capitalize mb-3`}
      >
        {title}
      </h2>

      <p className={`text-preset-1 ${textColor}`}>{formatCurrency(balance)}</p>
    </li>
  );
}

export default OverviewBalance;

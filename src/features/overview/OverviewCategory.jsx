import { formatCurrency } from "../../utils/helpers";

function OverviewCategory({ title, amount, color }) {
  return (
    <li className="flex items-center md:items-start gap-4">
      <div
        style={{
          backgroundColor: color,
        }}
        className="shrink-0 h-10.75 w-1 rounded-lg"
        aria-hidden="true"
      ></div>

      <div>
        <h4 className="text-preset-5 text-content-secondary  mb-1 whitespace-nowrap">
          {title}
        </h4>

        <p className="text-preset-4-bold text-content-main">
          {formatCurrency(amount, false)}
        </p>
      </div>
    </li>
  );
}

export default OverviewCategory;

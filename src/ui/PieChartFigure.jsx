import { Pie, PieChart, ResponsiveContainer } from "recharts";
import { formatCurrency } from "../utils/helpers";

function PieChartFigure({
  chartData,
  totalSpent,
  totalMaximum,
  heightOfContainer = "h-70",
  innerRadius = 85,
  outerRadius = 120,
  className,
}) {
  const EMPTY_CHART_DATA = [
    {
      value: 1,
      fill: `var(--color-empty-chart)`,
    },
  ];

  return (
    <div
      className={`relative ${heightOfContainer} w-full   ${className}`}
      aria-hidden="true"
      style={{ pointerEvents: "none" }}
    >
      <div className="flex flex-col absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-center z-20">
        <span className="text-preset-1 text-content-main">
          {formatCurrency(totalSpent, false)}
        </span>
        <span className="text-preset-5 text-content-secondary mt-2">
          of {formatCurrency(totalMaximum, false)} limit
        </span>
      </div>

      <ResponsiveContainer height="100%" width="100%">
        <PieChart
          role="presentation"
          aria-hidden="true"
          accessibilityLayer={false}
          focusable={false}
          margin={{
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          }}
          style={{
            pointerEvents: "none",
            touchAction: "none",
            outline: "none",
          }}
        >
          <Pie
            tabIndex="-1"
            aria-hidden="true"
            role="presentation"
            data={
              totalSpent === 0
                ? EMPTY_CHART_DATA
                : chartData?.filter((budget) => budget.value > 0)
            }
            nameKey={"name"}
            dataKey={"value"}
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            cx={"50%"}
            cy={"50%"}
            stroke={"none"}
            label={false}
            labelLine={false}
            isAnimationActive={totalSpent !== 0}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PieChartFigure;

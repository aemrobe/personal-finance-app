import { useMemo } from "react";
import { useAllTransactions } from "../transactions/useAllTransactions";
import { formatCurrency } from "../../utils/helpers";
import { RecurringBillsIcon } from "../../ui/Icons";

const calculateFutureDueDate = function (date) {
  const dayOfTheMonth = date.getDate();

  if (dayOfTheMonth < 19) return "overdue";
  else if (dayOfTheMonth >= 19 && dayOfTheMonth <= 24) return "soon";
  else return "upcoming";
};

function RecurringBillsBody() {
  const {
    data: allTransactions,
    isLoading,
    error,
    isFetching,
    refetch,
  } = useAllTransactions();

  const recurringBills = useMemo(
    () =>
      allTransactions
        ?.filter((t) => t.recurring)
        ?.reduce((acc, current) => {
          const exsisting = acc.find((t) => t.name === current.name);

          if (!exsisting) return [...acc, current];

          return new Date(current.date) > new Date(exsisting.date)
            ? acc.map((i) => (i.name === current.name ? current : i))
            : acc;
        }, []),
    [allTransactions],
  );

  const processedBills = useMemo(
    () =>
      recurringBills?.map((bill) => {
        const dateOfBill = new Date(bill.date);
        const dayOfMonth = dateOfBill.getDate();

        const isPaid =
          dateOfBill.getMonth() === 7 && dateOfBill.getFullYear() === 2024;

        return {
          ...bill,
          status: isPaid ? "paid" : calculateFutureDueDate(dateOfBill),
          dayOfMonth,
        };
      }),
    [recurringBills],
  );

  return (
    <div>
      <div className="bg-surface-inverse py-6 px-5 rounded-xl text-content-inverse flex items-center gap-5 flex-wrap">
        <span className="size-10 flex items-center justify-center shrink-0">
          <RecurringBillsIcon className={"w-8 "} />
        </span>

        <div>
          <h4 className="text-preset-4">Total bills</h4>

          <p className="text-preset-1 mt-2.75">{formatCurrency(384.98)}</p>
        </div>
      </div>
    </div>
  );
}

export default RecurringBillsBody;

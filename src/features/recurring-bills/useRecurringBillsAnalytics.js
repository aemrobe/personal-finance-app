import { useMemo } from "react";
import { useAllTransactions } from "../transactions/useAllTransactions";

const calculateFutureDueDate = function (date) {
  const dayOfTheMonth = date.getDate();

  if (dayOfTheMonth < 19) return "overdue";
  else if (dayOfTheMonth >= 19 && dayOfTheMonth <= 24) return "soon";
  else return "upcoming";
};

export function useRecurringBillsAnalytics() {
  const {
    data: allTransactions,
    isLoading: isLoadingTransactions,
    error: transactionError,
    isFetching: isFetchingTransactions,
    refetch: refetchTransactions,
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
          amount: Math.abs(bill.amount),
        };
      }),
    [recurringBills],
  );

  // Paid Bills
  const paidBills = processedBills?.filter((bill) => bill.status === "paid");

  const paidBillAmount = paidBills?.reduce(
    (acc, cur) => acc + Math.abs(cur.amount),
    0,
  );

  //Total Upcoming bills
  const totalUpcomingBills = processedBills?.filter(
    (bill) => bill.status !== "paid",
  );
  const totalUpcomingBillAmount = totalUpcomingBills?.reduce(
    (acc, cur) => Math.abs(cur.amount) + acc,
    0,
  );

  //Due Soon bills
  const dueSoonBills = processedBills?.filter((bill) => bill.status === "soon");

  const dueSoonBillAmount = dueSoonBills?.reduce(
    (acc, cur) => acc + Math.abs(cur.amount),
    0,
  );

  return {
    processedBills,
    paidBills,
    paidBillAmount,
    totalUpcomingBills,
    totalUpcomingBillAmount,
    dueSoonBills,
    dueSoonBillAmount,
    isLoadingTransactions,
    transactionError,
    isFetchingTransactions,
    refetchTransactions,
  };
}

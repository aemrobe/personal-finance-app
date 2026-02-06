import { useEffect } from "react";
import { useTransactions } from "./useTransactions";

function Check() {
  const { data: transactions, isLoading } = useTransactions();

  useEffect(
    function () {
      console.log("transactions", transactions);
    },
    [transactions]
  );

  return <div></div>;
}

export default Check;

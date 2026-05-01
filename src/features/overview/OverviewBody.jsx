import { useBudgetAnayltics } from "../budgets/useBudgetAnalytics";
import ErrorDisplay from "../../ui/ErrorDisplay";
import ErrorWrapper from "../../ui/ErrorWrapper";
import { PotIcon, RecurringBillsIcon } from "../../ui/Icons";
import PieChartFigure from "../../ui/PieChartFigure";
import SpinnerMiniContainer from "../../ui/SpinnerMiniContainer";
import { formatCurrency } from "../../utils/helpers";
import { useCurrentUser } from "../authentication/useCurrentUser";
import { useBalance } from "../Balance/useBalance";
import { usePots } from "../pots/usePots";
import TransactionDataContainer from "../transactions/TransactionDataContainer";
import TransactionDataItem from "../transactions/TransactionDataItem";
import OverviewBalance from "./OverviewBalance";
import OverviewBillBalanaceCard from "./OverviewBillBalanaceCard";
import OverviewCategory from "./OverviewCategory";
import OverviewCategoryContainer from "./OverviewCategoryContainer";
import OverviewSection from "./OverviewSection";
import { useRecurringBillsAnalytics } from "../recurring-bills/useRecurringBillsAnalytics";
import { useNavigate } from "react-router-dom";
import EmptyMessage from "../../ui/EmptyMessage";

function OverviewBody() {
  const navigate = useNavigate();
  const {
    isLoading: isLoadingUser,
    error: userError,
    isFetching: isFetchingUser,
    refetch: refetchUser,
  } = useCurrentUser();

  const {
    isLoading: isLoadingBalance,
    balance,
    error: balanceError,
    isFetching: isFetchingBalance,
    refetch: refetchBalance,
  } = useBalance();

  const {
    data: pots,
    isLoading: isLoadingPots,
    isFetching: isFetchingPots,
    error: potsError,
    refetch: refetchPots,
  } = usePots();

  const {
    budgets,
    transactions,
    chartData,
    totalSpentForAllCategories,
    totalMaximumForAllCategories,
    isLoadingAnalytics,
    isFetchingAnalytics,
    errorAnalytics,
    refetchAnayltics,
  } = useBudgetAnayltics();

  const {
    paidBillAmount,
    totalUpcomingBillAmount,
    dueSoonBillAmount,
    processedBills,
  } = useRecurringBillsAnalytics();

  const isLoading =
    isLoadingUser || isLoadingBalance || isLoadingPots || isLoadingAnalytics;

  const { current: currentBalance, income, expenses } = balance;

  const totalSavedInPots = pots?.reduce((acc, cur) => acc + cur.total, 0);

  if (errorAnalytics || potsError || userError || balanceError)
    return (
      <ErrorWrapper>
        <ErrorDisplay
          error={errorAnalytics || userError?.message || potsError?.message}
          isLoading={
            isFetchingAnalytics ||
            isFetchingPots ||
            isFetchingUser ||
            isFetchingBalance
          }
          onRetry={() => {
            refetchAnayltics();
            refetchPots();
            refetchUser();
            refetchBalance();
          }}
        />
      </ErrorWrapper>
    );

  return (
    <div className="relative flex-1 max-w-172 mx-auto w-full">
      {isLoading ? (
        <SpinnerMiniContainer size="text-5xl" />
      ) : (
        <>
          <section className="mb-8" aria-label="Account summary">
            <ul className="flex flex-col md:grid gap-3 md:gap-6 md:grid-cols-3">
              <OverviewBalance
                title={"Current Balance"}
                balance={currentBalance}
                backgroundColor="bg-surface-inverse"
                titleColor="text-content-inverse"
                textColor="text-content-inverse"
              />

              <OverviewBalance title={"Income"} balance={income} />

              <OverviewBalance title={"Expenses"} balance={expenses} />
            </ul>
          </section>

          <div className="flex flex-col gap-4 md:gap-6">
            <OverviewSection
              title={"Pots"}
              buttonText={"See Details"}
              onClick={() => navigate("/pots")}
            >
              {pots?.length === 0 ? (
                <EmptyMessage
                  title={"No pots found"}
                  text={"Start your saving journey by creating your first pot!"}
                  icon={"🐖"}
                  className="min-h-62.5 mt-5"
                  shadowOfTheBox=""
                />
              ) : (
                <div className="md:flex md:gap-5 ">
                  <div className="bg-surface-app rounded-xl py-5 px-4 flex gap-4 items-center mt-5 md:w-61.75">
                    <PotIcon
                      className="text-icon-success w-[1.675rem] h-[2.148rem]"
                      classNameParent={"size-10"}
                    />

                    <div>
                      <h3 className="text-preset-4 text-content-secondary mb-2.75">
                        Total Saved
                      </h3>

                      <p className="text-preset-1 text-content-main">
                        {formatCurrency(totalSavedInPots, false)}
                      </p>
                    </div>
                  </div>

                  <OverviewCategoryContainer className="grid gap-4 grid-cols-2 md:flex-1 mt-5">
                    {pots?.slice(0, 4)?.map((pot) => {
                      const { id, name, total, theme: color } = pot;

                      return (
                        <OverviewCategory
                          key={id}
                          title={name}
                          amount={total}
                          color={color}
                        />
                      );
                    })}
                  </OverviewCategoryContainer>
                </div>
              )}
            </OverviewSection>

            <OverviewSection
              title={"Transactions"}
              buttonText={"View All"}
              onClick={() => navigate("/transactions")}
            >
              {transactions.length === 0 ? (
                <EmptyMessage
                  title={"No transaction history "}
                  text={"It looks like You don't have any transactions yet."}
                  icon={"💸"}
                  shadowOfTheBox={""}
                  className="min-h-62.5 mt-5"
                />
              ) : (
                <TransactionDataContainer className="mt-8">
                  {transactions?.slice(0, 5)?.map((transaction) => (
                    <TransactionDataItem
                      page="overview"
                      key={transaction.id}
                      transaction={{
                        ...transaction,
                        category: transaction?.categories?.category,
                      }}
                    />
                  ))}
                </TransactionDataContainer>
              )}
            </OverviewSection>

            <OverviewSection
              title={"Budgets"}
              buttonText={"See Details"}
              onClick={() => navigate("/budgets")}
            >
              {budgets?.length === 0 ? (
                <EmptyMessage
                  title={"No budgets created"}
                  text={
                    "It looks like you don't have any budgets setup. Create a budget to keep your spending on track."
                  }
                  icon={"💰"}
                  className="min-h-62.5 mt-5"
                  shadowOfTheBox=""
                />
              ) : (
                <div className="md:flex md:items-start md:gap-4">
                  <PieChartFigure
                    className={"mt-7 md:mt-12.75 mb-4 md:mb-7.75"}
                    totalSpent={totalSpentForAllCategories}
                    totalMaximum={totalMaximumForAllCategories}
                    chartData={chartData}
                    heightOfContainer={"h-60"}
                    innerRadius={85}
                    outerRadius={120}
                  />

                  <OverviewCategoryContainer className="md:pl-2 md:mt-15.25 grid gap-4 grid-cols-2 md:grid-cols-1 md:relative md:right-3.25">
                    {budgets?.slice(0, 4)?.map((budget) => {
                      const {
                        id,
                        categories: { category },
                        maximum,
                        theme,
                      } = budget;

                      return (
                        <OverviewCategory
                          key={id}
                          title={category}
                          amount={maximum}
                          color={theme}
                        />
                      );
                    })}
                  </OverviewCategoryContainer>
                </div>
              )}
            </OverviewSection>

            <OverviewSection
              title={"Recurring Bills"}
              buttonText={"See Details"}
              onClick={() => navigate("/recurring-bills")}
            >
              {processedBills?.length === 0 ? (
                <EmptyMessage
                  className="min-h-62.5 mt-5"
                  title={"No recurring bills "}
                  text={"It looks like you don't have any recurring bills yet."}
                  icon={<RecurringBillsIcon className="w-12 h-12 opacity-20" />}
                  shadowOfTheBox={""}
                />
              ) : (
                <ul className="mt-8 flex flex-col gap-3">
                  <OverviewBillBalanaceCard
                    title={"Paid Bills"}
                    balance={paidBillAmount}
                    borderColor={"border-icon-success"}
                  />
                  <OverviewBillBalanaceCard
                    title={"Total Upcoming"}
                    balance={totalUpcomingBillAmount}
                    borderColor={"border-border-bill-upcoming"}
                  />
                  <OverviewBillBalanaceCard
                    title={"Due Soon"}
                    balance={dueSoonBillAmount}
                    borderColor={"border-border-bill-due"}
                  />
                </ul>
              )}
            </OverviewSection>
          </div>
        </>
      )}
    </div>
  );
}

export default OverviewBody;

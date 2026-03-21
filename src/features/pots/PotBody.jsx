import EmptyMessage from "../../ui/EmptyMessage";
import ErrorDisplay from "../../ui/ErrorDisplay";
import ErrorWrapper from "../../ui/ErrorWrapper";
import Menus from "../../ui/Menus";
import SpinnerContainer from "../../ui/SpinnerContainer";
import { useBalance } from "../Balance/useBalance";
import PotCard from "./PotCard";
import PotForm from "./PotForm";
import { usePots } from "./usePots";

function PotBody() {
  const {
    data: pots,
    isLoading: isLoadingPots,
    isFetching: isFetchingPots,
    error: potsError,
    refetch: refetchPots,
  } = usePots();

  const {
    isLoading: isLoadingBalance,
    balance,
    error: balanceError,
    isFetching: isFetchingBalance,
    refetch: refetchBalance,
  } = useBalance();

  if (isLoadingPots || isLoadingBalance) return <SpinnerContainer />;

  if (potsError || balanceError)
    return (
      <ErrorWrapper>
        <ErrorDisplay
          error={potsError?.message || balanceError?.message}
          isLoading={isFetchingPots || isFetchingBalance}
          onRetry={() => {
            refetchPots();
            refetchBalance();
          }}
        />
      </ErrorWrapper>
    );

  if (pots?.length === 0)
    return (
      <EmptyMessage
        title={"No pots found"}
        text={"Start your saving journey by creating your first pot!"}
        icon={"🐖"}
        action={PotForm}
        actionText={"+ Add New Pot"}
        modalName={"add-pot"}
        returnToSelector={"pots-title-id"}
        titleId={"add-pot-title"}
        contentId={"add-pot-content"}
        potModalType={"add-pot-2"}
      />
    );

  return (
    <Menus>
      <div className="flex flex-col gap-6">
        {pots.map((pot) => (
          <PotCard key={pot.id} pot={pot} balance={balance} />
        ))}
      </div>
    </Menus>
  );
}

export default PotBody;

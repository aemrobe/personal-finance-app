import Input from "../../ui/Input";
import ProgressBar from "../../ui/ProgressBar";
import { formatCurrency } from "../../utils/helpers";
import Button from "../../ui/Button";
import { useForm } from "react-hook-form";
import { FIELD_REQUIRED_MESSAGE } from "../../utils/constants";
import { useUpdatePot } from "./useUpdatePot";
import { useUpdateBalance } from "../Balance/useUpdateBalance";
import { useBalance } from "../Balance/useBalance";
import SpinnerMiniContainer from "../../ui/SpinnerMiniContainer";
import ModalTitle from "../../ui/ModalTitle";
import ModalText from "../../ui/ModalText";
import { useToast } from "../../context/ToastContext";

function PotBalanceForm({
  pot,
  titleId,
  contentId,
  type,
  onCloseModal,
  restoreFocus,
}) {
  const { name, target, theme, total, id, percentage } = pot;

  const { updatePot, isUpdatingPot } = useUpdatePot();
  const { updateBalance, isUpdatingBalance } = useUpdateBalance();
  const { onShowToastMessage } = useToast();
  const { balance, isLoading } = useBalance();
  const { current: currentBalance, id: balanceId } = balance;

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      amount: "",
    },
  });

  const isAdd = type === "add";

  const newAmount = watch("amount") || 0;
  const newPercentage = (newAmount / target) * 100;

  const updatedValue = isAdd ? total + newAmount : total - newAmount;
  const updatedPercentage = (updatedValue / target) * 100;

  // MaximumValueForInput
  const maximumValueForInput = isAdd
    ? Math.min(target - total, currentBalance)
    : total;

  const isWorking = isLoading || isUpdatingPot || isUpdatingBalance;

  const onSubmit = function (data) {
    const { amount } = data;

    updateBalance({
      updatedData: {
        current: isAdd ? currentBalance - amount : currentBalance + amount,
      },
      id: balanceId,
    });

    updatePot(
      {
        updatedData: {
          total: isAdd ? total + amount : total - amount,
        },
        id,
      },
      {
        onSuccess: () => {
          onShowToastMessage({
            text: `You successfully ${isAdd ? "added" : "Withdrawn"} ${formatCurrency(amount)} ${isAdd ? "to" : "from"} the pot`,
          });
          onCloseModal();
          restoreFocus();
        },
        onError: (error) => {
          onShowToastMessage({
            text: `Failed to ${isAdd ? "add" : "withdraw"} ${formatCurrency(amount)} ${isAdd ? "to" : "from"} the pot: ${error.message}`,
          });
        },
      },
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {isLoading && (
        <SpinnerMiniContainer
          backgroundColor={"bg-surface-primary"}
          size={"text-3xl"}
        />
      )}

      <ModalTitle
        titleId={titleId}
        title={`${isAdd ? "Add to" : "Withdraw from"} ‘${name}’`}
        className={"mt-1 mb-6"}
      />

      <ModalText
        contentId={contentId}
        content={
          isAdd
            ? `Add money to your pot to keep it separate from your main balance. As
      soon as you add this money, it will be deducted from your current
      balance.`
            : `Withdraw from your pot to put money back in your main balance. This will reduce the amount you have in this pot.`
        }
        className="my-5"
      />

      <div className="flex flex-wrap items-center justify-between  mb-4">
        <p className="text-preset-4 text-content-secondary capitalize">
          New Amount
        </p>

        <p className="text-content-main text-preset-1">
          {formatCurrency(updatedValue)}
        </p>
      </div>

      <ProgressBar
        isAddType={isAdd}
        percentage={(isAdd ? percentage : updatedPercentage).toFixed(2)}
        newPercentage={newPercentage.toFixed(2)}
        themeColor={theme}
        containerClass={"h-2 mb-3.25"}
      />

      <div className="flex items-center justify-between mb-[1.906rem]">
        <p className="text-preset-5-bold text-content-secondary">
          {updatedPercentage.toFixed(2)}%
        </p>
        <p className="text-preset-5 text-content-secondary">
          Target of {formatCurrency(target, false)}
        </p>
      </div>

      <Input
        isLoading={isWorking}
        label={isAdd ? "Amount to Add" : "Amount to Withdraw"}
        placeholder="e.g. 50"
        prefix={true}
        type={"number"}
        error={errors?.amount?.message}
        errorId={`add-pot-error-${id}`}
        id={`add-pot-${id}`}
        {...register("amount", {
          required: `${FIELD_REQUIRED_MESSAGE}`,
          valueAsNumber: true,
          min: {
            value: 1,
            message: "The amount should be greater than 0",
          },
          max: {
            value: maximumValueForInput,
            message: `You couldn't ${isAdd ? "add" : "withdraw"}  ${maximumValueForInput ? `moreThan ${formatCurrency(maximumValueForInput)}` : `from ${formatCurrency(maximumValueForInput)}`}`,
          },
        })}
      />

      <Button
        isLoading={isWorking}
        isActionButton={true}
        variant={"primary"}
        className={"w-full mt-5"}
      >
        {isAdd ? "Confirm Addition" : "Confirm Withdrawal"}
      </Button>
    </form>
  );
}

export default PotBalanceForm;

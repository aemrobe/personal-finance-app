import Button from "../../ui/Button";
import ProgressBar from "../../ui/ProgressBar";
import { formatCurrency } from "../../utils/helpers";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import PotForm from "./PotForm";
import PotBalanceForm from "./PotBalanceForm";
import ConfirmDeleteModal from "../../ui/ConfirmDeleteModal";
import { useDeletePot } from "./useDeletePot";
import { useUpdateBalance } from "../Balance/useUpdateBalance";
import { useBalance } from "../Balance/useBalance";

function PotCard({ pot }) {
  const { name, target, theme, total, id } = pot;
  const { deletePot, isDeletingPot } = useDeletePot();
  const { isLoading, balance } = useBalance();
  const { updateBalance, isUpdatingBalance } = useUpdateBalance();

  const { current: currentBalance, id: balanceId } = balance;

  const percentageSavedMoney = Math.min((total / target) * 100, 100);
  const potData = {
    name,
    target,
    theme,
    total,
    id,
    percentage: percentageSavedMoney,
  };

  const isWorking = isLoading || isUpdatingBalance || isDeletingPot;

  return (
    <div className="bg-surface-primary pt-6 pb-9.5 px-5 rounded-xl">
      <div className="flex items-center justify-between mb-8  relative">
        <div className="flex items-center gap-4">
          <span
            style={{
              backgroundColor: theme,
            }}
            className="inline-block w-4 h-4 bg-green-500 rounded-full"
          ></span>
          <h2 className="capitalize text-preset-2">{name}</h2>
        </div>

        <Menus.Toggle id={id} name={name} />

        <Menus.List id={id}>
          <Modal.Open
            modalName={`edit-pot-${id}`}
            returnToSelector={`#menu-trigger-${id}`}
          >
            <Menus.Button color={"text-contain-main"}>Edit pot</Menus.Button>
          </Modal.Open>

          <Modal.Open
            modalName={`delete-pot-${id}`}
            returnToSelector={`#menu-trigger-${id}`}
          >
            <Menus.Button color={"text-content-error"}>Delete Pot</Menus.Button>
          </Modal.Open>
        </Menus.List>

        <Modal.Window
          titleId={`edit-pot-title-${id}`}
          contentId={`edit-pot-desc-${id}`}
          modalName={`edit-pot-${id}`}
        >
          <PotForm potModalType={`edit-pot-${id}`} potToEdit={pot} />
        </Modal.Window>

        <Modal.Window
          titleId={`delete-pot-title-${id}`}
          contentId={`delete-pot-desc-${id}`}
          modalName={`delete-pot-${id}`}
        >
          <ConfirmDeleteModal
            isDeleting={isWorking}
            onConfirm={(closeModal) => {
              if (!balanceId) return;

              updateBalance(
                {
                  updatedData: {
                    current: currentBalance + total,
                  },
                  id: balanceId,
                },
                {
                  onSuccess: () => {
                    deletePot(id, {
                      onSuccess: () => {
                        closeModal?.();
                      },
                    });
                  },
                },
              );
            }}
            title={name}
            content={
              "Are you sure you want to delete this pot? This action cannot be reversed, and all the data inside it will be removed forever."
            }
          />
        </Modal.Window>
      </div>

      <div className="flex flex-wrap items-center justify-between  mb-4">
        <p className="text-preset-4 text-content-secondary capitalize">
          Total Saved
        </p>

        <p className="text-content-main text-preset-1">
          {formatCurrency(total)}
        </p>
      </div>

      <ProgressBar
        percentage={percentageSavedMoney.toFixed(2)}
        themeColor={theme}
        containerClass={"h-2 mb-3.25"}
      />

      <div className="flex items-center justify-between mb-[2.656rem]">
        <p className="text-preset-5-bold text-content-secondary">
          {percentageSavedMoney.toFixed(2)}%
        </p>
        <p className="text-preset-5 text-content-secondary">
          Target of {formatCurrency(target, false)}
        </p>
      </div>

      <div className="flex flex-wrap gap-4">
        <Modal.Open modalName={`add to a pot ${id}`}>
          <Button
            onClick={(e) => e.stopPropagation()}
            className={"flex-auto"}
            isActionButton={true}
            variant={"secondary"}
          >
            + Add Money
          </Button>
        </Modal.Open>

        <Modal.Window
          modalName={`add to a pot ${id}`}
          titleId={`add-to-a-pot-title-${id}`}
          contentId={`add-to-a-pot-content-${id}`}
        >
          <PotBalanceForm type={"add"} pot={potData} />
        </Modal.Window>

        <Modal.Open modalName={`withdraw from a pot ${id}`}>
          <Button
            onClick={(e) => e.stopPropagation()}
            className={"flex-auto"}
            isActionButton={true}
            variant={"secondary"}
          >
            Withdraw
          </Button>
        </Modal.Open>

        <Modal.Window
          titleId={`withdraw-from-a-pot-title-${id}`}
          contentId={`withdraw-from-a-pot-content-${id}`}
          modalName={`withdraw from a pot ${id}`}
        >
          <PotBalanceForm type={"withdraw"} pot={potData} />
        </Modal.Window>
      </div>
    </div>
  );
}

export default PotCard;

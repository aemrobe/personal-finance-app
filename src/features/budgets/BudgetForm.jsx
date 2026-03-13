import { useState } from "react";
import { useToast } from "../../context/ToastContext";
import { useCurrentUser } from "../authentication/useCurrentUser";
import { useCreatePot } from "../pots/useCreatePot";
import { useUpdatePot } from "../pots/useUpdatePot";
import { FIELD_REQUIRED_MESSAGE, THEMES } from "../../utils/constants";
import { useForm } from "react-hook-form";
import ModalTitle from "../../ui/ModalTitle";
import ModalText from "../../ui/ModalText";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import { useBudgets } from "./useBudgets";
import CustomSelectBox from "../../ui/CustomSelectBox";
import SelectOption from "../../ui/selectOption";

function BudgetForm({
  titleId,
  contentId,
  budgetModalType = "",
  budgetToEdit = {},
  onCloseModal,
  restoreFocus,
}) {
  const isEditSession = Boolean(budgetToEdit.id);

  const { data: budgets } = useBudgets();
  const { createPot, isCreatingPot } = useCreatePot();
  const { updatePot, isUpdatingPot } = useUpdatePot();

  const isWorking = isCreatingPot || isUpdatingPot;
  const { user } = useCurrentUser();

  const { onShowToastMessage } = useToast();

  //Raw Datas
  const budgetCategories = [
    ...new Set(budgets?.map((budget) => budget.category)),
  ].map((category) => {
    return { category };
  });

  const availableBudgetCategories = budgetCategories?.filter((category) => {
    const isUsed = budgets?.some(
      (budget) =>
        budget.category.toLowerCase() === category.category.toLowerCase() &&
        budget.maximum &&
        budget.id !== budgetToEdit.id,
    );

    return !isUsed;
  });

  // themes selectBox
  const [selectedTheme, setSelectedTheme] = useState(() => {
    if (isEditSession) {
      return (
        THEMES.find(
          (theme) =>
            theme.color.toLowerCase() === budgetToEdit.theme.toLowerCase(),
        ) || THEMES[0]
      );
    }

    return (
      THEMES.find(
        (theme) =>
          !budgets?.some(
            (budget) =>
              budget.theme.toLowerCase() === theme.color.toLowerCase(),
          ),
      ) || THEMES[0]
    );
  });

  // category selectBox
  const [selectCategory, setSelectedCategory] = useState(() => {
    if (isEditSession) {
      return (
        budgetCategories.find(
          (catObj) =>
            catObj.category.toLowerCase() ===
            budgetToEdit.category.toLowerCase(),
        ) || availableBudgetCategories[0]
      );
    }

    return (
      budgetCategories.find(
        (b) => b.category === budgets?.find((bud) => !bud.maximum)?.category,
      ) || budgetCategories[0]
    );
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    defaultValues: isEditSession
      ? budgetToEdit
      : {
          category: selectCategory.category,
          maximum: "",
          theme: selectedTheme.color,
        },
  });

  const onSubmit = function (data) {
    console.log("data", data);
    // if (isEditSession) {
    //   const { id, created_at, total, ...editableFields } = data;
    //   updatePot(
    //     {
    //       updatedData: editableFields,
    //       id,
    //     },
    //     {
    //       onSuccess: () => {
    //         onCloseModal();
    //         restoreFocus();
    //         onShowToastMessage({
    //           text: `Pot updated successfully!`,
    //         });
    //       },
    //       onError: (error) => {
    //         onShowToastMessage({
    //           text: `Failed to update a pot: ${error.message}`,
    //         });
    //       },
    //     },
    //   );
    // } else {
    //   createPot(
    //     { ...data, user_id: user.id },
    //     {
    //       onSuccess: () => {
    //         onCloseModal();
    //         restoreFocus();
    //         onShowToastMessage({
    //           text: `Pot ${data.name} successfully created`,
    //         });
    //       },
    //       onError: (error) => {
    //         onShowToastMessage({
    //           text: `Failed to create a pot: ${error.message}`,
    //         });
    //       },
    //     },
    //   );
    // }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ModalTitle
        titleId={titleId}
        title={`${!isEditSession ? "Add New" : "Edit"} Budget`}
        className={"my-1 capitalize"}
      />

      <ModalText
        contentId={contentId}
        content={
          !isEditSession
            ? "Choose a category to set a spending budget. These categories can help you monitor spending."
            : "As your budgets change, feel free to update your spending limits."
        }
        className="my-5"
      />

      <div className="flex flex-col space-y-4">
        <input
          type="hidden"
          {...register("category", {
            required: "Please select a category",
          })}
        />

        {/* Custom Select box 1 */}
        <CustomSelectBox
          inputFieldName={"category"}
          labelName={"Budget Category"}
          budgetModalType={`${budgetModalType}-category`}
          selectedOption={selectCategory}
          setSelectedOption={setSelectedCategory}
          isWorking={isWorking}
          rawData={availableBudgetCategories}
          setValue={setValue}
          errors={errors}
          optionProperty1="category"
          optionProperty2="color"
          OptionComponent={SelectOption}
          getOptionMeta={(rawBudget, selectedTheme) => {
            const isSelected =
              selectedTheme.category.toLowerCase() ===
              rawBudget.category.toLowerCase();

            return {
              isSelected,
            };
          }}
        />

        <Input
          label="Maximum Spend"
          isLoading={isWorking}
          type={"number"}
          placeholder={"e.g. 2000"}
          prefix={true}
          error={errors.maximum?.message}
          errorId={`maximumError-${budgetModalType}`}
          id={`maximum-${budgetModalType}`}
          {...register("maximum", {
            required: FIELD_REQUIRED_MESSAGE,
            valueAsNumber: true,
            min: {
              value: 1,
              message: "Your target value should be greater than 0 ",
            },
          })}
        />

        <input
          type="hidden"
          {...register("theme", {
            required: "Please select a color tag",
          })}
        />

        {/* Custom Select box 2 */}
        <CustomSelectBox
          isColor={true}
          inputFieldName={"theme"}
          labelName={"Color Tag"}
          budgetModalType={`${budgetModalType}-color`}
          selectedOption={selectedTheme}
          setSelectedOption={setSelectedTheme}
          isWorking={isWorking}
          rawData={THEMES}
          setValue={setValue}
          errors={errors}
          optionProperty1="name"
          optionProperty2="color"
          OptionComponent={SelectOption}
          getOptionMeta={(theme, selectedTheme) => {
            const isUsed = budgets?.some(
              (budget) =>
                budget.theme.toLowerCase() === theme.color.toLowerCase() &&
                budget.id !== budgetToEdit.id,
            );

            const isSelected =
              selectedTheme.color.toLowerCase() === theme.color.toLowerCase();

            return {
              isUsed,
              isSelected,
            };
          }}
        />
      </div>

      <Button
        isLoading={isWorking}
        className={"w-full mt-5"}
        isActionButton={true}
        variant="primary"
      >
        {!isEditSession ? "Add New Budget" : "Save Changes"}
      </Button>
    </form>
  );
}

export default BudgetForm;

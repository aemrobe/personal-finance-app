import { useToast } from "../../context/ToastContext";
import { useCurrentUser } from "../authentication/useCurrentUser";
import { FIELD_REQUIRED_MESSAGE, THEMES } from "../../utils/constants";
import { useForm } from "react-hook-form";
import ModalTitle from "../../ui/ModalTitle";
import ModalText from "../../ui/ModalText";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import { useBudgets } from "./useBudgets";
import CustomSelectBox from "../../ui/CustomSelectBox";
import SelectOption from "../../ui/selectOption";
import { useFormSelection } from "../../hooks/useFormSelection";
import { findAvailableTheme } from "../../utils/helpers";
import { useCategories } from "../categories/useCategory";
import EmptyMessage from "../../ui/EmptyMessage";
import { useCreateBudget } from "./useCreateBudget";
import { useUpdateBudget } from "./useUpdateBudget";

const findAvailableCategory = (budgets, categories) => {
  return categories?.find(
    (cat) =>
      !budgets.some(
        (budget) =>
          budget.categories.category.toLowerCase() ===
          cat.category.toLowerCase(),
      ),
  )?.category;
};

function BudgetForm({
  titleId,
  contentId,
  budgetModalType = "",
  budgetToEdit = {},
  onCloseModal,
  restoreFocus,
}) {
  const isEditSession = Boolean(budgetToEdit.id);
  const id = budgetToEdit.id;

  const { data: budgets } = useBudgets();
  const { data: categories, isLoading } = useCategories();
  const { createBudget, isCreatingBudget } = useCreateBudget();
  const { updateBudget, isUpdatingBudget } = useUpdateBudget();

  const isWorking = isLoading || isCreatingBudget || isUpdatingBudget;

  const { user } = useCurrentUser();

  const { onShowToastMessage } = useToast();

  //Raw Datas
  const availableBudgetCategories = categories?.filter((category) => {
    const isUsed = budgets?.some(
      (budget) =>
        budget.categories.category.toLowerCase() ===
          category.category.toLowerCase() && budget.id !== budgetToEdit.id,
    );

    return !isUsed;
  });

  // themes selectBox
  const [selectedTheme, setSelectedTheme] = useFormSelection({
    isEditSession,
    editObject: budgetToEdit,
    allData: budgets,
    rawData: THEMES,
    dataKey: "theme",
    matchKey: "color",
    findNextAvailable: findAvailableTheme,
  });

  // category selectBox
  const [selectedCategory, setSelectedCategory] = useFormSelection({
    isEditSession,
    editObject: budgetToEdit,
    allData: budgets,
    rawData: categories,
    dataKey: "category",
    matchKey: "category",
    findNextAvailable: findAvailableCategory,
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    defaultValues: isEditSession
      ? {
          category: selectedCategory?.category,
          maximum: budgetToEdit.maximum,
          theme: selectedTheme?.color,
        }
      : {
          category: selectedCategory?.category,
          maximum: "",
          theme: selectedTheme?.color,
        },
  });

  if (availableBudgetCategories.length === 0 && !isEditSession)
    return (
      <EmptyMessage
        titleId={titleId}
        contentId={contentId}
        title="All categories assigned"
        text="You've already created a budget for every available category. Try editing or deleting an existing budget to make space."
        icon="✅"
        shadowOfTheBox=""
        className="py-10"
      />
    );

  const onSubmit = function (data) {
    const { category, ...restOfData } = data;

    const selectedCategoryObj = categories.find(
      (cat) => cat.category.toLowerCase() === category.toLowerCase(),
    );

    const categoryId = selectedCategoryObj?.id;

    if (isEditSession) {
      updateBudget(
        {
          updatedData: { ...restOfData, category_id: categoryId },
          id,
        },
        {
          onSuccess: () => {
            onCloseModal();
            restoreFocus();
            onShowToastMessage({
              text: `Budget updated successfully!`,
            });
          },
          onError: (error) => {
            console.error(error.message);
            onShowToastMessage({
              text: `Failed to update a budget: ${error.message}`,
            });
          },
        },
      );
    } else {
      createBudget(
        {
          ...restOfData,
          category_id: categoryId,
          user_id: user.id,
        },
        {
          onSuccess: () => {
            onCloseModal();
            restoreFocus();
            onShowToastMessage({
              text: `Budget for ${category} successfully created`,
            });
          },
          onError: (error) => {
            onShowToastMessage({
              text: `Failed to create a budget: ${error.message}`,
            });
          },
        },
      );
    }
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

        {/* Category Select box */}
        <CustomSelectBox
          inputFieldName={"category"}
          labelName={"Budget Category"}
          modalType={`${budgetModalType}-category`}
          selectedOption={selectedCategory}
          setSelectedOption={setSelectedCategory}
          isWorking={isWorking}
          rawData={availableBudgetCategories}
          setValue={setValue}
          errors={errors}
          optionProperty1="category"
          optionProperty2="category"
          OptionComponent={SelectOption}
          getOptionMeta={(rawBudget, selectedCategory) => {
            const isSelected =
              selectedCategory.category.toLowerCase() ===
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

        {/* Color Select Box */}
        <CustomSelectBox
          isColor={true}
          inputFieldName={"theme"}
          labelName={"Color Tag"}
          modalType={`${budgetModalType}-color`}
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

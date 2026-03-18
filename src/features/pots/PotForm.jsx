import { useForm } from "react-hook-form";
import { usePots } from "./usePots";
import { FIELD_REQUIRED_MESSAGE, THEMES } from "../../utils/constants";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import { useCreatePot } from "./useCreatePot";
import { useCurrentUser } from "../authentication/useCurrentUser";
import { useUpdatePot } from "./useUpdatePot";
import ModalTitle from "../../ui/ModalTitle";
import ModalText from "../../ui/ModalText";
import { useToast } from "../../context/ToastContext";
import CustomSelectBox from "../../ui/CustomSelectBox";
import SelectOption from "../../ui/selectOption";
import { useFormSelection } from "../../hooks/useFormSelection";
import { findAvailableTheme } from "../../utils/helpers";

function PotForm({
  titleId,
  contentId,
  potModalType = "",
  potToEdit = {},
  onCloseModal,
  restoreFocus,
}) {
  const isEditSession = Boolean(potToEdit.id);

  const { data: pots } = usePots();
  const { createPot, isCreatingPot } = useCreatePot();
  const { updatePot, isUpdatingPot } = useUpdatePot();

  const isWorking = isCreatingPot || isUpdatingPot;
  const { user } = useCurrentUser();

  const { onShowToastMessage } = useToast();

  // themes selectBox
  const [selectedTheme, setSelectedTheme] = useFormSelection({
    isEditSession,
    editObject: potToEdit,
    allData: pots,
    rawData: THEMES,
    dataKey: "theme",
    matchKey: "color",
    findNextAvailable: findAvailableTheme,
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
  } = useForm({
    defaultValues: isEditSession
      ? potToEdit
      : {
          name: "",
          target: "",
          theme: selectedTheme.color,
        },
  });

  // Max character for potname
  const maxCharacterCount = 30;
  const potName = watch("name", "");
  const remainingCharacter = Math.max(maxCharacterCount - potName.length, 0);

  const onSubmit = function (data) {
    if (isEditSession) {
      const { id, created_at, total, ...editableFields } = data;
      updatePot(
        {
          updatedData: editableFields,
          id,
        },
        {
          onSuccess: () => {
            onCloseModal();
            restoreFocus();
            onShowToastMessage({
              text: `Pot updated successfully!`,
            });
          },
          onError: (error) => {
            onShowToastMessage({
              text: `Failed to update a pot: ${error.message}`,
            });
          },
        },
      );
    } else {
      createPot(
        { ...data, user_id: user.id },
        {
          onSuccess: () => {
            onCloseModal();
            restoreFocus();
            onShowToastMessage({
              text: `Pot ${data.name} successfully created`,
            });
          },
          onError: (error) => {
            onShowToastMessage({
              text: `Failed to create a pot: ${error.message}`,
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
        title={`${!isEditSession ? "Add New Pot" : "Edit Pot"}`}
        className={"my-1 capitalize"}
      />

      <ModalText
        contentId={contentId}
        content={
          !isEditSession
            ? "Create a pot to set savings targets. These can help keep you on track as you save for special purchases."
            : "If your saving targets change, feel free to update your pots."
        }
        className="my-5"
      />

      <div className="flex flex-col space-y-4">
        <Input
          label="pot name"
          isLoading={isWorking}
          placeholder="e.g. Rainy Days"
          helperText={`${remainingCharacter} characters left`}
          type={"text"}
          error={errors.name?.message}
          errorId={`potnameError-${potModalType}`}
          id={`potname-${potModalType}`}
          {...register("name", {
            required: FIELD_REQUIRED_MESSAGE,
            maxLength: {
              value: 30,
              message: "your character is morethan 30 character length",
            },
          })}
        />

        <Input
          label="target"
          isLoading={isWorking}
          placeholder="e.g. 2000"
          type={"number"}
          prefix={true}
          error={errors.target?.message}
          errorId={`targetError-${potModalType}`}
          id={`target-${potModalType}`}
          {...register("target", {
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
          budgetModalType={`${potModalType}-color`}
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
            const isUsed = pots?.some(
              (pot) =>
                pot.theme.toLowerCase() === theme.color.toLowerCase() &&
                pot.id !== potToEdit.id,
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
        {!isEditSession ? "Add Pot" : "Save Changes"}
      </Button>
    </form>
  );
}

export default PotForm;

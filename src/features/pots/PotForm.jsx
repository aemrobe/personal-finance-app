import { useForm } from "react-hook-form";
import { usePots } from "./usePots";
import { useRef, useState } from "react";
import { useOutsideClicks } from "../../hooks/useOutsideClicks";
import {
  ANIMATION_DURATION,
  FIELD_REQUIRED_MESSAGE,
} from "../../utils/constants";
import Input from "../../ui/Input";
import { ChevroDownIcon, SelectedIcon } from "../../ui/Icons/";
import Button from "../../ui/Button";
import { useCreatePot } from "./useCreatePot";
import { useCurrentUser } from "../authentication/useCurrentUser";
import { useUpdatePot } from "./useUpdatePot";
import ModalTitle from "../../ui/ModalTitle";
import ModalText from "../../ui/ModalText";
import { useToast } from "../../context/ToastContext";

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

  const themes = [
    {
      name: "green",
      color: "#277c78",
    },
    { name: "yellow", color: "#f2cdac" },
    { name: "cyan", color: "#82c9d7" },
    { name: "navy", color: "#626070" },
    { name: "red", color: "#c94736" },
    { name: "purple", color: "#826cb0" },
    { name: "turquoise", color: "#597c7c" },
    { name: "brown", color: "#93674f" },
    { name: "magenta", color: "#934f6f" },
    { name: "blue", color: "#3f82b2" },
    { name: "navy grey", color: "#97a0ac" },
    { name: "army green", color: "#7f9161" },
    { name: "pink", color: "#af81ba" },
    { name: "gold", color: "#cab361" },
    { name: "orange", color: "#be6c49" },
  ];

  // Custom Select box
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState(() => {
    if (isEditSession) {
      return (
        themes.find(
          (theme) =>
            theme.color.toLowerCase() === potToEdit.theme.toLowerCase(),
        ) || themes[0]
      );
    }

    return (
      themes.find(
        (theme) =>
          !pots?.some(
            (pot) => pot.theme.toLowerCase() === theme.color.toLowerCase(),
          ),
      ) || themes[0]
    );
  });

  const customSelectBoxButtonRef = useRef(null);

  const toggleDropdown = function () {
    if (isOpen) {
      setTimeout(() => {
        setIsOpen(false);
      }, ANIMATION_DURATION);
      setVisible(false);
    } else {
      setIsOpen(true);
      setVisible(true);
    }
  };

  const handleSelect = function (theme) {
    setVisible(false);
    setTimeout(() => {
      setIsOpen(false);
      customSelectBoxButtonRef.current.focus();
    }, ANIMATION_DURATION);
    setSelectedTheme(theme);
    setValue("theme", theme?.color);
  };

  const closeOutsideClickRef = useOutsideClicks(() => {
    setIsOpen(false);
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

        {/* Custom Select box */}
        <div ref={closeOutsideClickRef} className="relative">
          <span
            id={`label-${potModalType}`}
            className="capitalize text-preset-5-bold text-content-secondary mb-1 inline-block"
          >
            color tag
          </span>

          <button
            id={`color-tag-${potModalType}`}
            ref={customSelectBoxButtonRef}
            type="button"
            disabled={isWorking}
            aria-labelledby={`label-${potModalType} color-tag-${potModalType}`}
            aria-haspopup="listbox"
            aria-controls={`listbox-${potModalType}`}
            aria-expanded={isOpen}
            onClick={toggleDropdown}
            className="focusable-ring flex w-full items-center border border-border-base rounded-lg py-3 px-5 disabled-input"
          >
            <span
              aria-hidden="true"
              style={{
                backgroundColor: selectedTheme.color,
              }}
              className="inline-block h-4 w-4 rounded-full"
            />

            <span className="ml-3 mr-4 text-preset-4 capitalize">
              {selectedTheme.name}
            </span>

            <ChevroDownIcon
              className={`ml-auto text-content-main transition-transform origin-center  duration-200 ${isOpen ? "-rotate-180" : "rotate-0"}`}
            />
          </button>

          {errors.theme && (
            <p className="text-preset-5 text-content-error mt-1  text-right">
              {errors.theme.message}
            </p>
          )}

          {isOpen && (
            <ul
              id={`listbox-${potModalType}`}
              role="listbox"
              className={` z-20 no-scrollbar h-75 overflow-y-scroll bg-surface-primary shadow-3xl px-5 rounded-lg absolute inset-x-0 top-full mt-4 divide-y divide-border-subtle  duration-1000 transition-opacity ${visible ? "open" : "close"}`}
            >
              {themes.map((theme) => {
                const isUsed = pots?.some(
                  (pot) =>
                    pot.theme.toLowerCase() === theme.color.toLowerCase() &&
                    pot.id !== potToEdit.id,
                );
                const isSelected =
                  selectedTheme.name.toLowerCase() === theme.name.toLowerCase();

                return (
                  <li className="py-1" key={theme.name} role="none">
                    <button
                      onClick={() => {
                        if (!isUsed) handleSelect(theme);
                      }}
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      disabled={isUsed}
                      className={`focusable-ring rounded-lg py-2 flex items-center w-full ${isUsed ? "disabled:cursor-not-allowed" : "cursor-pointer"}`}
                    >
                      <span
                        aria-hidden="true"
                        style={{ backgroundColor: theme.color }}
                        className={`inline-block w-4 h-4 rounded-full ${isUsed ? "opacity-10" : "opacity-100"}`}
                      ></span>

                      <span
                        className={`ml-3 text-preset-4 capitalize ${isUsed ? "text-content-secondary" : "text-content-main"}`}
                      >
                        {theme.name}
                      </span>

                      <span className="ml-auto text-preset-5 text-content-secondary">
                        {isUsed ? "Already used" : ""}
                      </span>

                      {isSelected && !isUsed && (
                        <span className="p-[0.0937rem]">
                          <SelectedIcon
                            className={"text-icon-success w-3.5 h-3.5"}
                          />
                          <span className="sr-only">selected</span>
                        </span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
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

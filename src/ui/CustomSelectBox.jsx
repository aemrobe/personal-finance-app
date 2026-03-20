import { useRef, useState } from "react";
import { ANIMATION_DURATION_SELECT_MENU } from "../utils/constants";
import { useOutsideClicks } from "../hooks/useOutsideClicks";
import { ChevroDownIcon } from "./Icons";

function CustomSelectBox({
  budgetModalType,
  isWorking,
  inputFieldName,
  labelName,
  isColor = false,
  setValue,
  errors,
  selectedOption,
  setSelectedOption,
  rawData,
  OptionComponent,
  optionProperty1,
  optionProperty2,
  getOptionMeta = () => {},
}) {
  // Custom Select box
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const customSelectBoxButtonRef = useRef(null);

  const toggleDropdown = function () {
    if (isOpen) {
      setTimeout(() => {
        setIsOpen(false);
      }, ANIMATION_DURATION_SELECT_MENU);
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
      customSelectBoxButtonRef.current?.focus();
    }, ANIMATION_DURATION_SELECT_MENU);
    setSelectedOption(theme);
    setValue(inputFieldName, theme?.[optionProperty2]);
  };

  const closeOutsideClickRef = useOutsideClicks(() => {
    setVisible(false);
    setTimeout(() => {
      setIsOpen(false);
    }, ANIMATION_DURATION_SELECT_MENU);
  });

  return (
    <div ref={closeOutsideClickRef} className="relative">
      <span
        id={`label-${budgetModalType}`}
        className="capitalize text-preset-5-bold text-content-secondary mb-1 inline-block"
      >
        {labelName}
      </span>

      <button
        id={`color-tag-${budgetModalType}`}
        ref={customSelectBoxButtonRef}
        type="button"
        disabled={isWorking}
        aria-labelledby={`label-${budgetModalType} color-tag-${budgetModalType}`}
        aria-haspopup="listbox"
        aria-controls={`listbox-${budgetModalType}`}
        aria-expanded={isOpen}
        onClick={toggleDropdown}
        className="focusable-ring flex w-full items-center border border-border-base rounded-lg py-3 px-5 disabled-input"
      >
        {isColor && (
          <span
            aria-hidden="true"
            style={{
              backgroundColor: selectedOption?.[optionProperty2],
            }}
            className="inline-block h-4 w-4 rounded-full"
          />
        )}

        <span
          className={`${isColor ? "ml-3" : ""} mr-4 text-preset-4 capitalize`}
        >
          {selectedOption?.[optionProperty1]}
        </span>

        <ChevroDownIcon
          className={`ml-auto text-content-main transition-transform origin-center  duration-200 ${isOpen ? "-rotate-180" : "rotate-0"}`}
        />
      </button>

      {errors[inputFieldName] && (
        <p className="text-preset-5 text-content-error mt-1  text-right">
          {errors[inputFieldName].message}
        </p>
      )}

      {isOpen && (
        <div
          className={`grid overflow-hidden bg-surface-primary shadow-3xl  rounded-lg absolute inset-x-0 top-full mt-4  duration-1000 transition-opacity   ${visible ? "open-menu" : "close-menu"} z-20`}
        >
          <ul
            id={`listbox-${budgetModalType}`}
            role="listbox"
            className={`no-scrollbar px-5 overflow-y-scroll divide-y divide-border-subtle max-h-75 `}
          >
            {rawData.map((option) => {
              const meta = getOptionMeta(option, selectedOption);

              return (
                <OptionComponent
                  key={option[optionProperty1]}
                  option={option}
                  optionProperty1={optionProperty1}
                  optionProperty2={optionProperty2}
                  isColor={isColor}
                  handleSelect={handleSelect}
                  {...meta}
                />
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

export default CustomSelectBox;

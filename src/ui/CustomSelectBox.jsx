import { useRef, useState } from "react";
import { ANIMATION_DURATION } from "../utils/constants";
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
  selectedTheme,
  setSelectedTheme,
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
      customSelectBoxButtonRef.current?.focus();
    }, ANIMATION_DURATION);
    setSelectedTheme(theme);
    setValue(inputFieldName, theme?.color);
  };

  const closeOutsideClickRef = useOutsideClicks(() => {
    setIsOpen(false);
  });
  {
    /* Custom Select box */
  }
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
              backgroundColor: selectedTheme[optionProperty2],
            }}
            className="inline-block h-4 w-4 rounded-full"
          />
        )}

        <span
          className={`${isColor ? "ml-3" : ""} mr-4 text-preset-4 capitalize`}
        >
          {selectedTheme[optionProperty1]}
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
        <ul
          id={`listbox-${budgetModalType}`}
          role="listbox"
          className={` z-20 no-scrollbar h-75 overflow-y-scroll bg-surface-primary shadow-3xl px-5 rounded-lg absolute inset-x-0 top-full mt-4 divide-y divide-border-subtle  duration-1000 transition-opacity ${visible ? "open" : "close"}`}
        >
          {rawData.map((option) => {
            const meta = getOptionMeta(option, selectedTheme);

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
      )}
    </div>
  );
}

export default CustomSelectBox;

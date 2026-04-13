import { useRef, useState } from "react";
import { ANIMATION_DURATION_SELECT_MENU } from "../utils/constants";
import { useOutsideClicks } from "../hooks/useOutsideClicks";
import { ChevroDownIcon } from "./Icons";

function CustomSelectBox({
  modalType,
  isWorking,
  inputFieldName,
  labelName,
  isColor = false,
  setValue = () => {},
  errors = {},
  selectedOption,
  setSelectedOption,
  rawData,
  OptionComponent,
  optionProperty1,
  optionProperty2,
  isFilterType,
  triggerIcon,
  mobileHeaderText,
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
    setValue?.(inputFieldName, theme?.[optionProperty2]);
  };

  const closeOutsideClickRef = useOutsideClicks(() => {
    setVisible(false);
    setTimeout(() => {
      setIsOpen(false);
    }, ANIMATION_DURATION_SELECT_MENU);
  });

  return (
    <div ref={closeOutsideClickRef} className="relative">
      {labelName && (
        <span
          id={`label-${modalType}`}
          className="capitalize text-preset-5-bold text-content-secondary mb-1 inline-block"
        >
          {labelName}
        </span>
      )}

      <button
        id={`color-tag-${modalType}`}
        ref={customSelectBoxButtonRef}
        type="button"
        disabled={isWorking}
        aria-labelledby={`label-${modalType} color-tag-${modalType}`}
        aria-haspopup="listbox"
        aria-controls={`listbox-${modalType}`}
        aria-expanded={isOpen}
        onClick={toggleDropdown}
        className={`focusable-ring flex  items-center rounded-lg  disabled-input ${isFilterType ? "w-5 md:w-44 md:h-11.25 md:py-3 md:px-5 md:border md:border-border-base" : "w-full py-3 px-5 border border-border-base"}`}
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

        {isFilterType && triggerIcon ? (
          <>
            <span className="md:hidden">{triggerIcon}</span>
            <span className="hidden md:inline-block text-preset-4 capitalize mr-4 overflow-hidden text-ellipsis whitespace-nowrap flex-1">
              {selectedOption?.[optionProperty1]}
            </span>
          </>
        ) : (
          <span
            className={`${isColor ? "ml-3" : ""} mr-4 text-preset-4 capitalize`}
          >
            {selectedOption?.[optionProperty1]}
          </span>
        )}

        <ChevroDownIcon
          className={`ml-auto text-content-main transition-transform origin-center ${
            isFilterType ? "hidden md:block" : ""
          } duration-200 ${isOpen ? "-rotate-180" : "rotate-0"}`}
        />
      </button>

      {errors?.[inputFieldName] && (
        <p className="text-preset-5 text-content-error mt-1  text-right">
          {errors?.[inputFieldName].message}
        </p>
      )}

      {isOpen && (
        <div
          className={`grid overflow-hidden bg-surface-primary shadow-3xl  rounded-lg  absolute ${isFilterType ? "right-0 w-44.25 md:w-full" : "inset-x-0"} top-full mt-4  duration-1000 transition-opacity   ${visible ? "open-menu" : "close-menu"} z-20`}
        >
          <div className="overflow-hidden">
            {mobileHeaderText && (
              <p className="md:hidden mx-5 py-4 text-preset-4 text-content-secondary border-b border-border-subtle">
                {mobileHeaderText}
              </p>
            )}

            <ul
              id={`listbox-${modalType}`}
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
        </div>
      )}
    </div>
  );
}

export default CustomSelectBox;

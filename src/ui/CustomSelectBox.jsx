import { useEffect, useRef, useState } from "react";
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
  widthOfTriggerButton = "",
  heightOfTriggerButton = "",
  widthOfTheMenuList = "",
  heightOfTheMenuList = "",
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

  const closeDropDown = function () {
    setVisible(false);
    setTimeout(() => {
      setIsOpen(false);
      customSelectBoxButtonRef.current?.focus();
    }, ANIMATION_DURATION_SELECT_MENU);
  };

  const handleSelect = function (theme) {
    closeDropDown();
    setSelectedOption(theme);
    setValue?.(inputFieldName, theme?.[optionProperty2]);
  };

  const handleKeyDown = function (e) {
    if (e.key === "Escape") {
      closeDropDown();
    }
  };

  const closeOutsideClickRef = useOutsideClicks(() => {
    if (isOpen) {
      closeDropDown();
    }
  });

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        closeDropDown();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  return (
    <div
      ref={closeOutsideClickRef}
      className={`relative ${isFilterType ? "flex gap-2 items-center shrink-0" : ""}`}
    >
      <span
        id={`label-${modalType}`}
        className={`capitalize  text-content-secondary shrink-0  ${isFilterType ? "hidden md:inline-block text-preset-4" : "inline-block text-preset-5-bold mb-1"}`}
      >
        {labelName}
      </span>

      <button
        id={`color-tag-${modalType}`}
        ref={customSelectBoxButtonRef}
        type="button"
        disabled={isWorking}
        aria-labelledby={`label-${modalType}`}
        aria-haspopup="listbox"
        aria-controls={`listbox-${modalType}`}
        aria-expanded={isOpen}
        onKeyDown={handleKeyDown}
        onClick={toggleDropdown}
        className={`outline-none focusable-ring flex shrink-0 md:border  items-center rounded-lg disabled-input ${widthOfTriggerButton} ${heightOfTriggerButton} ${isFilterType ? ` justify-center p-[2.5px] md:py-3 md:px-5` : "border py-3 px-5 border-border-base"} ${visible ? "border-content-main" : "md:border-border-base `"}  `}
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
          className={`grid overflow-hidden bg-surface-primary shadow-3xl  rounded-lg  absolute ${isFilterType ? `right-0` : "inset-x-0"} top-full mt-4  duration-1000 transition-opacity   ${visible ? "open-menu" : "close-menu"} z-20`}
        >
          <div
            className={`overflow-y-scroll no-scrollbar ${widthOfTheMenuList} ${heightOfTheMenuList} `}
          >
            {mobileHeaderText && (
              <p className="md:hidden mx-5 py-4 text-preset-4 text-content-secondary border-b border-border-subtle">
                {mobileHeaderText}
              </p>
            )}

            <ul
              id={`listbox-${modalType}`}
              role="listbox"
              className={`px-5 divide-y divide-border-subtle`}
            >
              {rawData.map((option) => {
                const meta = getOptionMeta(option, selectedOption);

                return (
                  <OptionComponent
                    key={option[optionProperty1]}
                    option={option}
                    optionProperty1={optionProperty1}
                    optionProperty2={optionProperty2}
                    isFilterType
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

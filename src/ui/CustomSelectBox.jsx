import { useEffect, useRef, useState } from "react";
import { ANIMATION_DURATION_SELECT_MENU } from "../utils/constants";
import { useOutsideClicks } from "../hooks/useOutsideClicks";
import { ChevroDownIcon } from "./Icons";

function CustomSelectBox({
  className,
  modalType,
  isWorking,
  inputFieldName,
  labelName,
  isColor = false,
  setValue = () => {},
  errors = {},
  selectedOption,
  setSelectedOption,
  rawData = [], // Ensure it defaults to an array
  OptionComponent,
  optionProperty1,
  optionProperty2,
  isFilterType = false,
  widthOfTriggerButton = "",
  heightOfTriggerButton = "",
  widthOfTheMenuList = "",
  heightOfTheMenuList = "",
  triggerIcon,
  mobileHeaderText,
  getOptionMeta = () => {},
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  // Track the highlighted index for keyboard navigation
  const [activeIndex, setActiveIndex] = useState(-1);

  const [isKeyboardMode, setIsKeyboardMode] = useState(false);
  const customSelectBoxButtonRef = useRef(null);
  const prevIsOpen = useRef(isOpen);

  const toggleDropdown = function () {
    if (isOpen) {
      closeDropDown();
    } else {
      setIsOpen(true);
      setVisible(true);

      // Default highlight to the currently selected option index when opening
      const currentIdx = rawData.findIndex(
        (opt) => opt[optionProperty1] === selectedOption?.[optionProperty1],
      );
      setActiveIndex(currentIdx >= 0 ? currentIdx : 0);
    }
  };

  const closeDropDown = function () {
    setVisible(false);

    setTimeout(() => {
      setIsOpen(false);
      setIsKeyboardMode(false);
      setActiveIndex(-1); // Reset highlight when closed
    }, ANIMATION_DURATION_SELECT_MENU);
  };

  const handleSelect = function (theme) {
    closeDropDown();
    setSelectedOption(theme);
    setValue?.(inputFieldName, theme?.[optionProperty2]);
  };

  // Centralized keyboard handler bound to the button trigger
  const handleKeyDown = function (e) {
    if (isWorking) return;

    if (
      [
        "ArrowDown",
        "ArrowUp",
        "ArrowLeft",
        "ArrowRight",
        "Enter",
        " ",
      ].includes(e.key)
    ) {
      setIsKeyboardMode(true);
    }

    switch (e.key) {
      case "Enter":
      case " ": // Space bar
        e.preventDefault();
        if (!isOpen) {
          toggleDropdown();
        } else if (activeIndex >= 0 && activeIndex < rawData.length) {
          const targetedOption = rawData[activeIndex];

          const meta = getOptionMeta(targetedOption, selectedOption);

          if (!meta?.isUsed) {
            handleSelect(targetedOption);
          }
        }
        break;

      case "ArrowDown":
        e.preventDefault();
        if (!isOpen) {
          toggleDropdown();
        } else {
          setActiveIndex((prev) =>
            prev < rawData.length - 1 ? prev + 1 : prev,
          );
        }
        break;

      case "ArrowUp":
        e.preventDefault();
        if (!isOpen) {
          toggleDropdown();
        } else {
          setActiveIndex((prev) => (prev > 0 ? prev - 1 : prev));
        }
        break;

      case "Home":
        e.preventDefault();
        if (isOpen) setActiveIndex(0);
        break;

      case "End":
        e.preventDefault();
        if (isOpen) setActiveIndex(rawData.length - 1);
        break;

      case "Escape":
      case "Tab":
        // Let the dropdown close immediately if navigating away
        if (isOpen) {
          e.preventDefault();
          e.stopPropagation();
          closeDropDown();
        }
        break;

      default:
        break;
    }
  };

  const closeOutsideClickRef = useOutsideClicks(() => {
    if (isOpen) closeDropDown();
  });

  useEffect(() => {
    if (prevIsOpen.current === true && !isOpen) {
      requestAnimationFrame(() => {
        customSelectBoxButtonRef.current?.focus();
      });
    }
    prevIsOpen.current = isOpen;
  }, [isOpen]);

  // Handle scrolling highlighted elements into view inside custom menus
  useEffect(() => {
    if (activeIndex >= 0 && isOpen) {
      const activeEl = document.getElementById(
        `option-${modalType}-${activeIndex}`,
      );
      activeEl?.scrollIntoView({ block: "nearest" });
    }
  }, [activeIndex, isOpen, modalType]);

  return (
    <div
      ref={closeOutsideClickRef}
      className={`relative ${className} ${isFilterType ? "flex gap-2 items-center shrink-0" : ""}`}
    >
      <span
        id={`label-${modalType}`}
        className={`capitalize text-content-secondary shrink-0 ${isFilterType ? "hidden md:inline-block text-preset-4" : "inline-block text-preset-5-bold mb-1"}`}
      >
        {labelName}
      </span>

      <button
        id={`trigger-${modalType}`}
        ref={customSelectBoxButtonRef}
        type="button"
        disabled={isWorking}
        aria-haspopup="listbox"
        aria-controls={`listbox-${modalType}`}
        aria-expanded={isOpen}
        aria-labelledby={`label-${modalType}`}
        // Crucial: Tells the computer which specific item is active
        aria-activedescendant={
          activeIndex >= 0 ? `option-${modalType}-${activeIndex}` : undefined
        }
        onKeyDown={handleKeyDown}
        onClick={toggleDropdown}
        className={`outline-none focusable-ring flex shrink-0 md:border hover:border-border-divider hover:cursor-pointer transition-all duration-500 items-center ${isFilterType ? "rounded-full md:rounded-lg" : "rounded-lg"} disabled-input ${widthOfTriggerButton} ${heightOfTriggerButton} ${isFilterType ? "justify-center p-[2.5px] md:py-3 md:px-5" : "border py-3 px-5 border-border-base"} ${visible ? "border-content-main" : "md:border-border-base"}`.trim()}
      >
        {isColor && (
          <span
            aria-hidden="true"
            style={{ backgroundColor: selectedOption?.[optionProperty2] }}
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
          className={`ml-auto text-content-main transition-transform origin-center ${isFilterType ? "hidden md:block" : ""} duration-200 ${isOpen ? "-rotate-180" : "rotate-0"}`}
        />
      </button>

      {errors?.[inputFieldName] && (
        <p className="text-preset-5 text-content-error mt-1 text-right">
          {errors?.[inputFieldName].message}
        </p>
      )}

      {isOpen && (
        <div
          onMouseMove={() => {
            if (isKeyboardMode) setIsKeyboardMode(false);
          }}
          className={`grid overflow-hidden bg-surface-primary shadow-3xl rounded-lg absolute ${isFilterType ? `right-0` : "inset-x-0"} top-full mt-4 duration-1000 transition-opacity ${visible ? "open-menu" : "close-menu"} z-20`}
        >
          <div
            className={`overflow-y-scroll no-scrollbar ${widthOfTheMenuList} ${heightOfTheMenuList}`}
          >
            {mobileHeaderText && (
              <p className="md:hidden mx-5 py-3 text-preset-4 text-content-secondary border-b border-border-subtle">
                {mobileHeaderText}
              </p>
            )}

            <ul
              id={`listbox-${modalType}`}
              role="listbox"
              aria-labelledby={`label-${modalType}`}
              className="px-5 divide-y divide-border-subtle"
            >
              {rawData.map((option, index) => {
                const meta = getOptionMeta(option, selectedOption);
                const isHighlighted = index === activeIndex && isKeyboardMode;

                return (
                  <OptionComponent
                    key={option[optionProperty1]}
                    optionId={`option-${modalType}-${index}`}
                    isHighlighted={isHighlighted}
                    option={option}
                    optionProperty1={optionProperty1}
                    optionProperty2={optionProperty2}
                    isFilterType={isFilterType}
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

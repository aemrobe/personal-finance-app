import { useSearchParams } from "react-router-dom";
import { useFormSelection } from "../../hooks/useFormSelection";
import CustomSelectBox from "../../ui/CustomSelectBox";
import SearchIcon from "../../ui/Icons/SearchIcon";
import { useCategories } from "../categories/useCategory";
import SelectOption from "../../ui/selectOption";
import { FilterMobileIcon, SortByIcon } from "../../ui/Icons";
import { useCallback } from "react";
import { SORT_BY_OPTIONS } from "../../utils/constants";

function TransactionBody() {
  const { data: categories, isLoading: isLoadingCategories } = useCategories();
  const [searchParams, setSearchParams] = useSearchParams();

  const findAvailableCategory = useCallback(
    (_, categories) => {
      const currentFilter = searchParams.get("category");

      return currentFilter
        ? categories?.find(
            (cat) => cat.category.toLowerCase() === currentFilter.toLowerCase(),
          )?.category
        : categories[0]?.category;
    },
    [searchParams],
  );

  const findAvailableSortByOption = useCallback(
    (_, sortByOptions) => {
      const currentFilter = searchParams.get("sortBy");

      return currentFilter
        ? sortByOptions.find(
            (opt) => opt.category.toLowerCase() === currentFilter.toLowerCase(),
          )?.category
        : sortByOptions[0]?.category;
    },
    [searchParams],
  );

  const availableCategoryTypes = [
    {
      category: "All Transactions",
    },
    ...(categories || []),
  ];

  const [selectedCategory, setSelectedCategory] = useFormSelection({
    allData: [],
    rawData: availableCategoryTypes,
    dataKey: "category",
    matchKey: "category",
    findNextAvailable: findAvailableCategory,
  });

  const [selectedSortByOption, setSelectedSortByOption] = useFormSelection({
    allData: [],
    rawData: SORT_BY_OPTIONS,
    dataKey: "category",
    matchKey: "category",
    findNextAvailable: findAvailableSortByOption,
  });

  const handleCategoryChange = (categoryObj) => {
    setSelectedCategory(categoryObj);

    if (
      categoryObj.category.toLowerCase() === "All Transactions".toLowerCase()
    ) {
      searchParams.delete("category");
    } else {
      searchParams.set("category", categoryObj.category);
    }

    setSearchParams(searchParams);
  };

  const handleSortByOption = (sortByObj) => {
    setSelectedSortByOption(sortByObj);

    searchParams.set("sortBy", sortByObj.category);

    setSearchParams(searchParams);
  };

  const isWorking = isLoadingCategories;

  return (
    <div className="bg-surface-primary py-6 md:p-8 px-5 rounded-xl flex gap-6 items-center ">
      <div className="flex focusable-ring min-w-0  justify-between items-center border border-border-base rounded-lg py-3 px-5  gap-2">
        <label htmlFor="search-transaction" className="sr-only">
          Search transaction
        </label>

        <input
          type="text"
          id="search-transaction"
          name="transactions"
          placeholder="Search transaction"
          className=" text-ellipsis whitespace-nowrap text-preset-4 text-content-placeholder min-w-0 focus:outline-none placeholder:text-content-placeholder placeholder:text-preset-4 flex-1"
        />

        <SearchIcon className={"w-3.5 h-3.5 text-content-main shrink-0"} />
      </div>

      <CustomSelectBox
        labelName={"Sort by"}
        modalType={`transactions-sortBy`}
        isFilterType={true}
        widthOfTriggerButton="w-5 md:w-28.25"
        heightOfTriggerButton="md:h-11.25"
        widthOfTheMenuList="w-28.5"
        heightOfTheMenuList="max-h-75 md:max-h-68.75"
        triggerIcon={
          <SortByIcon className={"text-content-main w-4 shrink-0"} />
        }
        mobileHeaderText={"Sort by"}
        selectedOption={selectedSortByOption}
        setSelectedOption={handleSortByOption}
        isWorking={isWorking}
        rawData={SORT_BY_OPTIONS}
        optionProperty1="category"
        optionProperty2="category"
        OptionComponent={SelectOption}
        getOptionMeta={(rawCategory, selectedCategory) => {
          const isSelected =
            selectedCategory.category.toLowerCase() ===
            rawCategory.category.toLowerCase();

          return {
            isSelected,
          };
        }}
      />

      <CustomSelectBox
        labelName={"category"}
        modalType={`transactions-select-category`}
        isFilterType={true}
        widthOfTriggerButton="w-5 md:w-44.25"
        heightOfTriggerButton="md:h-11.25"
        widthOfTheMenuList="w-44.25 md:w-44.25"
        triggerIcon={
          <FilterMobileIcon className={"text-content-main w-4 shrink-0"} />
        }
        mobileHeaderText={"Category"}
        selectedOption={selectedCategory}
        setSelectedOption={handleCategoryChange}
        isWorking={isWorking}
        rawData={availableCategoryTypes}
        optionProperty1="category"
        optionProperty2="category"
        OptionComponent={SelectOption}
        getOptionMeta={(rawCategory, selectedCategory) => {
          const isSelected =
            selectedCategory.category.toLowerCase() ===
            rawCategory.category.toLowerCase();

          return {
            isSelected,
          };
        }}
      />
    </div>
  );
}

export default TransactionBody;

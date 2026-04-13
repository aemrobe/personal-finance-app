import { useSearchParams } from "react-router-dom";
import { useFormSelection } from "../../hooks/useFormSelection";
import CustomSelectBox from "../../ui/CustomSelectBox";
import SearchIcon from "../../ui/Icons/SearchIcon";
import { useCategories } from "../categories/useCategory";
import SelectOption from "../../ui/selectOption";
import { FilterMobileIcon } from "../../ui/Icons";
import { useCallback } from "react";

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

  const isWorking = isLoadingCategories;

  return (
    <div className="bg-surface-primary py-6 px-5 rounded-xl flex">
      <div className="flex justify-between items-center border border-border-base rounded-lg py-3 px-5">
        <input
          type="search"
          name="transactions"
          placeholder="Search transaction"
          className="text-content-placeholder placeholder:text-content-placeholder placeholder:text-preset-4"
        />

        <SearchIcon className={"w-3.5 h-3.5 text-content-main"} />
      </div>

      <CustomSelectBox
        modalType={`select-category`}
        isFilterType={true}
        triggerIcon={<FilterMobileIcon className={"text-content-main w-4"} />}
        mobileHeaderText={"Category"}
        selectedOption={selectedCategory}
        setSelectedOption={handleCategoryChange}
        isWorking={isWorking}
        rawData={availableCategoryTypes}
        optionProperty1="category"
        optionProperty2="category"
        OptionComponent={SelectOption}
      />
    </div>
  );
}

export default TransactionBody;

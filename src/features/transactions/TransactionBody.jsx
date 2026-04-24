import { useSearchParams } from "react-router-dom";
import { useFormSelection } from "../../hooks/useFormSelection";
import CustomSelectBox from "../../ui/CustomSelectBox";
import SearchIcon from "../../ui/Icons/SearchIcon";
import { useCategories } from "../categories/useCategory";
import SelectOption from "../../ui/selectOption";
import { FilterMobileIcon, SortByIcon } from "../../ui/Icons";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ANNOUNCEMENT_DEBOUNCE_MS,
  PAGE_SIZE,
  SEARCH_DEBOUNCE_MS,
  SORT_BY_OPTIONS,
} from "../../utils/constants";
import ErrorWrapper from "../../ui/ErrorWrapper";
import ErrorDisplay from "../../ui/ErrorDisplay";
import { useTransactions } from "./useTransactions";
import TransactionDataItem from "./TransactionDataItem";
import Pagination from "../../ui/Pagination";
import { useCurrentUser } from "../authentication/useCurrentUser";
import SpinnerMiniContainer from "../../ui/SpinnerMiniContainer";
import EmptyMessage from "../../ui/EmptyMessage";
import SearchBox from "../../ui/SearchBox";

function TransactionBody() {
  const {
    isLoading: isLoadingUser,
    error: userError,
    isFetching: isFetchingUser,
    refetch: refetchUser,
  } = useCurrentUser();

  const {
    data: transactions,
    isLoading: isLoadingTransactions,
    error: transactionError,
    isFetching: isFetchingTransactions,
    refetch: refetchTransactions,
    count,
  } = useTransactions();

  const {
    data: categories,
    isLoading: isLoadingCategories,
    error: categoriesError,
    isFetching: isFetchingCategories,
    refetch: refetchCategories,
  } = useCategories();

  const isLoading =
    isLoadingUser || isLoadingTransactions || isLoadingCategories;

  const [searchParams, setSearchParams] = useSearchParams();
  const isUserInput = useRef(false);

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
      const currentFilter = searchParams.get("sortBy") || "date-desc";

      return currentFilter
        ? sortByOptions.find(
            (opt) => opt.value.toLowerCase() === currentFilter.toLowerCase(),
          )?.value
        : sortByOptions[0]?.value;
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
    dataKey: "value",
    matchKey: "value",
    findNextAvailable: findAvailableSortByOption,
  });

  const handleCategoryChange = (categoryObj) => {
    setSelectedCategory(categoryObj);

    searchParams.set("category", categoryObj.category);
    searchParams.set("page", 1);

    setSearchParams(searchParams);
  };

  const handleSortByOption = (sortByObj) => {
    setSelectedSortByOption(sortByObj);

    searchParams.set("sortBy", sortByObj.value);
    searchParams.set("page", 1);

    setSearchParams(searchParams);
  };

  const handleSearchInput = function (e) {
    isUserInput.current = true;
    setSearchTerm(e.target.value);
  };
  const pageNumber = searchParams.get("page");

  const currentPage = !pageNumber ? 1 : Number(pageNumber);

  const pageCount = Math.ceil(count / PAGE_SIZE);

  const [announcement, setAnnouncement] = useState(``);
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || "",
  );

  useEffect(() => {
    const handler = setTimeout(() => {
      const searchTermToLowerCase = searchTerm?.toLowerCase();

      if (searchTermToLowerCase !== searchParams.get("search")?.toLowerCase()) {
        if (searchTermToLowerCase.trim() !== "") {
          searchParams.set("search", searchTerm);
          searchParams.set("page", 1);
        } else {
          searchParams.delete("search");
        }
      }

      setSearchParams(searchParams);
    }, SEARCH_DEBOUNCE_MS);

    return () => clearTimeout(handler);
  }, [searchTerm, setSearchParams, searchParams]);

  useEffect(() => {
    const currentUrlQuery = searchParams.get("search") || "";

    if (searchTerm !== currentUrlQuery && !isUserInput.current) {
      setSearchTerm(currentUrlQuery);
    }

    if (searchTerm === currentUrlQuery && isUserInput.current) {
      isUserInput.current = false;
    }
  }, [searchParams, searchTerm]);

  useEffect(() => {
    if (isLoading) return;

    const currentSearch = searchParams.get("search") || "";

    const searchPart = currentSearch ? `for search ${currentSearch}` : "";
    const sortLabel = selectedSortByOption?.label;
    const filterCategory =
      selectedCategory?.category === "All Transactions"
        ? "all categories"
        : `The ${selectedCategory?.category} category`;

    const timeout = setTimeout(() => {
      if (!count || Number(count) === 0) {
        setAnnouncement(
          `No transactions found ${searchPart} in ${filterCategory}, sorted by ${sortLabel}`,
        );
        return;
      }

      if (
        !pageCount ||
        !selectedCategory?.category ||
        !selectedSortByOption?.label
      )
        return;

      setAnnouncement(
        `Showing page ${currentPage} of ${pageCount} from ${filterCategory} ${searchPart}, sorted by ${selectedSortByOption.label}`,
      );
    }, ANNOUNCEMENT_DEBOUNCE_MS);

    return () => clearTimeout(timeout);
  }, [
    count,
    isLoading,
    currentPage,
    pageCount,
    selectedCategory,
    selectedSortByOption,
    searchParams,
  ]);

  if (categoriesError || transactionError || userError)
    return (
      <ErrorWrapper>
        <ErrorDisplay
          error={
            categoriesError?.message ||
            transactionError?.message ||
            userError?.message
          }
          isLoading={
            isFetchingCategories || isFetchingTransactions || isFetchingUser
          }
          onRetry={() => {
            refetchCategories();
            refetchTransactions();
            refetchUser();
          }}
        />
      </ErrorWrapper>
    );

  const isFiltered =
    searchParams.get("search") ||
    searchParams.get("category") !== "All Transactions";

  return (
    <div className="flex-1 flex flex-col bg-surface-primary py-6 md:p-8 px-5 rounded-xl relative">
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>

      <div className="flex gap-6 items-center mb-6 ">
        <SearchBox
          searchTerm={searchTerm}
          isLoading={isLoading}
          onChange={handleSearchInput}
        />

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
          isWorking={isLoading}
          rawData={SORT_BY_OPTIONS}
          optionProperty1="label"
          optionProperty2="value"
          OptionComponent={SelectOption}
          getOptionMeta={(rawCategory, selectedCategory) => {
            const isSelected =
              selectedCategory.value.toLowerCase() ===
              rawCategory.value.toLowerCase();

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
          heightOfTheMenuList="max-h-75"
          triggerIcon={
            <FilterMobileIcon className={"text-content-main w-4 shrink-0"} />
          }
          mobileHeaderText={"Category"}
          selectedOption={selectedCategory}
          setSelectedOption={handleCategoryChange}
          isWorking={isLoading}
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

      <div className="flex-1">
        {isLoading ? (
          <SpinnerMiniContainer size="text-5xl" />
        ) : (
          <ul>
            {transactions?.map((transaction) => (
              <TransactionDataItem
                key={transaction.id}
                transaction={{
                  ...transaction,
                  category: transaction?.categories?.category,
                }}
              />
            ))}
          </ul>
        )}

        {transactions?.length === 0 && !isLoading && (
          <EmptyMessage
            title={
              isFiltered ? "No transactions found" : "No transaction history "
            }
            text={
              isFiltered
                ? "Try adjusting your filters or search term to find what you're looking for."
                : "You don't have any transactions yet. Add your first transaction to get started!"
            }
            icon={isFiltered ? "🔍" : "💸"}
            shadowOfTheBox={""}
          />
        )}
      </div>

      <Pagination count={count} />
    </div>
  );
}

export default TransactionBody;

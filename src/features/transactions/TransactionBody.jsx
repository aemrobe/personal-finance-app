import { useFormSelection } from "../../hooks/useFormSelection";
import CustomSelectBox from "../../ui/CustomSelectBox";
import { useCategories } from "../categories/useCategory";
import SelectOption from "../../ui/selectOption";
import { FilterMobileIcon, SortByIcon } from "../../ui/Icons";
import { useCallback } from "react";
import { PAGE_SIZE, SORT_BY_OPTIONS } from "../../utils/constants";
import ErrorWrapper from "../../ui/ErrorWrapper";
import ErrorDisplay from "../../ui/ErrorDisplay";
import { useTransactions } from "./useTransactions";
import TransactionDataItem from "./TransactionDataItem";
import Pagination from "../../ui/Pagination";
import { useCurrentUser } from "../authentication/useCurrentUser";
import SpinnerMiniContainer from "../../ui/SpinnerMiniContainer";
import EmptyMessage from "../../ui/EmptyMessage";
import SearchBox from "../../ui/SearchBox";
import { useSearchManager } from "../../hooks/useSearchManager";
import { useGenerateAnnouncement } from "../../hooks/useGenerateAnnouncment";
import TransactionDataContainer from "./TransactionDataContainer";

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

  const { searchTerm, searchParams, setSearchParams, updateSearch } =
    useSearchManager({ resetPageOnSearch: true });

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

  const pageNumber = searchParams.get("page");

  const currentPage = !pageNumber ? 1 : Number(pageNumber);

  const pageCount = Math.ceil(count / PAGE_SIZE);

  const isFiltered =
    searchParams.get("search")?.trim() ||
    selectedCategory?.category !== "All Transactions";

  //Screen reader Announcement message
  const { announcement } = useGenerateAnnouncement({
    isLoading,
    count: transactions?.length,
    searchParams,
    selectedSortByLabel: selectedSortByOption?.label,
    generateAnnouncement: ({ count, searchTerm, sortLabel }) => {
      const hasSearch = Boolean(searchTerm?.trim());
      const isAllCategory = selectedCategory?.category === "All Transactions";
      const categoryText = isAllCategory
        ? "all categories"
        : `the ${selectedCategory?.category}`;
      const transactionText = `transaction${count === 1 ? "" : "s"}`;

      if (!count || Number(count) === 0) {
        return `No transactions found${hasSearch ? ` matching ${searchTerm} in ${categoryText}` : `in ${categoryText}`}. Try adjusting your search or filters.`;
      }

      if (hasSearch) {
        return `Found ${count} ${transactionText} matching "${searchTerm}" in ${categoryText}, sorted by ${sortLabel}`;
      }

      // Without search (normal browsing)
      return `Showing ${count} transactions in ${categoryText}, sorted by ${sortLabel}. Page ${currentPage} of ${pageCount}`;
    },
  });

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
          onChange={(e) => updateSearch(e)}
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
          <TransactionDataContainer>
            {transactions?.map((transaction) => (
              <TransactionDataItem
                key={transaction.id}
                transaction={{
                  ...transaction,
                  category: transaction?.categories?.category,
                }}
              />
            ))}
          </TransactionDataContainer>
        )}

        {transactions?.length === 0 && !isLoading && (
          <EmptyMessage
            title={
              isFiltered ? "No transactions found" : "No transaction history "
            }
            text={
              isFiltered
                ? "Try adjusting your filters or search term to find what you're looking for."
                : "It looks like You don't have any transactions yet."
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

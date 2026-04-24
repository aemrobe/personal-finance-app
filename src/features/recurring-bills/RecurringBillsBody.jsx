import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useAllTransactions } from "../transactions/useAllTransactions";
import { formatCurrency, getOrdinal } from "../../utils/helpers";
import {
  BillDueIcon,
  RecurringBillsIcon,
  SelectedIcon,
  SortByIcon,
} from "../../ui/Icons";
import { useSearchParams } from "react-router-dom";
import SearchBox from "../../ui/SearchBox";
import CustomSelectBox from "../../ui/CustomSelectBox";
import { useFormSelection } from "../../hooks/useFormSelection";
import SelectOption from "../../ui/selectOption";
import SpinnerMiniContainer from "../../ui/SpinnerMiniContainer";
import { SEARCH_DEBOUNCE_MS } from "../../utils/constants";

const SORT_BY_OPTIONS = [
  {
    label: "Latest",
    value: "date-asc",
  },
  {
    label: "Oldest",
    value: "date-desc",
  },
  { label: "A to Z", value: "name-asc" },
  { label: "Z to A", value: "name-desc" },
  { label: "Highest", value: "amount-desc" },
  { label: "Lowest", value: "amount-asc" },
];

const calculateFutureDueDate = function (date) {
  const dayOfTheMonth = date.getDate();

  if (dayOfTheMonth < 19) return "overdue";
  else if (dayOfTheMonth >= 19 && dayOfTheMonth <= 24) return "soon";
  else return "upcoming";
};

function RecurringBillsBody() {
  const {
    data: allTransactions,
    isLoading,
    error,
    isFetching,
    refetch,
  } = useAllTransactions();

  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || "",
  );

  const isUserInput = useRef(false);

  const findAvailableSortByOption = useCallback(
    (_, sortByOptions) => {
      const currentFilter = searchParams.get("sortBy") || "date-asc";

      return currentFilter
        ? sortByOptions.find(
            (opt) => opt.value.toLowerCase() === currentFilter.toLowerCase(),
          )?.value
        : sortByOptions[0]?.value;
    },
    [searchParams],
  );

  const [selectedSortByOption, setSelectedSortByOption] = useFormSelection({
    allData: [],
    rawData: SORT_BY_OPTIONS,
    dataKey: "value",
    matchKey: "value",
    findNextAvailable: findAvailableSortByOption,
  });

  const handleSearchInput = function (e) {
    isUserInput.current = true;
    setSearchTerm(e.target.value);
  };

  const handleSortByOption = (sortByObj) => {
    setSelectedSortByOption(sortByObj);

    searchParams.set("sortBy", sortByObj.value);

    setSearchParams(searchParams);
  };

  const recurringBills = useMemo(
    () =>
      allTransactions
        ?.filter((t) => t.recurring)
        ?.reduce((acc, current) => {
          const exsisting = acc.find((t) => t.name === current.name);

          if (!exsisting) return [...acc, current];

          return new Date(current.date) > new Date(exsisting.date)
            ? acc.map((i) => (i.name === current.name ? current : i))
            : acc;
        }, []),
    [allTransactions],
  );

  const processedBills = useMemo(
    () =>
      recurringBills?.map((bill) => {
        const dateOfBill = new Date(bill.date);
        const dayOfMonth = dateOfBill.getDate();

        const isPaid =
          dateOfBill.getMonth() === 7 && dateOfBill.getFullYear() === 2024;

        return {
          ...bill,
          status: isPaid ? "paid" : calculateFutureDueDate(dateOfBill),
          dayOfMonth,
          amount: Math.abs(bill.amount),
        };
      }),
    [recurringBills],
  );
  const sortByValue = selectedSortByOption?.value;

  const [value, direction] = sortByValue.split("-");
  const directionValue = direction === "asc" ? 1 : -1;

  console.log("processedBills", processedBills);

  const searchedRecurringBills = useMemo(() => {
    //filtered
    const filteredSearchResults = processedBills?.filter(
      (bill) =>
        bill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bill.amount.toString().includes(searchTerm),
    );

    //Sorted
    return filteredSearchResults?.sort((a, b) => {
      let compareValue = 0;

      if (value === "name")
        compareValue = a.name.localeCompare(b.name); // ascending a - z
      else if (value === "date")
        compareValue = a.dayOfMonth - b.dayOfMonth; //ascending oldest - newest
      else if (value === "amount") compareValue = a.amount - b.amount; // ascending smallest - biggest

      return compareValue * directionValue;
    });
  }, [processedBills, searchTerm, directionValue, value]);

  // Paid Bills
  const paidBills = processedBills?.filter((bill) => bill.status === "paid");

  const paidBillAmount = paidBills?.reduce(
    (acc, cur) => acc + Math.abs(cur.amount),
    0,
  );

  //Total Upcoming bills
  const totalUpcomingBills = processedBills?.filter(
    (bill) => bill.status !== "paid",
  );
  const totalUpcomingBillAmount = totalUpcomingBills?.reduce(
    (acc, cur) => Math.abs(cur.amount) + acc,
    0,
  );

  //Due Soon bills
  const dueSoonBills = processedBills?.filter((bill) => bill.status === "soon");

  const dueSoonBillAmount = dueSoonBills?.reduce(
    (acc, cur) => acc + Math.abs(cur.amount),
    0,
  );

  useEffect(() => {
    const handler = setTimeout(() => {
      const searchTermToLowerCase = searchTerm?.toLowerCase();

      if (searchTermToLowerCase !== searchParams.get("search")?.toLowerCase()) {
        if (searchTermToLowerCase.trim() !== "") {
          searchParams.set("search", searchTerm);
        } else {
          searchParams.delete("search");
        }
      }

      setSearchParams(searchParams);
    }, SEARCH_DEBOUNCE_MS);

    return () => clearTimeout(handler);
  }, [searchTerm, setSearchParams, searchParams]);

  return (
    <div className="relative flex-1">
      {isLoading ? (
        <SpinnerMiniContainer size="text-5xl" />
      ) : (
        <>
          <div>
            <div className="bg-surface-inverse py-6 px-5 rounded-xl text-content-inverse flex items-center gap-5 flex-wrap">
              <span className="size-10 flex items-center justify-center shrink-0">
                <RecurringBillsIcon className={"w-8 "} />
              </span>

              <div>
                <h4 className="text-preset-4">Total bills</h4>

                <p className="text-preset-1 mt-2.75">
                  {formatCurrency(paidBillAmount + totalUpcomingBillAmount)}
                </p>
              </div>
            </div>

            <div className="bg-surface-primary py-5 px-5 rounded-xl mt-3">
              <h4 className="text-preset-3 mb-5">Summary</h4>

              <ul className="divide-y divide-border-divider/15">
                <RecurringBillSummaryItem
                  title={"Paid bills"}
                  amount={paidBillAmount}
                  count={paidBills?.length}
                />

                <RecurringBillSummaryItem
                  title={"Total Upcoming"}
                  amount={totalUpcomingBillAmount}
                  count={totalUpcomingBills?.length}
                />

                <RecurringBillSummaryItem
                  textColorTitle="text-content-error"
                  textColorText="text-content-error"
                  title={"Due Soon"}
                  amount={dueSoonBillAmount}
                  count={dueSoonBills?.length}
                />
              </ul>
            </div>
          </div>

          <div className="bg-surface-primary py-6 px-5 mt-6 rounded-xl">
            <div className="flex gap-6 mb-6">
              <SearchBox
                searchTerm={searchTerm}
                isLoading={isLoading}
                onChange={handleSearchInput}
                className="flex-1 max-w-64.5"
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
            </div>

            <ul className="divide-y divide-border-subtle">
              {searchedRecurringBills?.map((bill) => (
                <RecurringListItem key={bill.id} bill={bill} />
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

function RecurringListItem({ bill }) {
  return (
    <li className="first:pt-0 last:pb-0 py-5">
      <div className="flex items-center gap-4 mb-2">
        <img
          className="block size-8 rounded-full"
          src={bill.avatar}
          alt={`${bill.name} logo`}
        />
        <p className="text-preset-4-bold">{bill.name}</p>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-icon-success">
          <p className="text-preset-5">Monthly-{getOrdinal(bill.dayOfMonth)}</p>

          <span className="size-4 flex item-center justify-center">
            {bill.status === "paid" && <SelectedIcon className={" w-3.5"} />}
            {bill.status === "soon" && (
              <BillDueIcon className={"text-content-error w-3.5"} />
            )}
          </span>
        </div>

        <p
          className={`text-preset-4-bold ${bill.status === "paid" ? "text-content-main" : ""} ${bill.status === "soon" ? "text-content-error" : ""} `}
        >
          {formatCurrency(bill.amount)}
        </p>
      </div>
    </li>
  );
}

function RecurringBillSummaryItem({
  textColorTitle = "text-content-secondary",
  textColorText = "text-content-main",
  title,
  amount,
  count,
}) {
  return (
    <li className="flex flex-wrap gap-2 justify-between py-4 first:pt-0 last:pb-0">
      <p className={`text-preset-5 ${textColorTitle}`}>{title}</p>
      <p className={`text-preset-5-bold ${textColorText}`}>
        {count} ({formatCurrency(amount)})
      </p>
    </li>
  );
}
export default RecurringBillsBody;

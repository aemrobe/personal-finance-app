import { useMemo, useState } from "react";

export function useFormSelection({
  isEditSession = false,
  editObject = {},
  allData,
  rawData,
  dataKey,
  matchKey,
  findNextAvailable,
}) {
  const [manualSelection, setManualSelection] = useState(null);

  const derivedSelection = useMemo(() => {
    if (isEditSession && editObject?.[dataKey]) {
      return rawData.find(
        (data) =>
          data[matchKey].toLowerCase() === editObject[dataKey].toLowerCase(),
      );
    }

    const nextAvailableValue = findNextAvailable(allData, rawData);

    return rawData.find(
      (d) => d[matchKey].toLowerCase() === nextAvailableValue?.toLowerCase(),
    );
  }, [
    allData,
    dataKey,
    editObject,
    findNextAvailable,
    isEditSession,
    matchKey,
    rawData,
  ]);

  const selectOption = manualSelection ?? derivedSelection;

  return [selectOption, setManualSelection];
}

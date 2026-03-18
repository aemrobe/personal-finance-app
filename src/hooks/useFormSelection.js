import { useState } from "react";

export function useFormSelection({
  isEditSession,
  editObject,
  allData,
  rawData,
  dataKey,
  matchKey,
  findNextAvailable,
}) {
  const [selectOption, setSelectOption] = useState(() => {
    if (isEditSession && editObject?.[dataKey]) {
      return rawData.find(
        (data) =>
          data[matchKey].toLowerCase() === editObject[dataKey].toLowerCase(),
      );
    }

    const nextAvailableValue = findNextAvailable(allData, rawData);

    return rawData.find(
      (d) => d[matchKey].toLowerCase() === nextAvailableValue.toLowerCase(),
    );
  });

  return [selectOption, setSelectOption];
}

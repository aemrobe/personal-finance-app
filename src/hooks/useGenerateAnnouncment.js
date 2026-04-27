import { useEffect, useState } from "react";
import { ANNOUNCEMENT_DEBOUNCE_MS } from "../utils/constants";

export function useGenerateAnnouncement({
  isLoading,
  count,
  generateAnnouncement,
  searchParams,
  selectedSortByLabel,
}) {
  const [announcement, setAnnouncement] = useState(``);

  useEffect(() => {
    if (isLoading) return;

    const timeout = setTimeout(() => {
      const message = generateAnnouncement({
        count,
        searchTerm: searchParams.get("search") || "",
        sortLabel: selectedSortByLabel,
      });

      setAnnouncement(message);
    }, ANNOUNCEMENT_DEBOUNCE_MS);

    return () => clearTimeout(timeout);
  }, [
    count,
    isLoading,
    searchParams,
    generateAnnouncement,
    selectedSortByLabel,
  ]);

  return { announcement };
}

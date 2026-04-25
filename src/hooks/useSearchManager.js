import { useEffect, useRef, useState } from "react";
import {
  ANNOUNCEMENT_DEBOUNCE_MS,
  SEARCH_DEBOUNCE_MS,
} from "../utils/constants";
import { useSearchParams } from "react-router-dom";

export function useSearchManager({
  resetPageOnSearch = false,
  isLoading,
  selectedSortByLabel,
  count,
  generateAnnouncement,
}) {
  const [announcement, setAnnouncement] = useState(``);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || "",
  );
  const isUserInput = useRef(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      const searchTermToLowerCase = searchTerm?.toLowerCase();

      if (searchTermToLowerCase !== searchParams.get("search")?.toLowerCase()) {
        if (searchTermToLowerCase.trim()) {
          searchParams.set("search", searchTerm);
          if (resetPageOnSearch) searchParams.set("page", 1);
        } else {
          searchParams.delete("search");
        }
      }

      setSearchParams(searchParams);
    }, SEARCH_DEBOUNCE_MS);

    return () => clearTimeout(handler);
  }, [searchTerm, setSearchParams]);

  useEffect(() => {
    const urlSearch = searchParams.get("search") || "";

    if (urlSearch !== searchTerm && !isUserInput.current) {
      setSearchTerm(urlSearch);
    }

    if (urlSearch === searchTerm && isUserInput.current) {
      isUserInput.current = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams.get("search")]);

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

  return {
    announcement,
    searchTerm,
    setSearchTerm,
    searchParams,
    setSearchParams,
    isUserInput,
  };
}

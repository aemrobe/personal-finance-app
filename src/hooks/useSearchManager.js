import { useCallback, useEffect, useRef, useState } from "react";
import { SEARCH_DEBOUNCE_MS } from "../utils/constants";
import { useSearchParams } from "react-router-dom";

export function useSearchManager({ resetPageOnSearch = false }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || "",
  );
  const isUserInput = useRef(false);

  const updateSearch = useCallback((e) => {
    setSearchTerm(e.target.value);
    isUserInput.current = true;
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      const searchTermToLowerCase = searchTerm?.toLowerCase();

      if (searchTermToLowerCase !== searchParams.get("search")?.toLowerCase()) {
        setSearchParams((prev) => {
          const newParams = new URLSearchParams(prev);

          if (searchTermToLowerCase.trim()) {
            newParams.set("search", searchTerm);
            if (resetPageOnSearch) newParams.set("page", 1);
          } else {
            newParams.delete("search");
          }

          return newParams;
        });
      }
    }, SEARCH_DEBOUNCE_MS);

    return () => clearTimeout(handler);
  }, [searchTerm, setSearchParams, resetPageOnSearch]);

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

  return {
    searchTerm,
    searchParams,
    setSearchParams,
    updateSearch,
  };
}

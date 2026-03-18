import { useEffect } from "react";
import { useToast } from "../context/ToastContext";

export function useQueryError(error, featureName) {
  const { onShowToastMessage } = useToast();

  useEffect(
    function () {
      if (error) {
        if (error.message !== "Failed to fetch") {
          onShowToastMessage({
            text: `Error Loading ${featureName}: ${error.message}`,
          });
        }
      }
    },
    [error, featureName, onShowToastMessage],
  );
}

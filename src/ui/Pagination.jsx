import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../utils/constants";
import PaginationButton from "./PaginationButton";
import PaginationNumber from "./PaginationNumber";
import { useEffect, useState } from "react";

function Pagination({ count }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const pageNumber = searchParams.get("page");

  const currentPage = !pageNumber ? 1 : Number(pageNumber);

  const pageCount = Math.ceil(count / PAGE_SIZE);

  const handlePageChange = function (page) {
    searchParams.set("page", page);

    setSearchParams(searchParams);
  };

  const nextPage = function () {
    const nextPage = currentPage === pageCount ? pageCount : currentPage + 1;

    handlePageChange(nextPage);
  };

  const prevPage = function () {
    const prevPage = currentPage === 1 ? currentPage : currentPage - 1;

    handlePageChange(prevPage);
  };

  const renderPageNumbers = () => {
    if (pageCount < 5) {
      return Array.from({ length: pageCount }, (_, i) => i + 1).map((num) => (
        <PaginationNumber
          key={num}
          isActive={currentPage === num}
          onClick={() => handlePageChange(num)}
        >
          {num}
        </PaginationNumber>
      ));
    }

    const renderDesktop = () => {
      let startPage = Math.max(1, currentPage - 2);
      let endPage = startPage + 4;

      if (endPage > pageCount) {
        endPage = pageCount;
        startPage = pageCount - 4;
      }

      const desktopPages = [];
      for (let i = startPage; i <= endPage; i++) {
        desktopPages.push(
          <PaginationNumber
            key={`desktop-${i}`}
            isActive={currentPage === i}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </PaginationNumber>,
        );
      }

      return desktopPages;
    };

    const renderMobile = () => {
      const isNearEnd = currentPage >= pageCount - 1;

      let slot2, slot3;
      if (!isNearEnd) {
        slot2 = currentPage === 1 ? 2 : currentPage;
        slot3 = "...";
      } else {
        slot2 = "...";
        slot3 = currentPage === pageCount ? pageCount - 1 : currentPage;
      }

      const mobileSlots = [1, slot2, slot3, pageCount];

      return mobileSlots.map((label, index) => {
        const isEllipsis = label === "...";

        return (
          <PaginationNumber
            key={`mobile-${index}`}
            isEllipsis={isEllipsis}
            isActive={currentPage === label}
            onClick={() => !isEllipsis && handlePageChange(label)}
          >
            {label}
          </PaginationNumber>
        );
      });
    };

    return (
      <>
        <PaginatedNumberContainer className={"hidden md:flex"}>
          {renderDesktop()}
        </PaginatedNumberContainer>

        <PaginatedNumberContainer className={"md:hidden"}>
          {renderMobile()}
        </PaginatedNumberContainer>
      </>
    );
  };

  if (pageCount <= 1 || !pageCount) return null;

  return (
    <div className="flex justify-between pt-6 mt-6">
      <PaginationButton
        buttonText={"Prev"}
        onClick={prevPage}
        isDisabled={currentPage === 1}
      />

      <div className="flex items-center gap-2">{renderPageNumbers()}</div>

      <PaginationButton
        buttonText={"Next"}
        onClick={nextPage}
        isDisabled={currentPage === pageCount}
      />
    </div>
  );
}

function PaginatedNumberContainer({ children, className }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>{children}</div>
  );
}
export default Pagination;

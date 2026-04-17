import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../utils/constants";
import PaginationButton from "./PaginationButton";
import PaginationNumber from "./PaginationNumber";

function Pagination({ count }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const pageNumber = searchParams.get("page");

  const currentPage = !pageNumber ? 1 : Number(pageNumber);

  const pageCount = Math.ceil(count / PAGE_SIZE);

  const nextPage = function () {
    const nextPage = currentPage === pageCount ? pageCount : currentPage + 1;

    searchParams.set("page", nextPage);

    setSearchParams(searchParams);
  };

  const prevPage = function () {
    const prevPage = currentPage === 1 ? currentPage : currentPage - 1;

    searchParams.set("page", prevPage);

    setSearchParams(searchParams);
  };

  const isActive = false;

  return (
    <div className="flex justify-between pt-6 mt-6">
      <PaginationButton buttonText={"Prev"} onClick={prevPage} />

      <div className="flex items-center gap-2">
        <PaginationNumber>1</PaginationNumber>
        <PaginationNumber>2</PaginationNumber>
        <PaginationNumber>3</PaginationNumber>
      </div>

      <PaginationButton buttonText={"Next"} onClick={nextPage} />
    </div>
  );
}

export default Pagination;

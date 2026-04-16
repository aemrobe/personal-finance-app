import PaginationButton from "./PaginationButton";

function Pagination() {
  return (
    <div className="flex justify-between pt-6 mt-6">
      <PaginationButton buttonText={"Prev"} />
      <PaginationButton buttonText={"Next"} />
    </div>
  );
}

export default Pagination;

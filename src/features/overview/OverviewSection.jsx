import Button from "../../ui/Button";
import { CaretRightIcon } from "../../ui/Icons";

function OverviewSection({ title, buttonText, children, onClick }) {
  return (
    <section className="bg-surface-primary py-6 px-5 rounded-xl ">
      <div className="flex items-center justify-between">
        <h2 className="text-preset-2 text-content-main ">{title}</h2>

        <Button
          icon={<CaretRightIcon className={"h-2.75"} />}
          disabled=""
          variant={"tertiary"}
          onClick={onClick}
        >
          {buttonText}
        </Button>
      </div>

      {children}
    </section>
  );
}

export default OverviewSection;

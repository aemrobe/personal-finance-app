import PageHeader from "../../ui/PageHeader";
import PageTitle from "../../ui/PageTitle";
import SpinnerMiniContainer from "../../ui/SpinnerMiniContainer";
import { useLogout } from "../authentication/useLogout";

function OverviewHeader() {
  const { logout, isLoading } = useLogout();

  return (
    <PageHeader>
      <PageTitle title={"Overview"} headingId="overview-title-id" />

      <button
        onClick={() => {
          logout();
        }}
        disabled={isLoading}
        className="
        disabled:cursor-not-allowed
       disabled:pointer-events-auto;
        text-preset-4 text-content-secondary bg-transparent
        hover:text-content-main hover:bg-surface-tertiary-hover
    hover:cursor-pointer
        px-4 py-2 rounded-lg 
        transition-all duration-500 
        focusable-ring 
        lg:hidden
        relative
      "
      >
        {isLoading && <SpinnerMiniContainer />}

        <span className={`${isLoading ? "opacity-0" : "opacity-100"}`}>
          Sign Out
        </span>
      </button>
    </PageHeader>
  );
}

export default OverviewHeader;

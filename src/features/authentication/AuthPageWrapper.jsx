import { useEffect, useRef } from "react";
import { FOCUS_DELAY } from "../../utils/constants";
import LargeLogoIcon from "../../ui/Icons/LargeLogoIcon";

function AuthPageWrapper({ title, children }) {
  const pageTitle = useRef(null);

  useEffect(function () {
    const timer = setTimeout(function () {
      pageTitle.current?.focus();
    }, FOCUS_DELAY);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col xl:flex-row-reverse xl:items-center xl:max-w-360 mx-auto xl:p-5 min-h-screen">
      <div className="bg-surface-inverse py-6 rounded-b-lg xl:hidden mb-4">
        <LargeLogoIcon
          role="img"
          aria-label="Finance app"
          className={"w-30.5 text-content-inverse mx-auto"}
        />
      </div>

      <div
        className={`my-auto  bg-surface-primary rounded-xl mx-auto max-w-92.75 w-[91.5%] py-6 px-5 md:p-8 md:max-w-140`}
      >
        <h1
          ref={pageTitle}
          tabIndex="-1"
          className="capitalize outline-none text-preset-1  mb-8"
        >
          {title}
        </h1>

        {children}
      </div>

      <div
        className={
          "hidden w-140  illustration rounded-xl p-10 xl:flex flex-col self-stretch"
        }
      >
        <LargeLogoIcon
          role="img"
          aria-label="Finance app"
          className={"w-30.5 text-content-inverse"}
        />

        <h2 className="text-preset-1 text-content-inverse mt-auto max-w-md">
          Keep track of your money and save for your future
        </h2>

        <p className="text-preset-4 text-content-inverse mt-6">
          Personal finance app puts you in control of your spending. Track
          transactions, set budgets, and add to savings pots easily.
        </p>
      </div>
    </div>
  );
}

export default AuthPageWrapper;

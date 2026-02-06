import { useEffect, useRef } from "react";
import logo from "../../assets/images/logo-large.svg";
import { FOCUS_DELAY } from "../../utils/constants";

function AuthPageWrapper({ title, marginTop, children }) {
  const pageTitle = useRef(null);

  useEffect(function () {
    const timer = setTimeout(function () {
      pageTitle.current?.focus();
    }, FOCUS_DELAY);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <div className="bg-surface-inverse py-6 rounded-b-lg">
        <img src={logo} className="block mx-auto" alt="Logo" />
      </div>

      <div
        className={`${marginTop} bg-surface-primary rounded-xl mx-auto max-w-92.75 w-[91.5%] py-6 px-5`}
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
    </div>
  );
}

export default AuthPageWrapper;

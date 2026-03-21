import { useEffect, useRef } from "react";

function PageTitle({ title, headingId }) {
  const pageTitle = useRef(null);

  useEffect(function () {
    pageTitle.current.focus();
  }, []);

  return (
    <h1
      ref={pageTitle}
      tabIndex="-1"
      id={headingId}
      className="outline-none text-preset-1 text-content-main capitalize"
    >
      {title}
    </h1>
  );
}

export default PageTitle;

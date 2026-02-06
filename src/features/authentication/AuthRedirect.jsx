import { NavLink } from "react-router-dom";

function AuthRedirect({ text, linkName, path }) {
  const descriptionId = "auth-redirect-description";

  return (
    <div className="flex flex-wrap gap-2 justify-center mt-8">
      <p
        id={descriptionId}
        className="text-preset-4 text-content-secondary text-center"
      >
        {text}
      </p>

      <NavLink
        aria-describedby={descriptionId}
        className={
          "focusable-ring relative auth-redirect-link text-preset-4-bold capitalize"
        }
        to={path}
      >
        {linkName}
      </NavLink>
    </div>
  );
}

export default AuthRedirect;

import Button from "./Button";
import Modal from "./Modal";

function EmptyMessage({
  icon,
  title,
  text,
  titleId = "",
  contentId = "",
  action: Action,
  actionText,
  modalName,
  returnToSelector,
  className = "min-h-100 w-full",
  shadowOfTheBox = "shadow-md",
  as: Heading = "h2",
}) {
  const headingUniqueId = Action ? "empty-title" : titleId;
  const contentUniqueId = Action ? "empty-text" : contentId;

  return (
    <div
      className={`flex items-center justify-center animate-fade-in ${className}`}
    >
      <section
        className={`bg-surface-primary max-w-lg rounded-xl ${shadowOfTheBox} p-8 flex flex-col items-center`}
      >
        {icon && (
          <span className="text-5xl mb-6 transform hover:scale-110 transition-transform cursor-default duration-100">
            {icon}
          </span>
        )}

        <Heading
          id={headingUniqueId}
          tabIndex={"-1"}
          className="text-preset-2 mb-3 text-center text-content-main outline-none"
        >
          {title}
        </Heading>

        <p
          id={contentUniqueId}
          className="text-preset-4 mb-8 text-center text-content-secondary break-all leading-relaxed"
        >
          {text}
        </p>

        {Action && (
          <>
            <Modal.Open
              modalName={modalName}
              returnToSelector={returnToSelector}
            >
              <Button
                variant={"primary"}
                aria-describedby={`${headingUniqueId} ${contentUniqueId}`}
                isActionButton={true}
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                {actionText}
              </Button>
            </Modal.Open>
          </>
        )}
      </section>
    </div>
  );
}

export default EmptyMessage;

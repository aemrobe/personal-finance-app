import Button from "./Button";
import Modal from "./Modal";

function EmptyMessage({
  icon,
  title,
  text,
  action: Action,
  actionText,
  modalName,
  titleId,
  contentId,
  className = "min-h-100 h-[60vh]",
  shadowOfTheBox = "shadow-md",
  as: Heading = "h2",
  ...props
}) {
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
          id="empty-title"
          tabIndex={"-1"}
          className="text-preset-2 mb-3 text-center text-content-main outline-none"
        >
          {title}
        </Heading>

        <p
          id="empty-text"
          className="text-preset-4 mb-8 text-center text-content-secondary break-all leading-relaxed"
        >
          {text}
        </p>

        {Action && (
          <>
            <Modal.Open modalName={modalName}>
              <Button
                variant={"primary"}
                aria-describedby="empty-title empty-text"
                isActionButton={true}
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                {actionText}
              </Button>
            </Modal.Open>

            <Modal.Window
              titleId={titleId}
              contentId={contentId}
              modalName={modalName}
            >
              <Action {...props} />
            </Modal.Window>
          </>
        )}
      </section>
    </div>
  );
}

export default EmptyMessage;

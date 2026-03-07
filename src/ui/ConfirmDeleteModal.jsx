import Button from "./Button";
import ModalText from "./ModalText";
import ModalTitle from "./ModalTitle";

function ConfirmDeleteModal({
  titleId,
  contentId,
  onCloseModal,
  restoreFocus,
  title,
  content,
  onConfirm,
  isDeleting,
}) {
  return (
    <>
      <ModalTitle
        titleId={titleId}
        title={`Delete ‘${title}’`}
        className={"mt-1 mb-6 capitalize"}
      />

      <ModalText contentId={contentId} content={content} className="mb-5" />

      <Button
        isLoading={isDeleting}
        onClick={() => {
          onConfirm(onCloseModal);
        }}
        isActionButton={true}
        variant={"destroy"}
        className={"w-full mb-5"}
      >
        Yes, Confirm Deletion
      </Button>
      <Button
        disabled={isDeleting}
        onClick={() => {
          onCloseModal();
          restoreFocus();
        }}
        variant={"tertiary"}
        className={"w-full"}
      >
        No, I want to go back
      </Button>
    </>
  );
}

export default ConfirmDeleteModal;

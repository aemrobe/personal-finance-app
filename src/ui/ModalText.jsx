function ModalText({ contentId, content, className }) {
  return (
    <p
      id={contentId}
      className={`text-preset-4 text-content-secondary ${className}`}
    >
      {content}
    </p>
  );
}

export default ModalText;

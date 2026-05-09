function ModalTitle({ titleId, title, className }) {
  return (
    <h3
      id={titleId}
      className={`text-preset-2 md:text-preset-1 text-content-main  pr-15.5 ${className}`}
    >
      {`${title}`}
    </h3>
  );
}

export default ModalTitle;

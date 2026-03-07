function ModalOverlay({ children }) {
  return <div className="fixed z-40 inset-0 bg-black/15">{children}</div>;
}

export default ModalOverlay;

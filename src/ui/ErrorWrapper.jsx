function ErrorWrapper({ children }) {
  return (
    <div className=" flex items-center justify-center min-h-100 h-[60vh] animate-fade-in">
      {children}
    </div>
  );
}

export default ErrorWrapper;

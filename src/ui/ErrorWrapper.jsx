function ErrorWrapper({ children }) {
  return (
    <div className=" flex items-center justify-center min-h-100 mt-35 animate-fade-in">
      {children}
    </div>
  );
}

export default ErrorWrapper;

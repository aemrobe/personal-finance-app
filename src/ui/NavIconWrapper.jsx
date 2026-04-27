function NavIconWrapper({ children, className, size = "size-6" }) {
  return (
    <div
      className={`flex items-center justify-center  ${size} ${className} `}
      aria-hidden={true}
    >
      {children}
    </div>
  );
}

export default NavIconWrapper;

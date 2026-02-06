function NavIconWrapper({ children, className }) {
  return (
    <div className={`flex items-center justify-center  size-6 ${className} `}>
      {children}
    </div>
  );
}

export default NavIconWrapper;

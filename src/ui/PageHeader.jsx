function PageHeader({ children }) {
  return (
    <div className="py-[0.0937rem]  mb-8 flex flex-wrap items-center justify-between">
      {children}
    </div>
  );
}

export default PageHeader;

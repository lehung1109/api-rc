interface ClientComponentWrapperProps {
  children: React.ReactNode;
  className?: string;
}

const ClientComponentWrapper = ({
  children,
  className,
}: ClientComponentWrapperProps) => {
  return (
    <>
      <div
        dangerouslySetInnerHTML={{
          __html: "<!-- start using client component wrapper -->",
        }}
      />
      <div className={className}>{children}</div>
      <div
        dangerouslySetInnerHTML={{
          __html: "<!-- end using client component wrapper -->",
        }}
      />
    </>
  );
};

export default ClientComponentWrapper;

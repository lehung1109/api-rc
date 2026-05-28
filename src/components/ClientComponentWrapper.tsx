import ReactSection from "./ReactSection";

interface ClientComponentWrapperProps {
  children: React.ReactNode;
  className?: string;
  type: string;
  hydrateData: unknown;
}

const ClientComponentWrapper = ({
  children,
  className,
  type,
  hydrateData,
}: ClientComponentWrapperProps) => {
  return (
    <>
      <div
        dangerouslySetInnerHTML={{
          __html: "<!-- start using client component wrapper -->",
        }}
      />
      <div className={className}>{children}</div>
      <ReactSection type={type} data={hydrateData} />
      <div
        dangerouslySetInnerHTML={{
          __html: "<!-- end using client component wrapper -->",
        }}
      />
    </>
  );
};

export default ClientComponentWrapper;

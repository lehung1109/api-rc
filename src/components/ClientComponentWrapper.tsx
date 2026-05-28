import ReactSection from "./ReactSection";

import { stableHashHex } from "@/lib/stable-hash";

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
  const isBrowser = globalThis.window !== undefined;

  let islandHash = "";
  try {
    islandHash = stableHashHex(JSON.stringify({ type, hydrateData }));
  } catch {
    islandHash = stableHashHex(JSON.stringify({ type }));
  }
  const targetId = `rc-island-${islandHash}`;

  return (
    <>
      <div
        dangerouslySetInnerHTML={{
          __html: "<!-- start using client component wrapper -->",
        }}
      />
      <div
        id={targetId}
        className={className}
        data-rc-island={type}
        dangerouslySetInnerHTML={
          isBrowser
            ? undefined
            : {
                __html: "",
              }
        }
      >
        {isBrowser ? children : null}
      </div>
      <ReactSection type={type} data={hydrateData} targetId={targetId} />
      <div
        dangerouslySetInnerHTML={{
          __html: "<!-- end using client component wrapper -->",
        }}
      />
    </>
  );
};

export default ClientComponentWrapper;

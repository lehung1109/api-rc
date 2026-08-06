import { cn } from "@/lib/utils";

import ClientComponentWrapper from "../ClientComponentWrapper";
import KeyPersonnel, { type KeyPersonnelModel } from "./KeyPersonnel";

export type { KeyPersonnelModel };

const KeyPersonnelWrapper = (model: KeyPersonnelModel) => {
  const { className, title, items } = model;

  const validItems = items.filter(
    (item) => item.image?.url?.trim() && item.title?.trim(),
  );
  const sectionTitle = title.trim();

  if (validItems.length === 0 && !sectionTitle) {
    return null;
  }

  return (
    <ClientComponentWrapper
      className={cn("key-personnel-root", className)}
      type="keyPersonnel"
      hydrateData={model}
    >
      <KeyPersonnel {...model} />
    </ClientComponentWrapper>
  );
};

export default KeyPersonnelWrapper;

import { cn } from "@/lib/utils";

import ClientComponentWrapper from "../ClientComponentWrapper";
import CustomerTestimonialsGrid, {
  type CustomerTestimonialsItemModel,
  type CustomerTestimonialsModel,
} from "./CustomerTestimonialsGrid";

export type { CustomerTestimonialsItemModel, CustomerTestimonialsModel };

const hasValidItem = (item: CustomerTestimonialsItemModel): boolean =>
  Boolean(item.youtubeVideoId.trim() && item.image.url.trim());

const CustomerTestimonialsWrapper = (model: CustomerTestimonialsModel) => {
  const { className, items } = model;

  const validItems = items.filter(hasValidItem);

  if (validItems.length === 0) {
    return null;
  }

  const hydrateModel: CustomerTestimonialsModel = {
    ...model,
    items: validItems,
  };

  return (
    <section
      className={cn(
        "customer-testimonials mx-auto w-full max-w-7xl",
        className,
      )}
    >
      <ClientComponentWrapper
        className="customer-testimonials-grid-root"
        type="customerTestimonialsGrid"
        hydrateData={hydrateModel}
      >
        <CustomerTestimonialsGrid {...hydrateModel} />
      </ClientComponentWrapper>
    </section>
  );
};

export default CustomerTestimonialsWrapper;

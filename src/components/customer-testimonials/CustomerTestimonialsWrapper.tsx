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
  const { className, title, description, items } = model;

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
        "customer-testimonials mx-auto w-full max-w-7xl px-4 py-8",
        className,
      )}
    >
      <header className="customer-testimonials-header mb-8">
        <h2 className="customer-testimonials-title text-center text-2xl font-bold text-brand-gold">
          {title}
        </h2>
        {description.trim() ? (
          <p className="customer-testimonials-description mx-auto mt-2 max-w-3xl text-center text-sm text-neutral-600">
            {description}
          </p>
        ) : null}
      </header>

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

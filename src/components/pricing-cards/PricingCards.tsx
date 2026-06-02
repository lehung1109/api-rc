import { cn } from "@/lib/utils";
import type { LinkModel } from "../link/Link";
import Link from "../link/Link";

export interface PricingCardsItemModel {
  title: string;
  price: string;
  htmlText: string;
  buttonLabel: string;
  buttonLink: LinkModel;
  active?: boolean;
}

export interface PricingCardsModel {
  className?: string;
  items: PricingCardsItemModel[];
}

const PricingCards = (model: PricingCardsModel) => {
  const { className, items } = model;

  if (items.length === 0) return null;

  return (
    <section className={cn("pricing-cards w-full", className)}>
      <div className="pricing-cards-grid grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {items.map((item, index) => {
          const titleText = item.title.trim();
          const priceText = item.price.trim();
          const htmlTextContent = item.htmlText.trim();
          const hasButton =
            item.buttonLabel.trim().length > 0 &&
            item.buttonLink.url.trim().length > 0;
          const isActive = Boolean(item.active);

          return (
            <article
              key={`${titleText || "pricing"}-${index}`}
              className={cn(
                "pricing-cards-card group relative flex h-full flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-xl",
                isActive &&
                  "pricing-cards-card--active z-10 -translate-y-2 border-[#f36f21]/40 shadow-xl ring-2 ring-[#f36f21]/70",
              )}
            >
              <div
                className={cn(
                  "pricing-cards-title bg-neutral-900 px-4 py-3 text-center text-base font-semibold text-white",
                  isActive && "bg-[#f36f21]",
                )}
              >
                {titleText}
              </div>

              <div className="pricing-cards-content flex flex-1 flex-col px-4 py-4">
                <div className="pricing-cards-price text-center text-2xl font-bold text-[#d6a34e]">
                  {priceText}
                </div>

                <div
                  className="pricing-cards-body mt-4 border-b border-neutral-200 pb-4 text-sm leading-6 text-neutral-600"
                  dangerouslySetInnerHTML={{ __html: htmlTextContent }}
                />

                {hasButton ? (
                  <div className="pricing-cards-button-wrapper mt-5 flex justify-center">
                    <Link
                      {...item.buttonLink}
                      className={cn(
                        "pricing-cards-button inline-flex items-center justify-center rounded-full bg-[#f36f21] px-6 py-2 text-sm font-semibold text-white shadow no-underline transition-colors hover:bg-[#ff7f2a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f36f21]/60",
                        item.buttonLink.className,
                      )}
                    >
                      {item.buttonLabel}
                    </Link>
                  </div>
                ) : null}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default PricingCards;

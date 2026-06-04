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
      <div className="pricing-cards-grid grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 items-start">
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
                "pricing-cards-card group relative overflow-hidden rounded-xl border border-brand-navy bg-brand-white shadow-md shadow-brand-navy/25 transition-shadow duration-200 hover:shadow-lg hover:shadow-brand-navy/30",
                isActive &&
                  "pricing-cards-card--active border-2 border-brand-gold -top-3.5",
              )}
            >
              <div
                className={cn(
                  "pricing-cards-title bg-brand-navy px-[10px] py-[20px] text-center text-[20px] font-semibold text-brand-white",
                  isActive && "bg-brand-gold",
                )}
              >
                {titleText}
              </div>

              <div className="pricing-cards-content">
                <div
                  className={cn(
                    "pricing-cards-price text-center text-2xl font-bold text-brand-gold px-2.5 py-3 bg-brand-navy",
                    isActive && "bg-brand-gold text-brand-gold-hover",
                  )}
                >
                  {priceText}
                </div>

                <div
                  className="pricing-cards-body mt-4 border-b border-brand-white-hover p-4 leading-6 text-brand-navy/70"
                  dangerouslySetInnerHTML={{ __html: htmlTextContent }}
                />

                {hasButton ? (
                  <div className="pricing-cards-button-wrapper mt-5 justify-center text-center mb-4">
                    <Link
                      {...item.buttonLink}
                      className={cn(
                        "pricing-cards-button inline-flex items-center justify-center rounded-full bg-brand-gold px-6 py-2 font-semibold text-brand-white shadow no-underline transition-colors hover:bg-brand-gold-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/60",
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

import { cn } from "@/lib/utils";
import { footerColumnTitleClass } from "./FooterLinkColumn";

export interface FooterFanpageEmbedModel {
  embedHtml: string;
}

export interface FooterFanpagesModel {
  factories: { title: string; contentHtml: string };
  fanpageTitle?: string;
  embeds: FooterFanpageEmbedModel[];
  className?: string;
}

const FooterFanpages = (model: FooterFanpagesModel) => {
  const {
    factories,
    fanpageTitle = "Fanpage Chính Thức",
    embeds,
    className,
  } = model;

  return (
    <div className={cn("footer-fanpages min-w-0 space-y-6", className)}>
      {factories.contentHtml ? (
        <div className="footer-factories">
          <h3
            className={cn("footer-factories-title", footerColumnTitleClass)}
          >
            {factories.title}
          </h3>
          <div
            className="footer-factories-content mt-2 text-sm leading-relaxed text-white/90 [&>p]:!mbe-0"
            dangerouslySetInnerHTML={{ __html: factories.contentHtml }}
          />
        </div>
      ) : null}

      {embeds.length > 0 ? (
        <div className="footer-fanpage-widgets">
          <h3
            className={cn("footer-fanpage-widgets-title", footerColumnTitleClass)}
          >
            {fanpageTitle}
          </h3>
          <div className="footer-fanpage-embeds mt-3 space-y-4">
            {embeds.map((embed, index) => (
              <div
                key={index}
                className="footer-fanpage-embed max-w-full overflow-hidden rounded bg-white/5"
                dangerouslySetInnerHTML={{ __html: embed.embedHtml }}
              />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default FooterFanpages;

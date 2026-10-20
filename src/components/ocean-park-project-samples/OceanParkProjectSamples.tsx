"use client";

import { ArrowRight, Building2, Layers } from "lucide-react";
import { useMemo, useState } from "react";

import { cn } from "@/lib/utils";
import type { LinkModel } from "../link/Link";
import Link from "../link/Link";
import type { MediaModel } from "../media/Media";
import Media from "../media/Media";

export interface OceanParkFilterTabModel {
  id: string;
  label: string;
}

export interface OceanParkProjectCardModel {
  title: string;
  zoneId: string;
  zoneLabel: string;
  towerLabel: string;
  unitTypeId: string;
  unitTypeLabel: string;
  area: string;
  apartmentCode: string;
  style: string;
  budget: string;
  summary: string;
  image: MediaModel;
  detailLink: LinkModel;
  isRealProject?: boolean;
}

export interface OceanParkProjectCtaBannerModel {
  title: string;
  description: string;
  buttonLabel: string;
  buttonLink: LinkModel;
}

export interface OceanParkProjectSamplesModel {
  className?: string;
  eyebrow: string;
  title: string;
  description: string;
  zoneTabs: OceanParkFilterTabModel[];
  unitTypeTabs: OceanParkFilterTabModel[];
  featuredProjects: OceanParkProjectCardModel[];
  ctaBanner: OceanParkProjectCtaBannerModel;
}

const OceanParkProjectSamples = (model: OceanParkProjectSamplesModel) => {
  const {
    className,
    eyebrow,
    title,
    description,
    zoneTabs,
    unitTypeTabs,
    featuredProjects,
    ctaBanner,
  } = model;

  const [activeZone, setActiveZone] = useState<string>("all");
  const [activeUnitType, setActiveUnitType] = useState<string>("all");

  const validProjects = useMemo(
    () =>
      featuredProjects.filter(
        (item) =>
          item.title.trim().length > 0 && item.image.url.trim().length > 0,
      ),
    [featuredProjects],
  );

  const filteredProjects = useMemo(() => {
    return validProjects.filter((item) => {
      const matchZone = activeZone === "all" || item.zoneId === activeZone;
      const matchUnit =
        activeUnitType === "all" || item.unitTypeId === activeUnitType;
      return matchZone && matchUnit;
    });
  }, [validProjects, activeZone, activeUnitType]);

  const displayProjects =
    filteredProjects.length > 0 ? filteredProjects : validProjects;

  if (validProjects.length === 0 && !title.trim()) {
    return null;
  }

  return (
    <section
      id="du-an-mau-ocean-park"
      className={cn(
        "ocean-park-project-samples !w-full !bg-brand-white-hover/40 !px-4 !py-10 !text-brand-navy md:!px-6 md:!py-16",
        className,
      )}
    >
      <div className="ocean-park-project-samples-inner !mx-auto !w-full !max-w-7xl">
        <div className="ocean-park-project-samples-header !mx-auto !max-w-3xl !text-center">
          {eyebrow.trim() ? (
            <p className="ocean-park-project-samples-eyebrow !mb-2 !text-xs !font-bold !uppercase !tracking-widest !text-brand-gold md:!text-sm">
              {eyebrow}
            </p>
          ) : null}
          {title.trim() ? (
            <h2 className="ocean-park-project-samples-title !text-2xl !font-bold !leading-snug !text-brand-navy md:!text-3xl lg:!text-4xl">
              {title}
            </h2>
          ) : null}
          {description.trim() ? (
            <p className="ocean-park-project-samples-desc !mt-3 !text-sm !leading-relaxed !text-brand-navy/75 md:!text-base">
              {description}
            </p>
          ) : null}
        </div>

        {zoneTabs.length > 0 ? (
          <div
            className="ocean-park-zone-tabs !mt-6 !flex !flex-nowrap !items-center !gap-2 !overflow-x-auto !pb-2 md:!justify-center md:!flex-wrap"
            role="tablist"
            aria-label="Lọc theo phân khu và tòa căn hộ"
          >
            {zoneTabs.map((tab) => {
              const isActive = activeZone === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  data-zone-tab={tab.id}
                  onClick={() => setActiveZone(tab.id)}
                  className={cn(
                    "ocean-park-zone-tab !inline-flex !shrink-0 !cursor-pointer !items-center !gap-1.5 !rounded-full !border !px-4 !py-2 !text-xs !font-semibold !transition-colors md:!text-sm",
                    isActive
                      ? "!border-brand-navy !bg-brand-navy !text-brand-gold !shadow-sm"
                      : "!border-brand-navy/20 !bg-brand-white !text-brand-navy hover:!border-brand-gold hover:!text-brand-gold",
                  )}
                >
                  <Building2
                    className="!h-3.5 !w-3.5 !shrink-0"
                    aria-hidden="true"
                  />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        ) : null}

        {unitTypeTabs.length > 0 ? (
          <div
            className="ocean-park-unit-tabs !mt-2 !flex !flex-nowrap !items-center !gap-2 !overflow-x-auto !pb-2 md:!justify-center md:!flex-wrap"
            role="tablist"
            aria-label="Lọc theo loại căn hộ"
          >
            {unitTypeTabs.map((tab) => {
              const isActive = activeUnitType === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  data-unit-tab={tab.id}
                  onClick={() => setActiveUnitType(tab.id)}
                  className={cn(
                    "ocean-park-unit-tab !inline-flex !shrink-0 !cursor-pointer !items-center !gap-1.5 !rounded-full !border !px-3.5 !py-1.5 !text-xs !font-medium !transition-colors",
                    isActive
                      ? "!border-brand-gold !bg-brand-gold !text-brand-white"
                      : "!border-brand-navy/15 !bg-brand-white/80 !text-brand-navy/80 hover:!border-brand-gold",
                  )}
                >
                  <Layers className="!h-3 !w-3 !shrink-0" aria-hidden="true" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        ) : null}

        <div className="ocean-park-project-cards !mt-6 !flex !flex-nowrap !gap-4 !overflow-x-auto !pb-4 !snap-x !snap-mandatory md:!grid md:!grid-cols-2 md:!gap-6 md:!overflow-visible lg:!grid-cols-3">
          {displayProjects.map((project, index) => (
            <article
              key={`${project.apartmentCode}-${index}`}
              data-zone-id={project.zoneId}
              data-unit-type-id={project.unitTypeId}
              className="ocean-park-project-card !flex !w-[85%] !shrink-0 !snap-start !flex-col !overflow-hidden !rounded-2xl !border !border-brand-navy/10 !bg-brand-white !shadow-md !transition-shadow hover:!shadow-xl md:!w-auto"
            >
              <div className="ocean-park-project-card-media !relative !aspect-[16/10] !w-full !overflow-hidden !bg-brand-navy/10">
                <Media
                  {...project.image}
                  className="!h-full !w-full !object-cover !transition-transform !duration-500 hover:!scale-105"
                />
                <div className="!absolute !top-3 !left-3 !flex !flex-wrap !gap-1.5">
                  <span className="!rounded-full !bg-brand-navy/90 !px-3 !py-1 !text-xs !font-bold !text-brand-gold">
                    {project.zoneLabel}
                  </span>
                  {project.towerLabel.trim() ? (
                    <span className="!rounded-full !bg-brand-gold !px-2.5 !py-1 !text-xs !font-bold !text-brand-white">
                      {project.towerLabel}
                    </span>
                  ) : null}
                </div>
                <div className="!absolute !right-3 !bottom-3 !rounded-lg !bg-brand-navy/85 !px-2.5 !py-1 !text-xs !font-semibold !text-brand-white">
                  {project.area} • {project.apartmentCode}
                </div>
              </div>

              <div className="ocean-park-project-card-body !flex !flex-1 !flex-col !p-4 md:!p-5">
                <div className="!flex !items-center !justify-between !gap-2 !text-xs !font-semibold !text-brand-gold">
                  <span>{project.unitTypeLabel}</span>
                  <span>{project.style}</span>
                </div>

                <h3 className="ocean-park-project-card-title !mt-1.5 !text-base !font-bold !leading-snug !text-brand-navy md:!text-lg">
                  {project.title}
                </h3>

                <p className="ocean-park-project-card-summary !mt-2 !flex-1 !text-xs !leading-relaxed !text-brand-navy/75 md:!text-sm">
                  {project.summary}
                </p>

                <div className="!mt-4 !flex !items-center !justify-between !border-t !border-brand-navy/10 !pt-3">
                  <div>
                    <span className="!block !text-[11px] !uppercase !text-brand-navy/60">
                      Mức đầu tư tham khảo
                    </span>
                    <strong className="!text-sm !font-bold !text-brand-navy">
                      {project.budget}
                    </strong>
                  </div>

                  <Link
                    {...project.detailLink}
                    className="!inline-flex !items-center !gap-1 !rounded-full !bg-brand-navy !px-3.5 !py-1.5 !text-xs !font-semibold !text-brand-gold !no-underline !transition-colors hover:!bg-brand-gold hover:!text-brand-white"
                  >
                    <span>Nhận bản vẽ 3D</span>
                    <ArrowRight className="!h-3.5 !w-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {ctaBanner.title.trim() ? (
          <div className="ocean-park-project-cta-banner !mt-6 !flex !flex-col !items-center !justify-between !gap-4 !rounded-2xl !bg-brand-navy !p-5 !text-brand-white md:!flex-row md:!p-7">
            <div>
              <h3 className="!text-lg !font-bold !text-brand-gold md:!text-xl">
                {ctaBanner.title}
              </h3>
              <p className="!mt-1 !mb-0 !text-xs !text-brand-white-hover md:!text-sm">
                {ctaBanner.description}
              </p>
            </div>
            {ctaBanner.buttonLabel.trim() && ctaBanner.buttonLink.url.trim() ? (
              <Link
                {...ctaBanner.buttonLink}
                className="!inline-flex !shrink-0 !items-center !justify-center !rounded-full !bg-brand-gold !px-6 !py-2.5 !text-sm !font-bold !uppercase !text-brand-white !no-underline !transition-colors hover:!bg-brand-gold-hover"
              >
                {ctaBanner.buttonLabel}
              </Link>
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default OceanParkProjectSamples;

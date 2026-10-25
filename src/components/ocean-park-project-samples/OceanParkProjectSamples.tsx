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

  const eyebrowText = (eyebrow ?? "").trim();
  const titleText = (title ?? "").trim();
  const descText = (description ?? "").trim();

  const [activeZone, setActiveZone] = useState<string>("all");
  const [activeUnitType, setActiveUnitType] = useState<string>("all");

  const validZoneTabs = useMemo(
    () =>
      (zoneTabs ?? []).filter(
        (tab) =>
          Boolean(tab) &&
          (tab.id ?? "").trim().length > 0 &&
          (tab.label ?? "").trim().length > 0,
      ),
    [zoneTabs],
  );

  const validUnitTypeTabs = useMemo(
    () =>
      (unitTypeTabs ?? []).filter(
        (tab) =>
          Boolean(tab) &&
          (tab.id ?? "").trim().length > 0 &&
          (tab.label ?? "").trim().length > 0,
      ),
    [unitTypeTabs],
  );

  const validProjects = useMemo(
    () =>
      (featuredProjects ?? []).filter(
        (item) =>
          Boolean(item) &&
          (item.title ?? "").trim().length > 0 &&
          (item.image?.url ?? "").trim().length > 0,
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

  const isFallbackList =
    filteredProjects.length === 0 && validProjects.length > 0;
  const displayProjects =
    filteredProjects.length > 0 ? filteredProjects : validProjects;

  if (validProjects.length === 0 && !titleText) {
    return null;
  }

  const ctaTitle = (ctaBanner?.title ?? "").trim();
  const ctaButtonLabel = (ctaBanner?.buttonLabel ?? "").trim();
  const ctaButtonUrl = (ctaBanner?.buttonLink?.url ?? "").trim();

  return (
    <section
      id="du-an-mau-ocean-park"
      className={cn(
        "ocean-park-project-samples !w-full !bg-brand-white-hover/40 !text-brand-navy",
        className,
      )}
    >
      <div className="ocean-park-project-samples-inner !mx-auto !w-full !max-w-7xl">
        <div className="ocean-park-project-samples-header !mx-auto !max-w-4xl !text-center">
          {eyebrowText ? (
            <p className="ocean-park-project-samples-eyebrow !mb-2.5 !text-sm !font-bold !uppercase !tracking-widest !text-brand-gold md:!text-base">
              {eyebrowText}
            </p>
          ) : null}
          {titleText ? (
            <h2 className="ocean-park-project-samples-title !mb-0 !text-2xl !font-bold !leading-tight !text-brand-navy md:!text-3xl lg:!text-4xl">
              {titleText}
            </h2>
          ) : null}
          {descText ? (
            <p className="ocean-park-project-samples-desc !mt-4 !mb-0 !text-base !leading-relaxed !text-brand-navy/80 md:!text-lg">
              {descText}
            </p>
          ) : null}
        </div>

        {validZoneTabs.length > 0 ? (
          <div
            className="ocean-park-zone-tabs !mt-7 !flex !flex-nowrap !items-center !gap-2.5 !overflow-x-auto !pb-2 md:!justify-center md:!flex-wrap"
            role="tablist"
            aria-label="Lọc theo phân khu và tòa căn hộ"
          >
            {validZoneTabs.map((tab) => {
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
                    "ocean-park-zone-tab !inline-flex !shrink-0 !cursor-pointer !items-center !gap-2 !rounded-full !border !px-4 !py-2.5 !text-sm !font-semibold !transition-colors md:!px-5 md:!text-base",
                    isActive
                      ? "!border-brand-navy !bg-brand-navy !text-brand-gold !shadow-md"
                      : "!border-brand-navy/20 !bg-brand-white !text-brand-navy hover:!border-brand-gold hover:!text-brand-gold",
                  )}
                >
                  <Building2
                    className="!h-4 !w-4 !shrink-0"
                    aria-hidden="true"
                  />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        ) : null}

        {validUnitTypeTabs.length > 0 ? (
          <div
            className="ocean-park-unit-tabs !mt-3 !flex !flex-nowrap !items-center !gap-2.5 !overflow-x-auto !pb-2 md:!justify-center md:!flex-wrap"
            role="tablist"
            aria-label="Lọc theo loại căn hộ"
          >
            {validUnitTypeTabs.map((tab) => {
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
                    "ocean-park-unit-tab !inline-flex !shrink-0 !cursor-pointer !items-center !gap-2 !rounded-full !border !px-4 !py-2 !text-sm !font-medium !transition-colors md:!text-[15px]",
                    isActive
                      ? "!border-brand-gold !bg-brand-gold !text-brand-white"
                      : "!border-brand-navy/15 !bg-brand-white/90 !text-brand-navy/85 hover:!border-brand-gold",
                  )}
                >
                  <Layers className="!h-3.5 !w-3.5 !shrink-0" aria-hidden="true" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        ) : null}

        {isFallbackList ? (
          <div
            role="status"
            className="ocean-park-project-filter-empty-notice !mt-6 !flex !flex-wrap !items-center !justify-between !gap-4 !rounded-2xl !border !border-brand-gold/50 !bg-brand-gold/10 !px-5 !py-4 !text-sm !font-medium !text-brand-navy md:!text-base"
          >
            <span>
              Hiện chưa có mẫu thiết kế khớp đồng thời cả 2 bộ lọc đang chọn — dưới đây là toàn bộ mẫu căn hộ tham khảo của IC HOUSE.
            </span>
            <button
              type="button"
              onClick={() => {
                setActiveZone("all");
                setActiveUnitType("all");
              }}
              className="ocean-park-project-filter-reset-btn !shrink-0 !cursor-pointer !rounded-full !bg-brand-navy !px-4 !py-2 !text-sm !font-bold !text-brand-gold !transition-colors hover:!bg-brand-gold hover:!text-brand-white"
            >
              Xem tất cả mẫu
            </button>
          </div>
        ) : null}

        <div className="ocean-park-project-cards !mt-8 !flex !flex-nowrap !gap-5 !overflow-x-auto !pb-4 !snap-x !snap-mandatory md:!grid md:!grid-cols-2 md:!gap-7 md:!overflow-visible lg:!grid-cols-3">
          {displayProjects.map((project, index) => (
            <article
              key={`${project.apartmentCode ?? index}-${index}`}
              data-zone-id={project.zoneId}
              data-unit-type-id={project.unitTypeId}
              className="ocean-park-project-card !flex !w-[86%] !shrink-0 !snap-start !flex-col !overflow-hidden !rounded-2xl !border !border-brand-navy/15 !bg-brand-white !shadow-lg !transition-shadow hover:!shadow-xl md:!w-auto"
            >
              <div className="ocean-park-project-card-media !relative !aspect-[16/10] !w-full !overflow-hidden !bg-brand-navy/10">
                <Media
                  {...project.image}
                  className="!h-full !w-full !object-cover !transition-transform !duration-500 hover:!scale-105"
                />
                <div className="!absolute !top-3.5 !left-3.5 !flex !flex-wrap !gap-2">
                  {(project.zoneLabel ?? "").trim() ? (
                    <span className="!rounded-full !bg-brand-navy/90 !px-3.5 !py-1 !text-xs !font-bold !text-brand-gold md:!text-sm">
                      {project.zoneLabel}
                    </span>
                  ) : null}
                  {(project.towerLabel ?? "").trim() ? (
                    <span className="!rounded-full !bg-brand-gold !px-3 !py-1 !text-xs !font-bold !text-brand-white md:!text-sm">
                      {project.towerLabel}
                    </span>
                  ) : null}
                </div>
                {(project.area ?? "").trim() ||
                (project.apartmentCode ?? "").trim() ? (
                  <div className="!absolute !right-3.5 !bottom-3.5 !rounded-lg !bg-brand-navy/90 !px-3 !py-1.5 !text-xs !font-semibold !text-brand-white md:!text-sm">
                    {[project.area, project.apartmentCode]
                      .map((part) => (part ?? "").trim())
                      .filter(Boolean)
                      .join(" • ")}
                  </div>
                ) : null}
              </div>

              <div className="ocean-park-project-card-body !flex !flex-1 !flex-col !p-5 md:!p-6">
                {(project.unitTypeLabel ?? "").trim() ||
                (project.style ?? "").trim() ? (
                  <div className="!flex !items-center !justify-between !gap-2 !text-sm !font-semibold !text-brand-gold">
                    <span>{project.unitTypeLabel}</span>
                    <span>{project.style}</span>
                  </div>
                ) : null}

                <h3 className="ocean-park-project-card-title !mt-2 !mb-0 !text-lg !font-bold !leading-snug !text-brand-navy md:!text-xl">
                  {project.title}
                </h3>

                <p className="ocean-park-project-card-summary !mt-2.5 !mb-0 !flex-1 !text-base !leading-relaxed !text-brand-navy/80">
                  {project.summary}
                </p>

                <div className="!mt-5 !flex !items-center !justify-between !border-t !border-brand-navy/10 !pt-4">
                  <div>
                    <span className="!block !text-xs !font-medium !uppercase !text-brand-navy/65 md:!text-[13px]">
                      Mức đầu tư tham khảo
                    </span>
                    <strong className="!text-base !font-extrabold !text-brand-navy md:!text-lg">
                      {(project.budget ?? "").trim() || "Liên hệ báo giá"}
                    </strong>
                  </div>

                  {project.detailLink?.url?.trim() ? (
                    <Link
                      {...project.detailLink}
                      className="!inline-flex !items-center !gap-1.5 !rounded-full !bg-brand-navy !px-4 !py-2 !text-sm !font-semibold !text-brand-gold !no-underline !transition-colors hover:!bg-brand-gold hover:!text-brand-white"
                    >
                      <span>Nhận bản vẽ 3D</span>
                      <ArrowRight
                        className="!h-4 !w-4"
                        aria-hidden="true"
                      />
                    </Link>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>

        {ctaTitle ? (
          <div className="ocean-park-project-cta-banner !mt-8 !flex !flex-col !items-center !justify-between !gap-5 !rounded-2xl !bg-brand-navy !p-6 !text-brand-white md:!flex-row md:!p-8">
            <div>
              <h3 className="!mb-0 !text-xl !font-bold !text-brand-gold md:!text-2xl">
                {ctaTitle}
              </h3>
              <p className="!mt-2 !mb-0 !text-base !leading-relaxed !text-brand-white-hover">
                {ctaBanner?.description}
              </p>
            </div>
            {ctaButtonLabel && ctaButtonUrl && ctaBanner?.buttonLink ? (
              <Link
                {...ctaBanner.buttonLink}
                className="!inline-flex !shrink-0 !items-center !justify-center !rounded-full !bg-brand-gold !px-7 !py-3.5 !text-base !font-bold !uppercase !text-brand-white !no-underline !transition-colors hover:!bg-brand-gold-hover"
              >
                {ctaButtonLabel}
              </Link>
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default OceanParkProjectSamples;

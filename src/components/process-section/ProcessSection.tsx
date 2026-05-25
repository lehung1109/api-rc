import {
  Banknote,
  Cog,
  PencilRuler,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import type { MediaModel } from "../media/Media";
import Media from "../media/Media";

export type ProcessSectionIconKey =
  | "user-round"
  | "pencil-ruler"
  | "cog"
  | "banknote";

const PROCESS_SECTION_ICONS: Record<ProcessSectionIconKey, LucideIcon> = {
  "user-round": UserRound,
  "pencil-ruler": PencilRuler,
  cog: Cog,
  banknote: Banknote,
};

function resolveProcessSectionIcon(icon: ProcessSectionIconKey): LucideIcon {
  return PROCESS_SECTION_ICONS[icon] ?? UserRound;
}

export interface ProcessSectionModel {
  backgroundImage: MediaModel;
  className?: string;
  /** HTML from Elementor WYSIWYG (h2, p, …). */
  introContent?: string;
  steps: {
    id: number;
    title: string;
    description: string;
    icon: ProcessSectionIconKey;
  }[];
}

const ProcessSection = (model: ProcessSectionModel) => {
  const { backgroundImage, className, introContent, steps } = model;

  return (
    <section
      className={`relative overflow-hidden bg-cover bg-center bg-no-repeat text-white ${className} process-section p-8`}
    >
      {backgroundImage && (
        <Media
          className="absolute inset-0 z-0 object-cover max-w-none w-full h-full"
          {...backgroundImage}
        />
      )}

      <div
        className="pointer-events-none absolute inset-0 z-1 bg-black/65"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 z-1 bg-gradient-to-b from-black/50 via-black/40 to-black/60"
        aria-hidden="true"
      />

      <div className="relative z-10">
        {introContent ? (
          <div
            className="process-section-intro mx-auto max-w-3xl text-center"
            dangerouslySetInnerHTML={{ __html: introContent }}
          />
        ) : null}

        <div className="relative mt-12">
          <div className="process-section-line pointer-events-none absolute left-1/2 top-14 hidden w-screen -translate-x-1/2 md:block">
            <svg
              viewBox="0 0 1600 220"
              preserveAspectRatio="none"
              className="h-[160px] w-full"
              aria-hidden="true"
            >
              <path
                d="M0,110 C140,165 250,55 400,95 C560,140 660,182 810,120 C950,65 1040,48 1200,98 C1360,145 1480,150 1600,110"
                fill="none"
                stroke="rgba(255,255,255,0.9)"
                strokeWidth="3"
                strokeDasharray="10 12"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>

          <div className="relative z-10 flex flex-wrap justify-center gap-x-10 gap-y-12">
            {steps.map((step) => {
              const Icon = resolveProcessSectionIcon(step.icon);

              return (
                <div
                  key={step.id}
                  className="flex w-[240px] flex-col items-center text-center"
                >
                  <div className="relative mb-5 md:mb-6">
                    <div className="relative h-24 w-24 rotate-45 rounded-[50%_0_50%_50%] border-[4px] border-white bg-white shadow-[0_10px_30px_rgba(0,0,0,0.28)] md:h-32 md:w-32 md:-translate-y-3">
                      <div className="absolute inset-[6px] rounded-[50%_0_50%_50%] border-[3px] border-emerald-400 md:inset-[8px] md:border-[4px]" />
                      <div className="absolute inset-0 flex -rotate-45 items-center justify-center text-black">
                        <Icon
                          className="h-9 w-9 md:h-12 md:w-12 relative"
                          strokeWidth={2.2}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="process-section-step-content w-full text-white">
                    <h3 className="font-bold">
                      {step.id}. {step.title}
                    </h3>
                    <p className="mx-auto mt-3 max-w-[240px] text-sm leading-7 text-white/90 md:text-lg md:leading-8">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;

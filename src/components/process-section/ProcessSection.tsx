import { Card, CardContent } from "@/components/ui/card";
import type { MediaModel } from "../media/Media";
import Media from "../media/Media";

export interface ProcessSectionModel {
  backgroundImage: MediaModel;
  className?: string;
  steps: {
    id: number;
    title: string;
    description: string;
    icon: React.ElementType;
  }[];
}

const ProcessSection = (model: ProcessSectionModel) => {
  const { backgroundImage, className, steps } = model;

  return (
    <section
      className={`relative overflow-hidden bg-cover bg-center bg-no-repeat text-white ${className} process-section`}
    >
      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/30 to-black/55" />

      {/* show background image */}
      {backgroundImage && (
        <Media
          className="absolute inset-0 z-0 object-cover max-w-none w-full h-full"
          {...backgroundImage}
        />
      )}

      <div className="relative z-10">
        <div className="text-center">
          <h2 className="uppercase text-[1.6rem] font-bold">
            QUY TRÌNH THI CÔNG CỦA HOÀN MỸ{" "}
            <span className="text-orange-500">DECOR</span>
          </h2>

          <p className="">
            Để Quý khách hàng không mất quá nhiều thời gian trong việc lựa chọn
            đơn vị Tư vấn – Thiết kế nội thất uy tín, Hoàn Mỹ Decor giới thiệu
            tới Quý khách hàng Quy trình Tư vấn – Thiết kế nội thất chuyên
            nghiệp, trọn gói.
          </p>
        </div>

        <div className="relative mt-12">
          <div className="pointer-events-none absolute left-1/2 top-14 hidden w-screen -translate-x-1/2 md:block">
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
              const Icon = step.icon;

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
                          className="h-9 w-9 md:h-12 md:w-12"
                          strokeWidth={2.2}
                        />
                      </div>
                    </div>
                  </div>

                  <Card className="w-full border-0 bg-transparent shadow-none ring-0 text-white">
                    <CardContent className="p-0">
                      <h3 className="font-bold">
                        {step.id}. {step.title}
                      </h3>
                      <p className="mx-auto mt-3 max-w-[240px] text-sm leading-7 text-white/90 md:text-lg md:leading-8">
                        {step.description}
                      </p>
                    </CardContent>
                  </Card>
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

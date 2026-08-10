export interface JobDetailSectionModel {
  title: string;
  items: string[];
}

const JobDetailSection = (model: JobDetailSectionModel) => {
  const title = model.title.trim();
  const items = model.items.map((item) => item.trim()).filter(Boolean);

  if (!title || items.length === 0) {
    return null;
  }

  return (
    <section className="job-detail-section !grid !grid-cols-1 !gap-5 !border-t !border-brand-navy/15 !py-8 md:!grid-cols-[180px_minmax(0,1fr)]">
      <h2 className="job-detail-section-title !m-0 !text-base !font-bold !uppercase !leading-snug !text-brand-navy">
        {title}
      </h2>
      <ul className="job-detail-section-list !m-0 !list-disc !space-y-2 !pl-5 !text-base !leading-relaxed !text-brand-navy/90">
        {items.map((item) => (
          <li key={item} className="job-detail-section-item !pl-1">
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default JobDetailSection;

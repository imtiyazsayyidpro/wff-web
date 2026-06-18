interface HowItWorksCardProps {
  index: string;
  title: string;
  body: string;
}

/** One of the three "how it works" steps on the landing page. */
export function HowItWorksCard({ index, title, body }: HowItWorksCardProps) {
  return (
    <div className="rounded-[20px] border border-line bg-panel p-[30px]">
      <div className="mb-[14px] font-serif text-[22px] text-blush">{index}</div>
      <h3 className="mb-[9px] font-serif text-[21px] text-ink">{title}</h3>
      <p className="text-[15px] leading-[1.62] text-muted">{body}</p>
    </div>
  );
}

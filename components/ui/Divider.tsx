/** Horizontal rule with centred label, e.g. "or with email". */
export function Divider({ label }: { label: string }) {
  return (
    <div className="my-5 flex items-center gap-[14px]">
      <span className="h-px flex-1 bg-line" />
      <span className="text-[12px] tracking-[0.04em] text-faint">{label}</span>
      <span className="h-px flex-1 bg-line" />
    </div>
  );
}

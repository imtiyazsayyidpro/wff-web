import { BandAidGlyph } from "@/components/dashboard/BandAidGlyph";

interface BandAidPoolCardProps {
  balance: number;
  partnerName: string;
}

export function BandAidPoolCard({ balance, partnerName }: BandAidPoolCardProps) {
  return (
    <div className="flex items-center gap-[18px] rounded-[20px] border border-line bg-[linear-gradient(160deg,var(--blush-soft),var(--panel))] px-[22px] py-5">
      <BandAidGlyph width={40} />
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-2">
          <span className="font-serif text-[30px] leading-none text-ink">{balance}</span>
          <span className="text-[13.5px] text-muted">band-aids</span>
        </div>
        <div className="mt-[5px] text-[12.5px] leading-[1.5] text-muted">
          Shared between you &amp; {partnerName} · 1 = one hour together
        </div>
      </div>
      <span className="flex items-center">
        <span className="z-[2] h-[26px] w-[26px] rounded-full border-2 border-panel bg-[var(--orb2)]" />
        <span className="-ml-[9px] h-[26px] w-[26px] rounded-full border-2 border-panel bg-saged" />
      </span>
    </div>
  );
}

import { Orb } from "@/components/ui/Orb";

/** Full-height centred breathing-orb loader for pending route/data states. */
export function PageLoader() {
  return (
    <div className="grid min-h-screen place-items-center bg-bg">
      <Orb size={64} />
    </div>
  );
}

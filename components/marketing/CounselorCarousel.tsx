"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { Orb } from "@/components/ui/Orb";

interface Counselor {
  name: string;
  imageUrl: string;
  blurb: string;
}

/** The showcase line-up — names match the seeded counsellor images. */
const COUNSELORS: Counselor[] = [
  {
    name: "Luma",
    imageUrl: "/assets/images/counsellors/Luma.png",
    blurb: "Warm and unhurried — helps you slow down so you both feel truly heard.",
  },
  {
    name: "Fern",
    imageUrl: "/assets/images/counsellors/Fern.png",
    blurb: "Grounded and patient — steady company when things feel tangled.",
  },
  {
    name: "Rue",
    imageUrl: "/assets/images/counsellors/Rue.png",
    blurb: "Soft-spoken and tender — gentle with the moments that ache a little.",
  },
  {
    name: "Blush",
    imageUrl: "/assets/images/counsellors/blush.png",
    blurb: "Kind and reassuring — keeps the room soft when feelings run warm.",
  },
  {
    name: "Coco",
    imageUrl: "/assets/images/counsellors/coco.png",
    blurb: "Light and warm — finds the ease in heavy moments without rushing them.",
  },
  {
    name: "Ollie",
    imageUrl: "/assets/images/counsellors/ollie.png",
    blurb: "Calm and even — a settling presence when the conversation gets tall.",
  },
];

const N = COUNSELORS.length;
const wrap = (i: number) => ((i % N) + N) % N;

/** Wrap an offset into the shortest signed distance around the ring. */
const ringOffset = (raw: number) => {
  let o = raw;
  if (o > N / 2) o -= N;
  if (o < -N / 2) o += N;
  return o;
};

/**
 * A circular "coverflow" of counsellor orbs — the one in focus blooms large and
 * clear while the others recede into the distance along an arc. Drag/swipe to
 * spin through the ring; it follows your finger and snaps to the nearest orb.
 */
export function CounselorCarousel() {
  const [index, setIndex] = useState(0);
  const [drag, setDrag] = useState(0); // fractional offset while dragging (index units)
  const [dragging, setDragging] = useState(false);
  const [width, setWidth] = useState(640);

  const stageRef = useRef<HTMLDivElement>(null);
  const pointer = useRef<{ id: number; startX: number } | null>(null);
  // Survives past pointerup so the click that follows a drag is ignored.
  const movedRef = useRef(false);

  // Measure the stage so the orbs scale gracefully from phone to desktop.
  useLayoutEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    ro.observe(el);
    setWidth(el.clientWidth);
    return () => ro.disconnect();
  }, []);

  const big = Math.max(132, Math.min(216, width * 0.4));
  const spacing = big * 0.82;

  const go = useCallback((next: number) => setIndex((i) => wrap(i + next)), []);

  // --- drag to spin -------------------------------------------------------
  const onPointerDown = (e: ReactPointerEvent) => {
    pointer.current = { id: e.pointerId, startX: e.clientX };
    movedRef.current = false;
    setDragging(true);
    stageRef.current?.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: ReactPointerEvent) => {
    const p = pointer.current;
    if (!p || p.id !== e.pointerId) return;
    const dx = e.clientX - p.startX;
    if (Math.abs(dx) > 6) movedRef.current = true;
    setDrag(dx / spacing);
  };

  const endDrag = (e: ReactPointerEvent) => {
    const p = pointer.current;
    if (!p || p.id !== e.pointerId) return;
    // The orb nearest the centre after the drag becomes the new focus.
    setIndex((i) => wrap(i - Math.round(drag)));
    setDrag(0);
    setDragging(false);
    pointer.current = null;
  };

  // --- keyboard ------------------------------------------------------------
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "ArrowRight") go(1);
    };
    el.addEventListener("keydown", onKey);
    return () => el.removeEventListener("keydown", onKey);
  }, [go]);

  const active = COUNSELORS[index];

  return (
    <div className="select-none">
      <div
        ref={stageRef}
        tabIndex={0}
        role="group"
        aria-label="Choose a counsellor"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        className="relative h-[300px] cursor-grab touch-pan-y outline-none active:cursor-grabbing md:h-[340px]"
        style={{ perspective: "1100px" }}
      >
        {/* soft floor glow that anchors the focused orb */}
        {/* <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 mx-auto h-[260px] max-w-[520px] bg-[radial-gradient(circle_at_50%_50%,var(--orb-glow),transparent_62%)] opacity-70"
        /> */}

        <div className="absolute inset-0" style={{ transformStyle: "preserve-3d" }}>
          {COUNSELORS.map((c, i) => {
            const offset = ringOffset(i - index + drag);
            const abs = Math.abs(offset);
            const scale = Math.max(0.44, 1 - abs * 0.28);
            const rotateY = -offset * 16;
            const x = offset * spacing;
            const z = -abs * 130;
            const y = abs * 10;
            const opacity = abs > 2.6 ? 0 : Math.max(0, 1 - abs * 0.34);
            const blur = abs <= 0.55 ? 0 : Math.min(3.2, (abs - 0.4) * 1.6);
            const isFocus = i === index;

            return (
              <button
                key={c.name}
                type="button"
                aria-label={`Focus ${c.name}`}
                aria-hidden={opacity === 0}
                tabIndex={isFocus ? 0 : -1}
                onClick={() => {
                  if (movedRef.current) return;
                  if (!isFocus) setIndex(i);
                }}
                className="absolute left-1/2 top-1/2 origin-center"
                style={{
                  width: big,
                  height: big,
                  marginLeft: -big / 2,
                  marginTop: -big / 2,
                  transform: `translate3d(${x}px, ${y}px, ${z}px) rotateY(${rotateY}deg) scale(${scale})`,
                  opacity,
                  filter: blur ? `blur(${blur}px)` : undefined,
                  zIndex: 100 - Math.round(abs * 10),
                  transition: dragging ? "none" : "transform 0.55s cubic-bezier(0.22,1,0.36,1), opacity 0.55s ease, filter 0.55s ease",
                  pointerEvents: opacity < 0.2 ? "none" : "auto",
                  cursor: isFocus ? "default" : "pointer",
                }}
              >
                <Orb size={big} drift={isFocus} imageUrl={c.imageUrl} imageAlt={c.name} />
              </button>
            );
          })}
        </div>
      </div>

      {/* the focused counsellor's name + a word about them */}
      <div key={active.name} className="mx-auto mt-2 max-w-[440px] text-center animate-rise">
        <h3 className="font-serif text-[28px] leading-tight text-ink md:text-[32px]">{active.name}</h3>
        <p className="mx-auto mt-2 max-w-[400px] text-[14.5px] leading-[1.6] text-muted">{active.blurb}</p>
      </div>

      {/* dots */}
      <div className="mt-6 flex items-center justify-center gap-[10px]">
        {COUNSELORS.map((c, i) => (
          <button key={c.name} type="button" aria-label={`Show ${c.name}`} aria-current={i === index} onClick={() => setIndex(i)} className="grid place-items-center p-1">
            <span
              className="block rounded-full transition-all duration-300"
              style={{
                width: i === index ? 22 : 8,
                height: 8,
                background: i === index ? "var(--orb2)" : "var(--line2)",
              }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

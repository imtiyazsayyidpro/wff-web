"use client";

import { useEffect, useRef, useState } from "react";
import { Orb } from "@/components/ui/Orb";

/* ---------------------------------------------------------------------------
   A looping, illustrative session — the same turn-based shape couples see
   inside the app: someone speaks, the other reflects it back, and the
   counselor gently guides the next step. Purely decorative; it carries no
   real data and restarts forever.
   -------------------------------------------------------------------------- */

type Sender = "mediator" | "you" | "partner";

interface Step {
  sender: Sender;
  text: string;
  /** How long the typing / reflecting indicator lingers before the line lands. */
  think?: number;
  /** Pause after the line before the next turn begins. */
  after?: number;
}

const COUNSELOR_NAME = "Luma";
const COUNSELOR_IMAGE = "/assets/images/counsellors/Luma.png";
const PARTNER_NAME = "Sam";

const SCRIPT: Step[] = [
  { sender: "mediator", text: "Whenever you're ready. What's been sitting heaviest tonight?", after: 800 },
  { sender: "you", text: "I feel like I've been carrying the house on my own lately.", think: 1500 },
  { sender: "mediator", text: "Thank you for saying it plainly. Sam — can you tell her what you heard?", think: 1600 },
  { sender: "partner", text: "I heard that you're worn out… and that I haven't been seeing it.", think: 1700 },
  { sender: "mediator", text: "That's real listening. Notice you're both still here, still trying.", think: 1500, after: 900 },
  { sender: "you", text: "I don't want to fight. I just want to feel like a team again.", think: 1500 },
  { sender: "partner", text: "Me too. I'm sorry. Let's start tonight.", think: 1400 },
  { sender: "mediator", text: "Then start right here — turn toward each other.", think: 1500, after: 1200 },
];

interface DemoMessage {
  id: number;
  sender: Sender;
  text: string;
}

/** Three softly pulsing dots, reused for both "typing" and "reflecting". */
function Dots({ className }: { className?: string }) {
  return (
    <span className={className} aria-hidden="true">
      {[0, 0.15, 0.3].map((delay, i) => (
        <span
          key={i}
          className="inline-block h-[6px] w-[6px] rounded-full bg-current"
          style={{ animation: "wf-glow 1.1s ease-in-out infinite", animationDelay: `${delay}s` }}
        />
      ))}
    </span>
  );
}

function MediatorLine({ text, writing }: { text: string; writing?: boolean }) {
  return (
    <div className="flex animate-rise flex-col items-center self-stretch py-1">
      <Orb size={40} imageUrl={COUNSELOR_IMAGE} imageAlt={COUNSELOR_NAME} />
      <span className="mb-[10px] mt-2 text-[9px] uppercase tracking-[0.24em] text-faint">
        {COUNSELOR_NAME} · your counselor
      </span>
      <div
        className="relative max-w-[92%] rounded-[18px] border border-blush/25 px-5 py-[15px] text-center"
        style={{
          background: "radial-gradient(120% 130% at 50% -10%, var(--blush-soft), var(--panel2) 78%)",
          boxShadow: "0 14px 44px -18px var(--orb-glow), inset 0 1px 0 rgba(255,255,255,0.25)",
        }}
      >
        <p className="font-serif text-[15px] leading-[1.6] tracking-[0.005em] text-ink">
          {text}
          {writing && <span className="ml-[1px] inline-block w-[1px] animate-fade">▏</span>}
        </p>
      </div>
    </div>
  );
}

function YouLine({ text }: { text: string }) {
  return (
    <div className="max-w-[80%] animate-rise self-end">
      <div className="mb-[5px] mr-1 text-right text-[9px] uppercase tracking-[0.12em] text-faint">You</div>
      <div className="rounded-[18px_4px_18px_18px] bg-ink px-4 py-[10px] text-[13px] leading-[1.5] text-bg">
        {text}
      </div>
    </div>
  );
}

function PartnerLine({ text }: { text: string }) {
  return (
    <div className="max-w-[80%] animate-rise self-start">
      <div className="mb-[5px] ml-1 text-[9px] uppercase tracking-[0.12em] text-faint">{PARTNER_NAME}</div>
      <div className="rounded-[4px_18px_18px_18px] bg-blush-soft px-4 py-[10px] text-[13px] leading-[1.5] text-ink">
        {text}
      </div>
    </div>
  );
}

export function DemoSession() {
  const [messages, setMessages] = useState<DemoMessage[]>([]);
  const [typing, setTyping] = useState<Sender | null>(null);
  const [writingId, setWritingId] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Keep the newest line in view inside the frame (never scrolls the page).
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, typing]);

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    let id = 0;
    const nextId = () => (id += 1);

    // Reduced motion: show the whole exchange at rest, no looping.
    if (reduce) {
      setMessages(SCRIPT.map((s) => ({ id: nextId(), sender: s.sender, text: s.text })));
      return;
    }

    let cancelled = false;
    const sleep = (ms: number) =>
      new Promise<void>((resolve) => setTimeout(resolve, ms));

    async function run() {
      while (!cancelled) {
        setMessages([]);
        setTyping(null);
        setWritingId(null);
        await sleep(650);

        for (const step of SCRIPT) {
          if (cancelled) return;

          setTyping(step.sender);
          await sleep(step.think ?? 1300);
          if (cancelled) return;
          setTyping(null);

          if (step.sender === "mediator") {
            // Type the counselor's reflection out, character by character.
            const msgId = nextId();
            setMessages((m) => [...m, { id: msgId, sender: "mediator", text: "" }]);
            setWritingId(msgId);
            for (let i = 1; i <= step.text.length; i++) {
              if (cancelled) return;
              setMessages((m) =>
                m.map((x) => (x.id === msgId ? { ...x, text: step.text.slice(0, i) } : x)),
              );
              await sleep(20);
            }
            setWritingId(null);
          } else {
            setMessages((m) => [...m, { id: nextId(), sender: step.sender, text: step.text }]);
          }

          await sleep(step.after ?? 750);
        }

        await sleep(2800);
      }
    }

    void run();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="mx-auto w-full max-w-[440px]">
      <div className="overflow-hidden rounded-[26px] border border-line bg-bg shadow-[0_30px_80px_-40px_var(--shadow)]">
        {/* window header */}
        <div className="flex items-center gap-[10px] border-b border-line bg-panel px-5 py-[14px]">
          <Orb size={26} imageUrl={COUNSELOR_IMAGE} imageAlt={COUNSELOR_NAME} />
          <div className="flex-1">
            <div className="text-[12.5px] font-bold leading-tight text-ink">{COUNSELOR_NAME}</div>
            <div className="text-[10px] uppercase tracking-[0.16em] text-faint">Guided session</div>
          </div>
          <span className="inline-flex items-center gap-[6px] rounded-full border border-line2 bg-panel2 px-[10px] py-[4px] text-[10px] font-bold uppercase tracking-[0.12em] text-saged">
            <span className="h-[6px] w-[6px] rounded-full bg-saged" />
            Live
          </span>
        </div>

        {/* transcript */}
        <div ref={scrollRef} className="flex h-[420px] flex-col gap-[18px] overflow-hidden px-[18px] py-5">
          {messages.map((m) =>
            m.sender === "mediator" ? (
              <MediatorLine key={m.id} text={m.text} writing={m.id === writingId} />
            ) : m.sender === "you" ? (
              <YouLine key={m.id} text={m.text} />
            ) : (
              <PartnerLine key={m.id} text={m.text} />
            ),
          )}

          {typing === "you" && (
            <div className="flex items-center gap-[9px] self-end px-[6px] py-[2px]">
              <Dots className="flex gap-1 text-ink/60" />
              <span className="text-[9px] uppercase tracking-[0.12em] text-faint">You</span>
            </div>
          )}

          {typing === "partner" && (
            <div className="flex items-center gap-[9px] self-start px-[6px] py-[2px]">
              <span className="text-[9px] uppercase tracking-[0.12em] text-faint">{PARTNER_NAME}</span>
              <Dots className="flex gap-1 text-blushd" />
            </div>
          )}

          {typing === "mediator" && (
            <div className="flex items-center gap-[10px] self-center px-[6px] py-1">
              <Orb size={24} imageUrl={COUNSELOR_IMAGE} imageAlt={COUNSELOR_NAME} />
              <span className="font-serif text-[13.5px] italic text-muted">
                {COUNSELOR_NAME} is reflecting
              </span>
              <Dots className="flex gap-1 text-[var(--orb2)]" />
            </div>
          )}
        </div>
      </div>

      <p className="mt-3 text-center text-[11.5px] text-faint">
        An illustration of a guided session — not a real conversation.
      </p>
    </div>
  );
}

"use client";

import { useEffect, useRef } from "react";
import type { SessionMessage } from "@/types/session";
import { MessageBubble } from "@/components/session/MessageBubble";
import { Orb } from "@/components/ui/Orb";

interface TranscriptProps {
  messages: SessionMessage[];
  meId: number;
  partnerName: string;
  counselorName: string;
  counselorImageUrl?: string | null;
  isPartnerTyping: boolean;
  mediatorThinking: boolean;
}

function Dots({ className }: { className?: string }) {
  return (
    <span className={className} aria-hidden="true">
      {[0, 0.15, 0.3].map((delay, i) => (
        <span key={i} className="inline-block h-[6px] w-[6px] rounded-full bg-current" style={{ animation: "wf-glow 1.1s ease-in-out infinite", animationDelay: `${delay}s` }} />
      ))}
    </span>
  );
}

export function Transcript({ messages, meId, partnerName, counselorName, counselorImageUrl, isPartnerTyping, mediatorThinking }: TranscriptProps) {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages.length, isPartnerTyping, mediatorThinking]);

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-auto">
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-16 px-[18px] py-5">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} meId={meId} partnerName={partnerName} counselorName={counselorName} counselorImageUrl={counselorImageUrl} />
        ))}

        {isPartnerTyping && (
          <div className="flex items-center gap-[9px] self-start px-[6px] py-[2px]">
            <span className="text-[9.5px] uppercase tracking-[0.12em] text-faint">{partnerName}</span>
            <Dots className="flex gap-1 text-blushd" />
          </div>
        )}

        {mediatorThinking && (
          <div className="flex items-center gap-[10px] self-center px-[6px] py-1">
            <Orb size={26} imageUrl={counselorImageUrl} imageAlt={counselorName} />
            <span className="font-serif text-[15px] italic text-muted">{counselorName} is reflecting</span>
            <Dots className="flex gap-1 text-[var(--orb2)]" />
          </div>
        )}

        <div ref={endRef} />
      </div>
    </div>
  );
}

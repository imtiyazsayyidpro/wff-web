"use client";

import { useState } from "react";
import {
  useMemories,
  useCreateMemory,
  useUpdateMemory,
  useDeleteMemory,
} from "@/lib/hooks/useMemories";
import { formatDate } from "@/lib/utils/time";
import { routes } from "@/config/routes";
import type { Memory } from "@/types/memory";
import { Orb } from "@/components/ui/Orb";
import { PageLoader } from "@/components/ui/PageLoader";
import { StoreSubHeader } from "@/components/store/StoreSubHeader";
import { Pager } from "@/components/store/Pager";
import { MemoryEditorSheet } from "@/components/memory/MemoryEditorSheet";
import { DeleteMemoryDialog } from "@/components/memory/DeleteMemoryDialog";

type Editor = { mode: "add" } | { mode: "edit"; memory: Memory } | null;

export default function MemoriesPage() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useMemories(page);

  const create = useCreateMemory();
  const update = useUpdateMemory();
  const remove = useDeleteMemory();

  const [editor, setEditor] = useState<Editor>(null);
  const [deleteTarget, setDeleteTarget] = useState<Memory | null>(null);

  if (isLoading && !data) return <PageLoader />;

  const memories = data?.memories ?? [];
  const isEmpty = memories.length === 0 && page === 1;

  const handleSave = (content: string) => {
    if (!editor) return;
    if (editor.mode === "add") {
      create.mutate(content, { onSuccess: () => setEditor(null) });
    } else {
      update.mutate({ id: editor.memory.id, content }, { onSuccess: () => setEditor(null) });
    }
  };

  return (
    <div className="min-h-screen bg-bg text-ink">
      <StoreSubHeader title="Memories" backHref={routes.home} />

      <div className="mx-auto max-w-[960px] px-[22px] py-6 lg:px-8 lg:py-10">
        <div className="lg:grid lg:grid-cols-[300px_1fr] lg:items-start lg:gap-12">
          {/* Left rail — what memories are for */}
          <div className="mb-7 lg:sticky lg:top-[92px] lg:mb-0">
            <h1 className="mb-[12px] font-serif text-[27px] leading-[1.15]">
              Things worth remembering
            </h1>
            <p className="mb-4 text-[14.5px] leading-[1.62] text-muted">
              The things you&apos;d want your counselor to remember about you — your work, your
              family, what you&apos;re carrying right now. They&apos;re quietly loaded in at the start
              of every session, so you never have to explain yourself from scratch.
            </p>
            <div className="flex items-start gap-[9px] rounded-xl border border-saged bg-sage-soft px-[14px] py-[11px]">
              <span className="mt-[6px] h-[7px] w-[7px] flex-none rounded-full bg-saged" />
              <span className="text-[12.5px] leading-[1.5] text-ink">
                This is your space. These notes stay personal to you — your partner never sees them.
              </span>
            </div>
          </div>

          {/* Right — your memories */}
          <div>
            {isEmpty ? (
              <div className="rounded-[20px] border border-dashed border-line2 px-6 py-14 text-center">
                <Orb size={62} className="mx-auto mb-5" />
                <h2 className="mb-[10px] font-serif text-[23px] leading-[1.2]">
                  Nothing here yet — and that&apos;s okay
                </h2>
                <p className="mx-auto mb-[22px] max-w-[380px] text-[14.5px] leading-[1.62] text-muted">
                  Add the first thing you&apos;d want your counselor to hold onto. A line about your
                  days, your family, or what&apos;s been heavy lately is a lovely place to begin.
                </p>
                <button
                  type="button"
                  onClick={() => setEditor({ mode: "add" })}
                  className="rounded-full bg-ink px-[34px] py-[15px] text-[15.5px] font-bold text-bg transition-opacity hover:opacity-90"
                >
                  Add your first memory
                </button>
              </div>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => setEditor({ mode: "add" })}
                  className="mb-[14px] flex w-full items-center justify-center gap-[9px] rounded-[14px] border-[1.5px] border-dashed border-line2 py-[15px] text-[14.5px] font-bold text-ink transition-colors hover:border-blush hover:bg-panel2"
                >
                  <span className="text-[18px] leading-none text-blush">+</span> Add a memory
                </button>

                <div className="flex flex-col gap-3">
                  {memories.map((memory) => (
                <div
                  key={memory.id}
                  className="flex flex-col rounded-[18px] border border-line bg-panel px-5 py-[18px]"
                >
                  <p className="mb-[14px] flex-1 text-[15px] leading-[1.6] text-ink">
                    {memory.content}
                  </p>
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-2">
                      {memory.source === "AI" && (
                        <span className="h-[15px] w-[15px] flex-none rounded-full bg-[radial-gradient(circle_at_36%_30%,var(--orb1),var(--orb2)_72%)]" />
                      )}
                      <span className="truncate text-[11.5px] text-faint">
                        {memory.source === "AI" ? "From your counselor" : "Your note"} ·{" "}
                        {formatDate(memory.createdAt)}
                      </span>
                    </div>
                    <div className="flex flex-none items-center gap-4">
                      <button
                        type="button"
                        onClick={() => setEditor({ mode: "edit", memory })}
                        className="text-[12.5px] font-bold text-muted hover:text-ink"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeleteTarget(memory)}
                        className="text-[12.5px] font-bold text-blushd hover:opacity-75"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

                {data && (
                  <Pager
                    pagination={data.pagination}
                    mode="range"
                    onPrev={() => setPage((p) => Math.max(1, p - 1))}
                    onNext={() => setPage((p) => p + 1)}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {editor && (
        <MemoryEditorSheet
          title={editor.mode === "add" ? "Add a memory" : "Edit memory"}
          initialValue={editor.mode === "edit" ? editor.memory.content : ""}
          isSaving={create.isPending || update.isPending}
          onSave={handleSave}
          onClose={() => setEditor(null)}
        />
      )}

      {deleteTarget && (
        <DeleteMemoryDialog
          text={deleteTarget.content}
          isDeleting={remove.isPending}
          onCancel={() => setDeleteTarget(null)}
          onConfirm={() =>
            remove.mutate(deleteTarget.id, { onSuccess: () => setDeleteTarget(null) })
          }
        />
      )}
    </div>
  );
}

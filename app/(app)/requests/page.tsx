"use client";

import Link from "next/link";
import { useAuth } from "@/providers/AuthProvider";
import { useIncomingRequests, useSentRequests } from "@/lib/hooks/usePartnership";
import { routes } from "@/config/routes";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";
import { PageLoader } from "@/components/ui/PageLoader";
import { IncomingRequestRow, OutgoingRequestRow } from "@/components/partnership/RequestRow";

export default function RequestsPage() {
  const { user } = useAuth();
  const incoming = useIncomingRequests();
  const sent = useSentRequests();

  if (incoming.isLoading || sent.isLoading) return <PageLoader />;

  const inc = incoming.data ?? [];
  const out = sent.data ?? [];
  const isEmpty = inc.length === 0 && out.length === 0;

  return (
    <div className="min-h-screen bg-bg text-ink">
      <header className="sticky top-0 z-10 border-b border-line bg-bg">
        <div className="mx-auto flex max-w-[960px] items-center justify-between px-[22px] py-4 md:px-8">
          <Link
            href={routes.home}
            className="inline-flex items-center gap-[6px] text-[14px] font-semibold text-ink no-underline hover:text-blushd"
          >
            <span className="text-[16px]">‹</span> Home
          </Link>
          <Avatar name={user?.name} email={user?.email} />
        </div>
      </header>

      <main className="mx-auto max-w-[960px] px-[22px] py-[30px] lg:px-8">
        <div className="mb-6">
          <h1 className="mb-2 font-serif text-[31px] leading-[1.12]">Requests</h1>
          <p className="text-[15px] leading-[1.6] text-muted">
            Invitations waiting for you, and the ones you&apos;ve sent.
          </p>
        </div>

        {isEmpty ? (
          <div className="rounded-[18px] border border-dashed border-line2 bg-panel px-7 py-11 text-center">
            <h2 className="mb-2 font-serif text-[21px] text-ink">Nothing waiting right now.</h2>
            <p className="mx-auto mb-5 max-w-[330px] text-[14.5px] leading-[1.6] text-muted">
              When someone invites you — or you invite them — it&apos;ll show up here.
            </p>
            <Link href={routes.invite}>
              <Button size="md">Invite your partner</Button>
            </Link>
          </div>
        ) : (
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-7">
            {inc.length > 0 && (
              <section className="mb-8 lg:mb-0">
                <div className="mb-3 flex items-baseline gap-2">
                  <h2 className="font-serif text-[18px] text-ink">Invitations for you</h2>
                  <span className="text-[12.5px] text-faint">· {inc.length}</span>
                </div>
                <Alert variant="info" className="mb-[14px]">
                  Accepting one connects you with that person and gently clears your other pending
                  invitations — so you&apos;ll only ever be partnered with one.
                </Alert>
                <div className="flex flex-col gap-[10px]">
                  {inc.map((request) => (
                    <IncomingRequestRow key={request.id} request={request} />
                  ))}
                </div>
              </section>
            )}

            {out.length > 0 && (
              <section>
                <div className="mb-3 flex items-baseline gap-2">
                  <h2 className="font-serif text-[18px] text-ink">Invitations you&apos;ve sent</h2>
                  <span className="text-[12.5px] text-faint">· {out.length}</span>
                </div>
                <div className="flex flex-col gap-[10px]">
                  {out.map((request) => (
                    <OutgoingRequestRow key={request.id} request={request} />
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

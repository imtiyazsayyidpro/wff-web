"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { inviteSchema, type InviteValues } from "@/lib/validation/partnership";
import { useInvitePartner } from "@/lib/hooks/usePartnership";
import { getErrorStatus } from "@/lib/utils/apiError";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";

/** The invite-your-partner form. On success the sent-requests query refreshes
 *  and the parent swaps to the "waiting" card. */
export function InviteForm() {
  const invite = useInvitePartner();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InviteValues>({
    resolver: zodResolver(inviteSchema),
    defaultValues: { email: "" },
  });

  const status = getErrorStatus(invite.error);
  const showSelf = status === 400;
  const showUnavailable = status === 409;

  return (
    <>
      <Card elevated>
        <div className="mb-[7px] flex items-center gap-[11px]">
          <svg width="24" height="24" viewBox="0 0 38 38" fill="none" aria-hidden="true">
            <circle cx="15" cy="19" r="10" stroke="var(--blush)" strokeWidth="1.6" />
            <circle cx="23" cy="19" r="10" stroke="var(--line2)" strokeWidth="1.6" />
          </svg>
          <h2 className="font-serif text-[24px] text-ink">Invite your partner</h2>
        </div>
        <p className="mb-5 text-[15px] leading-[1.6] text-muted">
          Enter their email and we&apos;ll send a warm invitation to join you here — privately,
          just the two of you.
        </p>

        {showSelf && (
          <Alert className="mb-4" variant="error">
            That&apos;s your own email. Invite the person you&apos;d like to connect with instead.
          </Alert>
        )}
        {showUnavailable && (
          <Alert className="mb-4" variant="error">
            We couldn&apos;t send an invitation to that address. They may already be connected with
            someone. Double-check the email, or try a different one.
          </Alert>
        )}

        <form
          onSubmit={handleSubmit(({ email }) => invite.mutate(email))}
          className="flex flex-col gap-3"
        >
          <Input
            type="email"
            autoComplete="off"
            placeholder="Their email address"
            hasError={!!errors.email}
            {...register("email")}
          />
          {errors.email && <p className="text-[12px] text-blushd">{errors.email.message}</p>}
          <Button
            type="submit"
            size="lg"
            fullWidth
            isLoading={invite.isPending}
            loadingText="Sending…"
          >
            Send invitation
          </Button>
        </form>
      </Card>
    </>
  );
}

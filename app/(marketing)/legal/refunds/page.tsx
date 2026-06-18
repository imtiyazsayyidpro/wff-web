import type { Metadata } from "next";
import Link from "next/link";
import { LegalShell, Section, P, List, Item, Strong, Callout } from "@/components/legal/LegalDoc";
import { routes } from "@/config/routes";

export const metadata: Metadata = { title: "Refund Policy · Worth Fighting For" };

/*
 * ⚠️ RISK NOTE (see chat): A blanket "non-refundable" line cannot override a buyer's
 * statutory rights under India's Consumer Protection Act 2019, especially where a paid
 * service was NOT actually delivered (e.g. a session that failed on our side). The wording
 * below deliberately pairs "generally non-refundable" with "we make it right when the fault
 * is ours" + an explicit no-waiver of consumer rights. The goodwill band-aid is a gesture,
 * not a substitute for those rights. Operator: Imtiyaz Iqbal Sayyid (sole proprietor, Mumbai).
 * The 7-day window is a suggested default — adjust if you prefer.
 */

export default function RefundsPage() {
  return (
    <LegalShell
      current="refunds"
      eyebrow="Refund Policy"
      title="If something goes wrong, tell us."
      lead="Payments are generally non-refundable — but if the fault is ours, we want to make it right. Here's exactly how that works."
      updated="18 June 2026"
    >
      <Callout tone="warn" title="The short version">
        <p>
          Band-aids are paid for upfront and are <Strong>generally non-refundable</Strong>. But
          if a session fails or you&apos;re charged incorrectly because of an error on our side,{" "}
          <Strong>reach out to us</Strong> and we&apos;ll put it right — usually by adding a band-aid
          back to your balance, and by honouring your rights under the law.
        </p>
      </Callout>

      <Section heading="1. How band-aids work">
        <P>
          Sessions run on band-aids — one band-aid covers a single one-hour guided conversation.
          When you buy band-aids, they&apos;re added to your balance straight away and are ready to
          use. Because they&apos;re a digital benefit delivered instantly, we treat a purchase as
          complete once the band-aids reach your balance.
        </P>
      </Section>

      <Section heading="2. Why there&apos;s a charge at all">
        <P>
          We&apos;d honestly rather this were free. We charge for band-aids because the AI that
          guides your sessions has a real, ongoing cost to run — the price simply covers making
          those guided conversations available to you.
        </P>
      </Section>

      <Section heading="3. Our general policy">
        <P>
          Payments for band-aids and plans are <Strong>generally non-refundable</Strong>. This is
          because band-aids are digital and made available to you immediately. In particular,{" "}
          <Strong>if you paid for a band-aid but haven&apos;t used it, that isn&apos;t
          refundable</Strong> — it stays on your balance, ready for whenever the two of you are. A
          change of mind doesn&apos;t qualify for a refund on its own.
        </P>
      </Section>

      <Section heading="4. When we&apos;ll make it right">
        <P>
          We&apos;re a small team and we care about being fair. If something goes wrong{" "}
          <Strong>because of an error on our side</Strong>, reach out and we&apos;ll fix it. That
          includes situations like:
        </P>
        <List>
          <Item>A session that couldn&apos;t run, or was cut short, due to a fault in our service.</Item>
          <Item>A band-aid that was charged or deducted but never delivered to your balance.</Item>
          <Item>A duplicate charge, or being charged the wrong amount.</Item>
          <Item>A clear technical error that meant you didn&apos;t get what you paid for.</Item>
        </List>
        <P>
          In these cases, our usual fix is to <Strong>add the affected band-aid back to your
          balance</Strong> so you can use it when you&apos;re ready. Where that isn&apos;t the right
          remedy — for example a genuine duplicate payment — we&apos;ll arrange a refund of the
          amount affected to your original payment method. We&apos;ll always try to choose the
          option that&apos;s fair to you.
        </P>
      </Section>

      <Section heading="5. How to reach out">
        <P>
          Just email us at{" "}
          <a href="mailto:info@worthfightingfor.in" className="font-semibold text-blushd no-underline">
            info@worthfightingfor.in
          </a>{" "}
          and tell us what happened. To help us sort it out quickly, please include:
        </P>
        <List>
          <Item>The email address on your account.</Item>
          <Item>Roughly when it happened, and the invoice or transaction if you have it.</Item>
          <Item>A short description of what went wrong.</Item>
        </List>
        <P>
          Please get in touch within <Strong>7 days</Strong> of the issue so the details are still
          fresh and we can look into it properly. We&apos;ll get back to you and aim to resolve it
          promptly.
        </P>
      </Section>

      <Section heading="6. What isn&apos;t covered">
        <List>
          <Item>A change of mind after band-aids have been added to your balance.</Item>
          <Item>Band-aids you bought but simply haven&apos;t used yet.</Item>
          <Item>
            Band-aids lost because a partnership was dissolved. Band-aids belong to the partnership,
            so dissolving it forfeits any that remain — they can&apos;t be refunded or restored.
          </Item>
          <Item>
            A partner declining to connect or take part — band-aids stay on your balance for you to
            use later.
          </Item>
          <Item>
            Your dissatisfaction with the AI&apos;s guidance. As our{" "}
            <Link href={routes.legalTerms} className="font-semibold text-blushd no-underline">
              Terms
            </Link>{" "}
            explain, this is AI-guided conversation, not professional advice, and outcomes
            aren&apos;t guaranteed.
          </Item>
          <Item>Loss of access caused by you breaking our Terms.</Item>
        </List>
      </Section>

      <Section heading="7. Your rights under the law">
        <P>
          Nothing in this policy takes away rights you have as a consumer under Indian law,
          including the Consumer Protection Act, 2019. If the law gives you a right to a refund or
          remedy in a particular situation, this policy doesn&apos;t override it — and we&apos;ll
          honour it.
        </P>
      </Section>

      <Section heading="8. Payments and your provider">
        <P>
          Payments are handled by a third-party payment provider. Where a refund is due, the time it
          takes to reach you depends on your bank or provider. Worth Fighting For is operated by{" "}
          <Strong>Imtiyaz Iqbal Sayyid</Strong>, Mumbai, India.
        </P>
      </Section>
    </LegalShell>
  );
}

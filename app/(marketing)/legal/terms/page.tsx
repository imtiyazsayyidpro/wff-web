import type { Metadata } from "next";
import Link from "next/link";
import { LegalShell, Section, P, List, Item, Strong, Callout } from "@/components/legal/LegalDoc";
import { routes } from "@/config/routes";

export const metadata: Metadata = { title: "Terms of Service · Worth Fighting For" };

/*
 * ⚠️ RISK NOTES (see chat for the full list):
 *   - Operator is Imtiyaz Iqbal Sayyid, a sole proprietor in Mumbai. As a sole proprietor you
 *     carry UNLIMITED PERSONAL LIABILITY — consider an LLP/Pvt Ltd before any real scale.
 *   - The "not therapy" disclaimer + crisis line and the liability/indemnity clauses are the
 *     load-bearing safeguards here; do not soften them without advice.
 */

export default function TermsPage() {
  return (
    <LegalShell
      current="terms"
      eyebrow="Terms of Service"
      title="The agreement between us."
      lead="These terms explain what Worth Fighting For is, who can use it, and the rules we both agree to. By using the app, you accept them."
      updated="18 June 2026"
    >
      <Callout tone="warn" title="Please read this first — Worth Fighting For is not therapy">
        <p>
          Worth Fighting For offers <Strong>AI-guided conversations</Strong> for couples. It is{" "}
          <Strong>not therapy, counseling, or medical advice</Strong>, and it is not a substitute
          for care from a licensed mental-health or healthcare professional. The AI is not a
          person, not a doctor, and not a crisis service.
        </p>
        <p>
          If you or your partner are in crisis, feel unsafe, or are thinking about harming
          yourselves or anyone else, please stop and contact your local emergency services or a
          qualified professional immediately. In India you can reach the Tele-MANAS mental-health
          helpline at <Strong>14416</Strong>.
        </p>
      </Callout>

      <Section heading="1. Who we are">
        <P>
          Worth Fighting For (&ldquo;the app,&rdquo; &ldquo;the service,&rdquo; &ldquo;we,&rdquo;
          &ldquo;us,&rdquo; or &ldquo;our&rdquo;) is operated by{" "}
          <Strong>Imtiyaz Iqbal Sayyid</Strong>, a sole proprietor based in Mumbai, India. You can
          reach us at{" "}
          <a href="mailto:info@worthfightingfor.in" className="font-semibold text-blushd no-underline">
            info@worthfightingfor.in
          </a>
          .
        </P>
        <P>
          These Terms of Service (&ldquo;Terms&rdquo;) form a binding agreement between you and us.
          They work together with our{" "}
          <Link href={routes.legalPrivacy} className="font-semibold text-blushd no-underline">
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link href={routes.legalRefunds} className="font-semibold text-blushd no-underline">
            Refund Policy
          </Link>
          . If you don&apos;t agree with them, please don&apos;t use the app.
        </P>
      </Section>

      <Section heading="2. Who can use Worth Fighting For">
        <P>To create an account and use the service, you confirm that:</P>
        <List>
          <Item>
            You are at least <Strong>18 years old</Strong> and legally able to enter into a
            contract.
          </Item>
          <Item>
            The information you give us is true, and you&apos;ll keep it up to date.
          </Item>
          <Item>
            You are using the app for your own genuine, lawful, personal use — not on behalf of
            anyone else without their knowledge.
          </Item>
        </List>
        <P>
          We don&apos;t independently verify ages. If we learn that someone under 18 has created an
          account, we may suspend or remove it.
        </P>
      </Section>

      <Section heading="3. What the service is — and is not">
        <P>
          Worth Fighting For uses artificial intelligence to gently mediate and guide turn-based
          conversations between two partners. The &ldquo;counselor&rdquo; in the app is an{" "}
          <Strong>AI counselor</Strong> — software that helps you take turns, slow down, and hear
          one another. It is a mediator, not a person. That is the whole of what it does.
        </P>
        <List>
          <Item>
            We hold <Strong>no professional license</Strong> of any kind. The app is{" "}
            <Strong>not</Strong> a licensed counselor, therapist, psychologist, or medical provider,
            and using it does not create any professional, clinical, or fiduciary relationship.
          </Item>
          <Item>
            It does <Strong>not</Strong> diagnose, treat, or provide advice on medical,
            psychological, legal, or financial matters. It is here to guide a conversation, nothing
            more.
          </Item>
          <Item>
            The guidance is produced by a <Strong>third-party AI model</Strong> and is{" "}
            <Strong>highly probabilistic</Strong> — it can be wrong, incomplete, or unintentionally
            insensitive. Treat anything important as something to verify, not as fact or advice.
          </Item>
          <Item>
            It is not designed for emergencies, abuse, or crisis situations. If you are unsafe, seek
            qualified help (see the note at the top of this page).
          </Item>
        </List>
      </Section>

      <Section heading="4. Your account">
        <P>
          You&apos;re responsible for keeping your login details private and for everything that
          happens under your account. Please tell us promptly at info@worthfightingfor.in if you
          think someone else has accessed it. Don&apos;t share your account, and don&apos;t use
          anyone else&apos;s.
        </P>
      </Section>

      <Section heading="5. Partnerships and the other person">
        <P>
          The app is built for two people who choose to connect. When you invite a partner and they
          accept, you form a partnership and may share guided sessions together.
        </P>
        <List>
          <Item>
            Only invite someone who has freely agreed to take part. Never use the app to pressure,
            monitor, deceive, or control another person.
          </Item>
          <Item>
            Conversations in a session are shared with your partner by design. Please treat what is
            said with the same care you&apos;d want for yourself.
          </Item>
          <Item>
            Either of you can end the partnership. When a partnership is dissolved, shared access to
            future sessions stops, and data is handled as described in our Privacy Policy.
          </Item>
          <Item>
            <Strong>Band-aids belong to the partnership, not to one person.</Strong> If the
            partnership is dissolved, any remaining band-aids are{" "}
            <Strong>forfeited and lost permanently</Strong> — they are not refunded, not transferred
            to a new partnership, and not restored if you reconnect. To use the app again you&apos;d
            need to buy new ones. Please be sure before you dissolve.
          </Item>
        </List>
      </Section>

      <Section heading="6. Band-aids, plans and payments">
        <P>
          Sessions run on <Strong>band-aids</Strong>. One band-aid covers a single one-hour guided
          conversation. We may offer band-aids individually or in plans, and we may give some away
          (for example, a free band-aid to start). Prices and what each plan includes are shown in
          the app before you buy.
        </P>
        <List>
          <Item>
            Payments are processed by third-party payment providers. We don&apos;t store your full
            card details. Your purchase is also subject to that provider&apos;s terms.
          </Item>
          <Item>
            Band-aids are a digital benefit that belongs to your <Strong>partnership</Strong>, not
            to you individually. They have no cash value, can&apos;t be exchanged for money, and
            can&apos;t be transferred or sold. If the partnership is dissolved they are lost (see
            section 5).
          </Item>
          <Item>
            Refunds are covered separately in our{" "}
            <Link href={routes.legalRefunds} className="font-semibold text-blushd no-underline">
              Refund Policy
            </Link>
            .
          </Item>
          <Item>
            We may change the price of band-aids and plans, or change what plans we offer,{" "}
            <Strong>at any time and at our discretion</Strong> — including to reflect changes in our
            costs, such as the cost of the AI. New prices apply only to purchases made after the
            change; they never affect band-aids you&apos;ve already bought. The price you see at
            checkout is the price you pay for that purchase.
          </Item>
        </List>
      </Section>

      <Section heading="7. Using the app fairly">
        <P>When using Worth Fighting For, please don&apos;t:</P>
        <List>
          <Item>Break any law, or use the app to harm, harass, threaten, or abuse anyone.</Item>
          <Item>
            Impersonate someone else, or add a &ldquo;partner&rdquo; without their genuine consent.
          </Item>
          <Item>
            Try to break, overload, reverse-engineer, scrape, or get around the security of the app
            or the AI.
          </Item>
          <Item>
            Use the service to build a competing product, or to train other AI models on our content
            or your conversations.
          </Item>
          <Item>Upload anything unlawful, or content that isn&apos;t yours to share.</Item>
        </List>
      </Section>

      <Section heading="8. Your conversations and content">
        <P>
          What you write stays yours. To run the service, you give us permission to store and
          process your messages, notes, and other content — including sending them to the AI that
          guides your sessions — so we can provide, maintain, secure, and improve the app. How we
          handle this is set out in the{" "}
          <Link href={routes.legalPrivacy} className="font-semibold text-blushd no-underline">
            Privacy Policy
          </Link>
          .
        </P>
        <P>
          You&apos;re responsible for what you share. Please don&apos;t post content you don&apos;t
          have the right to share, or that infringes someone else&apos;s rights.
        </P>
      </Section>

      <Section heading="9. The AI&apos;s limits, and your decisions">
        <P>
          Sessions are guided by a <Strong>third-party AI model</Strong> that generates responses
          automatically. Its output is <Strong>highly probabilistic</Strong>: it can be inaccurate,
          outdated, or inappropriate, and it does not understand your situation the way a person
          would. Please treat what it says as a prompt for your own thinking, and verify anything
          that matters. We do not guarantee any outcome for your relationship, and we do not take
          responsibility for what the AI says or how it responds.
        </P>
        <P>
          Worth Fighting For is a tool you use <Strong>at your own discretion</Strong>. The choices
          you make, the words you say to your partner, and the actions you take during or after a
          session are your own. <Strong>You are solely responsible for your actions</Strong>, and we
          accept no responsibility or liability for them.
        </P>
      </Section>

      <Section heading="10. Our intellectual property">
        <P>
          The app, its design, brand, the &ldquo;First Light&rdquo; look, the counselor characters,
          and all software are owned by us or our licensors. We grant you a personal, limited,
          non-transferable, revocable right to use the app as intended. Everything not expressly
          granted is reserved.
        </P>
      </Section>

      <Section heading="11. Suspending or ending access">
        <P>
          You can stop using the app and close your account at any time from settings. We may
          suspend or end your access if you break these Terms, if it&apos;s needed to protect users
          or the service, or if we&apos;re required to by law. Where it&apos;s reasonable and
          lawful, we&apos;ll try to let you know.
        </P>
      </Section>

      <Section heading="12. The service is provided &ldquo;as is&rdquo;">
        <P>
          We work hard to keep Worth Fighting For helpful and available, but we provide it on an{" "}
          <Strong>&ldquo;as is&rdquo; and &ldquo;as available&rdquo;</Strong> basis. To the fullest
          extent allowed by law, we make no warranties that the service will be uninterrupted,
          error-free, secure, or that the AI&apos;s output will be accurate or suitable for your
          situation. Any warranties not expressly stated here are disclaimed.
        </P>
      </Section>

      <Section heading="13. Our liability">
        <P>
          To the fullest extent permitted by law, we will not be liable for any indirect,
          incidental, special, or consequential loss, or for any emotional, relationship,
          reputational, or other harm arising from your use of — or inability to use — the app or
          the AI&apos;s output.
        </P>
        <P>
          Where liability cannot lawfully be excluded, our total liability to you for any claim is
          limited to the amount you actually paid us for band-aids in the three months before the
          event giving rise to the claim. Nothing in these Terms limits any liability that cannot be
          limited under applicable Indian law, including your rights as a consumer.
        </P>
      </Section>

      <Section heading="14. Indemnity">
        <P>
          You agree to cover us for reasonable losses, claims, and costs that arise from your misuse
          of the app, your breach of these Terms, or your violation of someone else&apos;s rights or
          the law — except to the extent the loss was caused by us.
        </P>
      </Section>

      <Section heading="15. Changes">
        <P>
          We may update the app and these Terms from time to time. If we make a significant change,
          we&apos;ll update the &ldquo;last updated&rdquo; date and, where appropriate, let you know
          in the app. Continuing to use Worth Fighting For after a change means you accept the
          updated Terms.
        </P>
      </Section>

      <Section heading="16. Governing law and disputes">
        <P>
          These Terms are governed by the laws of India. We&apos;d always rather sort things out
          kindly first — so please write to us at info@worthfightingfor.in and give us a fair chance
          to help. If a dispute can&apos;t be resolved, the courts at{" "}
          <Strong>Mumbai, Maharashtra</Strong>, India will have exclusive jurisdiction, subject to
          any consumer-protection rights that entitle you to bring a claim elsewhere.
        </P>
      </Section>

      <Section heading="17. Contact">
        <P>
          For anything about these Terms, write to us at{" "}
          <a href="mailto:info@worthfightingfor.in" className="font-semibold text-blushd no-underline">
            info@worthfightingfor.in
          </a>
          . We read every message.
        </P>
      </Section>
    </LegalShell>
  );
}

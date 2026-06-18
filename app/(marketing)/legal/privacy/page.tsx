import type { Metadata } from "next";
import Link from "next/link";
import { LegalShell, Section, P, List, Item, Strong, Callout } from "@/components/legal/LegalDoc";
import { routes } from "@/config/routes";

export const metadata: Metadata = { title: "Privacy Policy · Worth Fighting For" };

/*
 * ⚠️ RISK NOTES / things to make TRUE before launch (see chat for full list):
 *   Operator: Imtiyaz Iqbal Sayyid (sole proprietor, Mumbai).
 *   This policy DESCRIBES protections (encryption, minimisation, deletion, a grievance contact).
 *   Under India's DPDP Act 2023 you must actually DO them. Session transcripts are intimate /
 *   high-sensitivity data — a breach here is your biggest exposure. If the AI provider that guides
 *   sessions is outside India, that's a cross-border transfer you must disclose & consent to
 *   (covered in §6); fill in the provider once chosen.
 */

export default function PrivacyPage() {
  return (
    <LegalShell
      current="privacy"
      eyebrow="Privacy Policy"
      title="Your trust, looked after."
      lead="Your conversations are some of the most personal things you can share. This explains what we collect, why, and the control you keep over it."
      updated="18 June 2026"
    >
      <Callout tone="warn" title="The short version">
        <p>
          We collect what we need to run the app and guide your sessions — nothing we sell. Your
          private conversations are processed by AI to provide the service, kept as securely as we
          can, and you can ask us to access or delete your data at any time.
        </p>
      </Callout>

      <Section heading="1. Who this applies to">
        <P>
          This policy explains how <Strong>Imtiyaz Iqbal Sayyid</Strong> (&ldquo;we,&rdquo;
          &ldquo;us&rdquo;), a sole proprietor in Mumbai, India operating Worth Fighting For, handles
          personal data of people who use the app. It should be read with our{" "}
          <Link href={routes.legalTerms} className="font-semibold text-blushd no-underline">
            Terms of Service
          </Link>
          .
        </P>
      </Section>

      <Section heading="2. What we collect">
        <P>We collect only what we need to give you the service:</P>
        <List>
          <Item>
            <Strong>Account details</Strong> — your email address, your name (optional), how you
            sign in (email and password, or Google), and whether your email is verified. If you use
            Google, we receive a basic identifier from Google; we never see your Google password.
          </Item>
          <Item>
            <Strong>Profile details</Strong> — the age range and gender you choose to share during
            onboarding, used to help the AI guide your sessions.
          </Item>
          <Item>
            <Strong>Partnership details</Strong> — who you&apos;ve invited or connected with, and the
            status of that connection.
          </Item>
          <Item>
            <Strong>Your conversations and notes</Strong> — the messages you exchange in guided
            sessions, the memories and notes you save, and notes the AI keeps to give continuity
            between sessions. These can be sensitive and personal.
          </Item>
          <Item>
            <Strong>Payment and band-aid records</Strong> — your plan purchases, invoices,
            band-aid balance, and transaction history. Card details are handled by our payment
            provider, not stored by us.
          </Item>
          <Item>
            <Strong>Technical information</Strong> — basic data needed to run a secure app, such as
            device and browser information, approximate timing of activity, and error logs.
          </Item>
        </List>
      </Section>

      <Section heading="3. Why we use it">
        <List>
          <Item>To create and run your account and partnership.</Item>
          <Item>To provide guided sessions and let the AI respond helpfully and with continuity.</Item>
          <Item>To process purchases, manage band-aids, and send invoices.</Item>
          <Item>To send essential messages — email verification, password resets, and service updates.</Item>
          <Item>To keep the app safe, fix problems, prevent misuse, and meet legal obligations.</Item>
        </List>
        <P>
          We rely on your consent and on the need to perform our agreement with you. We do{" "}
          <Strong>not</Strong> sell your personal data, and we don&apos;t use your private
          conversations to show you ads.
        </P>
      </Section>

      <Section heading="4. Your conversations and the AI">
        <P>
          We want to be upfront: to guide a session, the content of your conversation is sent to a{" "}
          <Strong>third-party AI model</Strong> that generates the responses you see. That model
          processes your messages to produce its guidance. We use this processing to provide and
          improve the quality and safety of the service, and we take care to limit who and what can
          access this content.
        </P>
        <P>
          We do not use your private conversations to train AI models for unrelated purposes, and we
          ask our AI provider to handle your content only to deliver the service to you. As noted in
          our Terms, the AI is software, not a professional — please don&apos;t share more than you
          need to, and never share information you&apos;re not comfortable being processed.
        </P>
      </Section>

      <Section heading="5. Who we share it with">
        <P>We share personal data only in these limited ways:</P>
        <List>
          <Item>
            <Strong>Your partner</Strong> — by design, the messages within a shared session are
            visible to the partner you&apos;re in session with.
          </Item>
          <Item>
            <Strong>Service providers</Strong> — trusted companies that help us run the app, such as
            our hosting provider, the AI provider that powers sessions, our email provider, and our
            payment provider. They may only use the data to provide their service to us.
          </Item>
          <Item>
            <Strong>Legal reasons</Strong> — if we&apos;re required by law, or need to protect the
            rights, safety, or property of users or ourselves.
          </Item>
        </List>
        <P>We do not sell or rent your personal data to anyone.</P>
      </Section>

      <Section heading="6. Where your data is processed">
        <P>
          Some of our service providers — including the AI provider that powers sessions — may
          process data on servers outside India. Where that happens, we take reasonable steps to see
          that your data stays protected to a standard consistent with this policy and applicable
          law. By using the app, you consent to this processing.
        </P>
      </Section>

      <Section heading="7. How long we keep it">
        <P>
          We keep your data for as long as your account is active, and for as long as we reasonably
          need it to provide the service, meet legal and tax obligations (for example, keeping
          invoices), and resolve disputes. When you delete your account or ask us to remove your
          data, we&apos;ll delete or anonymise it within a reasonable period, except where we&apos;re
          required to keep certain records.
        </P>
      </Section>

      <Section heading="8. How we protect it">
        <P>
          We use reasonable technical and organisational measures to protect your data, and we limit
          access to it. No service can promise perfect security, but we work to keep your
          information safe and to act quickly if something goes wrong.
        </P>
      </Section>

      <Section heading="9. Your choices and rights">
        <P>Subject to applicable law, including India&apos;s data-protection law, you may:</P>
        <List>
          <Item>Access the personal data we hold about you, and ask us to correct it.</Item>
          <Item>Update your profile, or remove memories and notes, from within the app.</Item>
          <Item>Ask us to delete your account and personal data.</Item>
          <Item>Withdraw consent for processing (this may mean we can no longer provide the service).</Item>
          <Item>Raise a grievance with us about how your data is handled.</Item>
        </List>
        <P>
          To exercise any of these, write to us at{" "}
          <a href="mailto:info@worthfightingfor.in" className="font-semibold text-blushd no-underline">
            info@worthfightingfor.in
          </a>
          . We may need to verify your identity first.
        </P>
      </Section>

      <Section heading="10. Children">
        <P>
          Worth Fighting For is for adults. It is not intended for anyone under 18, and we do not
          knowingly collect data from children. If you believe a minor has used the app, please tell
          us and we&apos;ll remove the account.
        </P>
      </Section>

      <Section heading="11. Cookies and local storage">
        <P>
          We use your browser&apos;s local storage to keep you signed in and to remember your
          preferences, such as your light or dark theme. These are essential to how the app works.
          We don&apos;t use third-party advertising trackers.
        </P>
      </Section>

      <Section heading="12. Changes to this policy">
        <P>
          We may update this policy as the app evolves. We&apos;ll change the &ldquo;last
          updated&rdquo; date above and, for significant changes, let you know in the app.
        </P>
      </Section>

      <Section heading="13. Contact and grievances">
        <P>
          For any privacy question or request — including grievances under applicable
          data-protection law — write to us at{" "}
          <a href="mailto:info@worthfightingfor.in" className="font-semibold text-blushd no-underline">
            info@worthfightingfor.in
          </a>
          . We&apos;ll respond within the time the law requires.
        </P>
      </Section>
    </LegalShell>
  );
}

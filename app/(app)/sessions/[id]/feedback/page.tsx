import { FeedbackForm } from "@/components/session/FeedbackForm";

export default async function SessionFeedbackPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <FeedbackForm sessionId={Number(id)} />;
}

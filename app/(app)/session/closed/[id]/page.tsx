import { SessionRecap } from "@/components/session/SessionRecap";

export default async function SessionClosedPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <SessionRecap sessionId={Number(id)} />;
}

import { InvoiceView } from "@/components/store/InvoiceView";

export default async function InvoicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <InvoiceView purchaseId={Number(id)} />;
}

import { PageLayout } from "@/components/Layouts";

export default async function TagsPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const tag = (await params).tag;

  return <PageLayout>{""}</PageLayout>;
}

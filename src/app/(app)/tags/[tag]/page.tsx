import { PageLayout } from "@/components/Layouts";

export default async function TagsPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const tag = (await params).tag;

  return (
    <PageLayout>
      <h1 className="gap-2 font-notes-interBold text-2xl">
        <span className="text-gray-500">Notes Tagged:</span>{" "}
        <span>
          {tag
            .split("")
            .map((value, i) => (i === 0 ? value.toUpperCase() : value))
            .join("")}
        </span>
      </h1>
    </PageLayout>
  );
}

import { MobileNavigationContainerSearch } from "@/components/navigation/MobileNavigationContainer";

interface Params {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

export default async function SearchPage({ searchParams }: Params) {
  const param = (await searchParams).q;
  return (
    <>
      <div className="relative h-full overflow-y-scroll p-4 xl:hidden">
        {param && <MobileNavigationContainerSearch query={param} />}
      </div>
    </>
  );
}

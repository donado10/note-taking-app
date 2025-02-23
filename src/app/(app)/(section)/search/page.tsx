import { PageLayout } from "@/components/Layouts";
import { MobileNavigationContainerSearch } from "@/components/navigation/MobileNavigationContainer";
import SearchNote from "@/components/SearchNote";
import TitlePage from "@/components/TitlePage";

interface Params {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

export default async function SearchPage({ searchParams }: Params) {
  const param = (await searchParams).q;
  return (
    <>
      <div className="h-full xl:hidden">
        <div className="h-full overflow-y-scroll p-4">
          <TitlePage />
          <SearchNote />
          {param && <MobileNavigationContainerSearch query={param} />}
        </div>
      </div>
    </>
  );
}

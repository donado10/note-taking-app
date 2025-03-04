import { MobileNavigationContainerSearch } from "@/components/navigation/MobileNavigationContainer";
import SearchNote from "@/components/SearchNote";
import TitlePage from "@/components/TitlePage";
import IconNewNote from "@/assets/images/icon-plus.svg";
import Image from "next/image";

interface Params {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

export default async function SearchPage({ searchParams }: Params) {
  const param = (await searchParams).q;
  return (
    <>
      <div className="relative h-full xl:hidden">
        <div className="h-full overflow-y-scroll p-4">
          <TitlePage />
          <SearchNote />
          {param && <MobileNavigationContainerSearch query={param} />}
        </div>
        <button className="absolute bottom-0 right-4 flex h-12 w-12 items-center justify-center rounded-full bg-notes-blue-primary">
          <span>
            {" "}
            <Image src={IconNewNote} alt="" />
          </span>
        </button>
      </div>
    </>
  );
}

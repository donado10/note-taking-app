import { PageLayout } from "@/components/Layouts";
import { MobileNavigationContainerSearch } from "@/components/navigation/MobileNavigationContainer";
import TitlePage from "@/components/TitlePage";
import Image from "next/image";
import IconSearch from "@/assets/images/icon-search.svg";

export default function SearchPage() {
  return (
    <>
      <div className="h-full xl:hidden">
        <div className="h-full overflow-y-scroll p-4">
          <TitlePage />
          <div className="flex h-10 w-full items-center justify-center gap-2 rounded-lg border-[1px] p-2">
            <span>
              <Image src={IconSearch} alt="" />
            </span>
            <input
              type="text"
              className="w-full border-none outline-none"
              placeholder="Search by title, content, or tags…"
            />
          </div>
          <MobileNavigationContainerSearch />
        </div>
      </div>
    </>
  );
}

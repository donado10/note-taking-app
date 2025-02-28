import { ReactNode } from "react";
import { getData, getSearchData, NotesHandler } from "@/app/actions";
import { NotesNavigation } from "@/components/navigation/NotesNavigation";
import { Suspense } from "react";
import NotesContext from "@/context/NotesContext";
import Image from "next/image";
import IconArchive from "@/assets/images/icon-archive.svg";
import IconDelete from "@/assets/images/icon-delete.svg";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { INote } from "@/models/noteModel";
import { NotesNavigationWrapper } from "./Note/NoteContentSection";

export const PageLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full bg-white font-notes-interRegular">{children}</div>
  );
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const headerList = headers();
  let data: INote[] = [];
  const search = (await headerList).get("x-search-query")?.split("=");

  if (search) {
    data = await getSearchData(search[1]);
  } else {
    data = await NotesHandler();
  }

  return (
    <NotesContext value={data}>
      <div className="h-full flex-row xs:hidden xl:flex">
        <div className="h-full w-1/4 overflow-y-scroll border-r-[1px] p-4">
          <Suspense fallback="loading">
            <NotesNavigation data={data} />
          </Suspense>
        </div>
        <div className="h-full w-2/4 border-r-[1px]">{children}</div>
        <div className="flex h-full w-1/4 flex-col gap-2 p-2">
          <button className="flex w-full items-center gap-4 rounded-xl border-[1px] p-2">
            <span>
              <Image src={IconArchive} alt="" />
            </span>
            <span className="">Archive Note</span>
          </button>
          <button className="flex w-full items-center gap-4 rounded-xl border-[1px] p-2">
            <span>
              <Image src={IconArchive} alt="" />
            </span>
            <span className="">Delete Note</span>
          </button>
        </div>
      </div>
      <div className="h-full xl:hidden">{children}</div>
    </NotesContext>
  );
}

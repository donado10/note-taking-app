import { ReactNode } from "react";
import { NotesHandler } from "@/app/actions";
import { NotesNavigation } from "@/components/navigation/NotesNavigation";
import { Suspense } from "react";
import NoteContext from "@/context/NoteContext";
import Image from "next/image";
import IconArchive from "@/assets/images/icon-archive.svg";
import IconDelete from "@/assets/images/icon-delete.svg";
import { headers } from "next/headers";

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
  const pathname = (await headerList).get("x-current-path")?.split("/");
  console.log(pathname);
  const data = await NotesHandler();

  return (
    <NoteContext value={data}>
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
    </NoteContext>
  );
}

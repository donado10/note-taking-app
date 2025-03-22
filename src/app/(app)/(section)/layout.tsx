import { getSearchData, NotesHandler } from "@/app/actions";
import { NotesNavigation } from "@/components/navigation/NotesNavigation";
import NotesContext from "@/context/NotesContext";
import { INote } from "@/models/noteModel";
import { headers } from "next/headers";
import React, { ReactNode } from "react";

import Image from "next/image";
import IconArchive from "@/assets/images/icon-archive.svg";
import IconPlus from "@/assets/images/icon-plus.svg";

export default async function RootLayout({
  children,
  notesNavigation,
}: {
  children: ReactNode;
  notesNavigation: ReactNode;
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
    <>
      <div className="h-full overflow-hidden xl:hidden">{children}</div>
      <div className="h-full overflow-y-scroll xs:hidden xl:block">
        <NotesContext value={data}>
          <div className="h-full flex-row xs:hidden xl:flex">
            <div className="h-full w-1/4 overflow-y-scroll border-r-[1px] p-4">
              <div className="mb-2">
                <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-notes-blue-secondary py-3 text-white">
                  <span>
                    <Image src={IconPlus} alt="" />
                  </span>
                  <span>Create New Note</span>
                </button>
              </div>
              <div>{notesNavigation}</div>
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
      </div>
    </>
  );
}

import { getSearchData, NotesHandler } from "@/app/actions";
import { NotesNavigation } from "@/components/navigation/NotesNavigation";
import NotesContext from "@/context/NotesContext";
import { INote } from "@/models/noteModel";
import { headers } from "next/headers";
import React, { ReactNode } from "react";

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
      <NotesContext value={data}>
        <div className="h-full overflow-scroll xl:hidden">{children}</div>
        <div className="h-full overflow-y-scroll xs:hidden xl:block">
          <div className="h-full flex-row xs:hidden xl:flex">
            <div className="h-full w-1/4 overflow-y-scroll border-r-[1px] p-4">
              <div>{notesNavigation}</div>
            </div>
            <div className="h-full w-full">{children}</div>
          </div>
          <div className="h-full xl:hidden">{children}</div>
        </div>
      </NotesContext>
    </>
  );
}

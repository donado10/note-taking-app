import { getSearchData, NotesHandler } from "@/app/actions";
import { INote } from "@/models/noteModel";
import { headers } from "next/headers";
import React, { ReactNode } from "react";

const RootLayout = async ({ children }: { children: ReactNode }) => {
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
        {children}
      </div>
    </>
  );
};

export default RootLayout;

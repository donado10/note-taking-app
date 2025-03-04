"use server";

import { getSearchData, NotesHandler } from "@/app/actions";
import { NotesNavigation } from "@/components/navigation/NotesNavigation";
import React from "react";
import TitlePage from "../TitlePage";
import IconNewNote from "@/assets/images/icon-plus.svg";
import Image from "next/image";
import SearchNote from "../SearchNote";
const MobileNavigationContainer = async () => {
  const data = await NotesHandler();

  return (
    <>
      <div className="h-full overflow-y-scroll p-4">
        <TitlePage />
        {data && data.length > 0 && <NotesNavigation data={data} />}
      </div>
      <button className="absolute bottom-0 right-4 flex h-12 w-12 items-center justify-center rounded-full bg-notes-blue-primary">
        <span>
          {" "}
          <Image src={IconNewNote} alt="" />
        </span>
      </button>
    </>
  );
};

export const MobileNavigationContainerSearch = async ({
  query,
}: {
  query: string;
}) => {
  const data = await getSearchData(query);

  return <>{data && data.length > 0 && <NotesNavigation data={data} />}</>;
};

export default MobileNavigationContainer;

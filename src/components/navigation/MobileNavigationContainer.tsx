"use server";

import { getSearchData, NotesHandler } from "@/app/actions";
import { NotesNavigation } from "@/components/navigation/NotesNavigation";
import React from "react";
import TitlePage from "../TitlePage";
import Image from "next/image";

const MobileNavigationContainer = async () => {
  const data = await NotesHandler();

  return (
    <div className="h-full overflow-y-scroll p-4">
      <TitlePage />
      {data && data.length > 0 && <NotesNavigation data={data} />}
    </div>
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

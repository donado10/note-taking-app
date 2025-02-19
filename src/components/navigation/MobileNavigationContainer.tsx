"use server";

import { NotesHandler } from "@/app/actions";
import { NotesNavigation } from "@/components/navigation/NotesNavigation";
import React from "react";
import TitlePage from "../TitlePage";

const MobileNavigationContainer = async () => {
  const data = await NotesHandler();

  return (
    <div className="h-full overflow-y-scroll p-4">
      <TitlePage />
      {data && data.length > 0 && <NotesNavigation data={data} />}
    </div>
  );
};

export default MobileNavigationContainer;

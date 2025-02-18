"use server";

import { NotesHandler } from "@/app/actions";
import { NotesNavigation } from "@/components/navigation/NotesNavigation";
import React from "react";

const MobileNavigationContainer = async () => {
  const data = await NotesHandler();

  return (
    <div className="h-full overflow-y-scroll p-4">
      {data && data.length > 0 && <NotesNavigation data={data} />}
    </div>
  );
};

export default MobileNavigationContainer;

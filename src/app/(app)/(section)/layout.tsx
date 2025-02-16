import { NotesNavigation } from "@/components/NotesNavigation";
import React, { ReactNode } from "react";

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-full">
      <div className="xl:hidden">{children}</div>
      <div className="h-full xs:hidden xl:block">
        <div className="h-full w-1/4 border-r-[1px] p-4">
          <NotesNavigation />
        </div>
        {children}
      </div>
    </div>
  );
};

export default RootLayout;

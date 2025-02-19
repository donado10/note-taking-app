import { NotesHandler } from "@/app/actions";
import React, { ReactNode, Suspense } from "react";

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className="h-full xl:hidden">{children}</div>
      <div className="h-full overflow-y-scroll xs:hidden xl:block">
        {children}
      </div>
    </>
  );
};

export default RootLayout;

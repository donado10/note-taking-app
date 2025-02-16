import { NotesNavigationContainer } from "@/components/actions";
import React, { ReactNode, Suspense } from "react";

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className="xl:hidden">{children}</div>
      <div className="h-full overflow-y-scroll xs:hidden xl:block">
        <div className="h-full w-1/4 overflow-y-scroll border-r-[1px] p-4">
          <Suspense fallback="loading">
            <NotesNavigationContainer />
          </Suspense>
        </div>
        {children}
      </div>
    </>
  );
};

export default RootLayout;

import { NotesHandler } from "@/components/actions";
import { NotesNavigation } from "@/components/NotesNavigation";
import { ReactNode, Suspense } from "react";

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const data = await NotesHandler();
  return (
    <>
      <div className="h-full xs:hidden xl:block">
        <div className="h-full w-1/4 overflow-y-scroll border-r-[1px] p-4">
          <Suspense fallback="loading">
            <NotesNavigation data={data} />
          </Suspense>
        </div>
        {children}
      </div>
      <div className="xl:hidden">{children}</div>
    </>
  );
}

import { ReactNode } from "react";
import { NotesHandler } from "@/app/actions";
import { NotesNavigation } from "@/components/navigation/NotesNavigation";
import { Suspense } from "react";
import NoteContext from "@/context/NoteContext";
import TitlePage from "./TitlePage";

export const PageLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full bg-white font-notes-interRegular">{children}</div>
  );
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const data = await NotesHandler();

  return (
    <NoteContext value={data}>
      <div className="h-full flex-row xs:hidden xl:flex">
        <div className="h-full w-1/4 overflow-y-scroll border-r-[1px] p-4">
          <Suspense fallback="loading">
            <NotesNavigation data={data} />
          </Suspense>
        </div>
        <div className="h-full w-2/4">{children}</div>
      </div>
      <div className="h-full xl:hidden">{children}</div>
    </NoteContext>
  );
}

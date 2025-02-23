import { NotesHandler } from "@/app/actions";
import RootLayout from "@/components/Layouts";
import { NotesNavigation } from "@/components/navigation/NotesNavigation";
import { ReactNode, Suspense } from "react";

export default async function Layout({ children }: { children: ReactNode }) {
  return <RootLayout>{children}</RootLayout>;
}

"use client";

import React, { useContext } from "react";
import { NoteProvider } from "@/context/NoteContext";
import useMediaQuery, { EMediaQuery } from "@/hooks/useMediaQuery";
import MobileScreen from "@/components/MobileScreen";
import DesktopScreen from "@/components/DesktopScreen";
import { usePathname } from "next/navigation";
import { INote } from "@/app/actions";

export default function NoteContent() {
  const notesCtx = useContext(NoteProvider);
  const Mobile = useMediaQuery(EMediaQuery.MOBILE);
  const Big = useMediaQuery(EMediaQuery.BIG);
  const pathname = usePathname().split("/");

  const noteTitlePath = pathname
    .slice(-1)[0]
    .split("-")
    .join(" ")
    .toLowerCase();

  const note =
    notesCtx.data.find((note) => note.title.toLowerCase() === noteTitlePath) ??
    ({} as INote);

  return (
    <>
      {Mobile && !Big && <MobileScreen note={note} />}
      {Big && <DesktopScreen note={note} />}
    </>
  );
}

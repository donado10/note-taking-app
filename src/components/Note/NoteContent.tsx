"use client";

import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { NotesProvider } from "@/context/NotesContext";
import useMediaQuery, { EMediaQuery } from "@/hooks/useMediaQuery";
import MobileScreen from "@/components/Note/MobileScreen";
import DesktopScreen from "@/components//Note/DesktopScreen";
import { usePathname } from "next/navigation";
import { INote } from "@/models/noteModel";
import { NotesNavigation } from "../navigation/NotesNavigation";

interface INoteContext {
  note: INote | null;
  editNote?: (note: INote) => void;
}

export const NoteProvider = createContext<INoteContext | null>(null);

const NoteContext = ({
  note,
  children,
}: {
  note: INoteContext;
  children: ReactNode;
  editNote?: (note: INote) => void;
}) => {
  return <NoteProvider value={note}>{children}</NoteProvider>;
};

export default function NoteContent() {
  const notesCtx = useContext(NotesProvider);
  const Mobile = useMediaQuery(EMediaQuery.MOBILE);
  const Big = useMediaQuery(EMediaQuery.BIG);
  const pathname = usePathname().split("/");

  const noteTitlePath = pathname
    .slice(-1)[0]
    .split("-")
    .join(" ")
    .toLowerCase();

  const [note, setCurrentNote] = useState<INote>(
    notesCtx.data.find((note) => note.title.toLowerCase() === noteTitlePath) ??
      ({} as INote),
  );
  useEffect(() => {
    const actualNote = notesCtx.data.filter((note_) => note_._id === note._id);
    if (JSON.stringify(note) !== JSON.stringify(actualNote[0])) {
      notesCtx.editedNote!({ ...note });
    } else {
      notesCtx.editedNote!(null);
    }

    return;
  }, [JSON.stringify(note)]);

  return (
    <NoteContext note={{ note: note, editNote: setCurrentNote }}>
      {Mobile && !Big && <MobileScreen />}
      {Big && <DesktopScreen />}
    </NoteContext>
  );
}

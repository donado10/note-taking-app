"use client";

import {
  INoteMetadata,
  NoteFooter,
  NoteHeaderCreateNote,
  NoteMetadata,
  NoteText,
} from "@/components/Note/NoteContentSection";
import { INote } from "@/models/noteModel";
import { getISODate } from "@/utils/functions";
import React, { useContext, useEffect, useState } from "react";
import { mutate } from "swr";
import { redirect } from "next/navigation";
import NotesContext, { NotesProvider } from "@/context/NotesContext";

type Props = {};

const MobileScreen = (props: Props) => {
  const [noteMetadata, setNoteMetadata] = useState<INoteMetadata | null>({
    tags: "",
    title: "",
    lastEdited: "",
  });
  const notesCtx = useContext(NotesProvider);

  const [noteContent, setNoteContent] = useState<string>("");

  const [saveTrigger, setSaveTrigger] = useState(false);
  const [cancelTrigger, setCancelTrigger] = useState(false);

  useEffect(() => {
    if (!saveTrigger) {
      return;
    }
    if (!noteMetadata?.tags || !noteMetadata.title) {
      return;
    }
    const newNoteHandler = async () => {
      const new_note: INote = {
        lastEdited: getISODate(),
        title: noteMetadata?.title ?? "",
        tags: noteMetadata?.tags.split(",") ?? [],
        content: noteContent ?? "",
        isArchived: false,
      };

      const response = await fetch("http://localhost:3000/api/notes", {
        method: "POST",
        body: JSON.stringify({ notes: new_note }),
      });

      console.log(response.status);
      if (response.status === 200) {
        await mutate("http://localhost:3000/api/notes/tags");
        await mutate("http://localhost:3000/api/notes");

        setSaveTrigger(false);
        redirect("/");
      }
    };
    newNoteHandler();
  }, [saveTrigger]);

  return (
    <div className="flex h-full w-full flex-col gap-4">
      <NoteHeaderCreateNote
        onSave={setSaveTrigger}
        onCancel={setCancelTrigger}
      />
      <NoteMetadata
        metaData={{
          tags: noteMetadata?.tags ?? "",
          title: noteMetadata?.title ?? "",
          lastEdited: noteMetadata?.lastEdited ?? "",
        }}
        onChange={setNoteMetadata}
      />
      <NoteText content={noteContent} onChange={setNoteContent} />
    </div>
  );
};

export default MobileScreen;

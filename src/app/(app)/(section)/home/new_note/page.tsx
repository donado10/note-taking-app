"use client";

import {
  INoteMetadata,
  NoteFooter,
  NoteMetadata,
  NoteText,
} from "@/components/Note/NoteContentSection";
import { INote } from "@/models/noteModel";
import { getISODate } from "@/utils/functions";
import React, { useEffect, useState } from "react";
import { mutate } from "swr";

type Props = {};

const page = (props: Props) => {
  const [noteMetadata, setNoteMetadata] = useState<INoteMetadata | null>({
    tags: "",
    title: "",
    lastEdited: "",
  });

  const [noteContent, setNoteContent] = useState<string>("");

  const [saveTrigger, setSaveTrigger] = useState(false);
  const [cancelTrigger, setCancelTrigger] = useState(false);

  useEffect(() => {
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

      if (response.status === 200) {
        // router.push("/home");
        // router.refresh();
        await mutate("http://localhost:3000/api/notes/tags");
        await mutate("http://localhost:3000/api/notes");
      }
      setSaveTrigger(false);
    };
    newNoteHandler();
  }, [saveTrigger]);

  return (
    <div className="flex h-full flex-col gap-4 p-4">
      <NoteMetadata
        metaData={{
          tags: noteMetadata?.tags ?? "",
          title: noteMetadata?.title ?? "",
          lastEdited: noteMetadata?.lastEdited ?? "",
        }}
        onChange={setNoteMetadata}
      />
      <NoteText content={noteContent} onChange={setNoteContent} />
      <NoteFooter onSave={setSaveTrigger} onCancel={setCancelTrigger} />
    </div>
  );
};

export default page;

import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  NoteText,
  NoteHeader,
  NoteMetadata,
  INoteMetadata,
} from "./NoteContentSection";
import { INote } from "@/models/noteModel";
import { NotesProvider } from "@/context/NotesContext";
import { NoteProvider } from "./NoteContent";
import { redirect, useRouter } from "next/navigation";
import { archiveHandler, deleteHandler, saveHandler } from "./utils/api";

const MobileScreen = () => {
  const note = useContext(NoteProvider)?.note!;
  const notesCtx = useContext(NotesProvider);

  const [noteMetadata, setNoteMetadata] = useState<INoteMetadata | null>({
    tags: note.tags.join(","),
    title: note.title,
    lastEdited: note.lastEdited,
  });

  const [noteContent, setNoteContent] = useState<string>(note.content);

  const [saveTrigger, setSaveTrigger] = useState(false);
  const [cancelTrigger, setCancelTrigger] = useState(false);
  const router = useRouter();

  const cancelHandler = () => {
    const new_note: INote = {
      ...note,
      lastEdited: noteMetadata?.lastEdited ?? "",
      title: noteMetadata?.title ?? "",
      tags: noteMetadata?.tags.split(",") ?? [],
      content: noteContent ?? "",
    };

    const last_note = { ...note };

    setNoteMetadata({
      title: note?.title ?? "",
      tags: note?.tags.join(",") ?? "",
      lastEdited: note?.lastEdited ?? "",
    });

    setNoteContent(note.content ?? "");
  };

  useEffect(() => {
    if (saveTrigger) {
      const new_note: INote = {
        ...note,
        lastEdited: noteMetadata?.lastEdited ?? "",
        title: noteMetadata?.title ?? "",
        tags: noteMetadata?.tags.split(",") ?? [],
        content: noteContent ?? "",
      };
      saveHandler(new_note).then((res) => {
        if (res) {
          notesCtx.editNotes!([
            ...notesCtx.data.filter((note) => note._id !== new_note._id),
            new_note,
          ]);
        }
        setSaveTrigger(false);
      });

      return;
    }

    if (cancelTrigger) {
      cancelHandler();
      setCancelTrigger(false);
      return;
    }
  }, [saveTrigger, cancelTrigger]);

  const DeleteNoteHandler = () => {
    deleteHandler(String(note._id));
  };
  const ArchiveNoteHandler = () => {
    const archive_note: INote = {
      ...note,
      isArchived: true,
    };
    archiveHandler(archive_note).then((res) => {
      if (res) {
        notesCtx.editNotes!([
          ...notesCtx.data.filter((note) => note._id !== archive_note._id),
          archive_note,
        ]);
        redirect("/archived");
      }
    });
  };
  const restoreNoteHandler = () => {
    const archive_note: INote = {
      ...note,
      isArchived: false,
    };
    archiveHandler(archive_note).then((res) => {
      if (res) {
        notesCtx.editNotes!([
          ...notesCtx.data.filter((note) => note._id !== archive_note._id),
          archive_note,
        ]);
        redirect("/home");
      }
    });
  };

  return (
    <div className="flex h-full w-full flex-col gap-4">
      <NoteHeader
        onDelete={() => DeleteNoteHandler()}
        onArchive={() => ArchiveNoteHandler()}
        onRestore={() => restoreNoteHandler()}
        onSave={setSaveTrigger}
        onCancel={setCancelTrigger}
        isArchived={note.isArchived}
      />
      <NoteMetadata
        metaData={{
          tags: noteMetadata?.tags ?? "",
          title: noteMetadata?.title ?? "",
          lastEdited: noteMetadata?.title ?? "",
        }}
        onChange={setNoteMetadata}
      />
      <NoteText content={noteContent} onChange={setNoteContent} />
    </div>
  );
};

export default MobileScreen;

import { INote } from "@/models/noteModel";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  INoteMetadata,
  NoteFooter,
  NoteHeader,
  NoteMetadata,
} from "./NoteContentSection";
import { NoteText } from "./NoteContentSection";
import { NotesProvider } from "@/context/NotesContext";
import { NoteProvider } from "./NoteContent";
import { redirect, usePathname, useRouter } from "next/navigation";
import { revalidatePath, revalidateTag } from "next/cache";
import { useSWRConfig } from "swr";
import Image from "next/image";
import IconArchive from "@/assets/images/icon-archive.svg";
import IconRestore from "@/assets/images/icon-restore.svg";
import { archiveHandler, deleteHandler, saveHandler } from "./utils/api";

const DesktopScreen = () => {
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
  const pathname = usePathname();

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
      saveHandler(new_note).then(
        (res) =>
          res &&
          notesCtx.editNotes!([
            ...notesCtx.data.filter((note) => note._id !== new_note._id),
            new_note,
          ]),
      );

      setSaveTrigger(false);
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
    <div className="flex h-full w-full flex-row">
      <div className="flex h-full w-3/4 flex-col gap-4 border-r-[1px] p-4">
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
      <div className="flex h-full w-1/4 flex-col gap-2 p-2">
        {!note.isArchived && (
          <button
            onClick={ArchiveNoteHandler}
            className="flex w-full items-center gap-4 rounded-xl border-[1px] p-2"
          >
            <span>
              <Image src={IconArchive} alt="" />
            </span>
            <span className="">Archive Note</span>
          </button>
        )}
        {note.isArchived && (
          <button
            onClick={restoreNoteHandler}
            className="flex w-full items-center gap-4 rounded-xl border-[1px] p-2"
          >
            <span>
              <Image src={IconRestore} alt="" />
            </span>
            <span className="">Restore Note</span>
          </button>
        )}
        <button
          onClick={DeleteNoteHandler}
          className="flex w-full items-center gap-4 rounded-xl border-[1px] p-2"
        >
          <span>
            <Image src={IconArchive} alt="" />
          </span>
          <span className="">Delete Note</span>
        </button>
      </div>
    </div>
  );
};

export default DesktopScreen;

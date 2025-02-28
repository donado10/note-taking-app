import Image from "next/image";
import IconArrowLeft from "@/assets/images/icon-arrow-left.svg";
import IconDelete from "@/assets/images/icon-delete.svg";
import IconArchive from "@/assets/images/icon-archive.svg";
import IconTags from "@/assets/images/icon-tag.svg";
import IconClock from "@/assets/images/icon-clock.svg";
import { useRouter } from "next/navigation";
import {
  Ref,
  useActionState,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { convertToISODate, formatDate } from "@/utils/functions";
import { NoteProvider } from "./NoteContent";
import { NotesProvider } from "@/context/NotesContext";
import { updateNote } from "@/app/actions";
import { useFormState } from "react-dom";
import { INote } from "@/models/noteModel";

export const NoteHeader = () => {
  const router = useRouter();
  const notesCtx = useContext(NotesProvider);
  const noteCtx = useContext(NoteProvider);

  return (
    <div className="flex items-center justify-between border-b-[1px] pb-4">
      <button
        className="flex items-center gap-2 text-gray-500"
        onClick={() => {
          router.back();
          router.refresh();
        }}
      >
        <span>
          <Image src={IconArrowLeft} alt="" />
        </span>
        <span>Go Back</span>
      </button>
      <div className="flex items-center gap-8 text-gray-500">
        <button className="">
          <span>
            <Image src={IconDelete} alt="" />
          </span>
        </button>
        <button>
          <span>
            <Image src={IconArchive} alt="" />
          </span>
        </button>
        <button
          onClick={() => {
            notesCtx.editedNote!(null);
            const actualNote = notesCtx.data.filter(
              (note_) => note_._id === noteCtx?.note?._id,
            );
            console.log(actualNote);
            noteCtx?.editNote!(actualNote[0]);
          }}
        >
          <span>Cancel</span>
        </button>
        <button disabled={notesCtx.noteEdited === null}>
          <span className="text-notes-blue-secondary">Save Note</span>
        </button>
      </div>
    </div>
  );
};

export const NoteMetadata = ({
  title,
  tags,
  lastEdited,
}: {
  title: string;
  tags: string;
  lastEdited: string;
}) => {
  const noteCtx = useContext(NoteProvider);
  const note = { ...noteCtx?.note! };

  const [isEditDate, setIsEditDate] = useState(false);

  return (
    <div className="border-b-[1px] pb-4">
      <h1 className="mb-4 text-2xl font-bold">{title}</h1>
      <div className="mb-2 flex items-center">
        <div className="flex w-40 items-center gap-2">
          <Image src={IconTags} alt="" />
          <span>Tags</span>
        </div>
        <span>
          <input
            type="text"
            defaultValue={tags}
            onChange={(e) => {
              note.tags = e.currentTarget.value.split(",");
              noteCtx?.editNote!({ ...note });
            }}
          />
        </span>
      </div>
      <div className="flex items-center">
        <div className="flex w-40 items-center gap-2">
          <Image src={IconClock} alt="" />
          <span>Last edited</span>
        </div>
        <span onClick={() => setIsEditDate((prev) => !prev)}>
          {!isEditDate && lastEdited}
        </span>
        <span>
          {isEditDate && (
            <>
              <input
                type="date"
                defaultValue={convertToISODate(lastEdited)}
                onChange={(e) => {
                  note.lastEdited = formatDate(e.currentTarget.value);
                  noteCtx?.editNote!({ ...note });
                }}
              />
            </>
          )}
        </span>
      </div>
    </div>
  );
};

export const NoteText = ({ content }: { content: string }) => {
  const noteCtx = useContext(NoteProvider);
  const note = { ...noteCtx?.note! };
  const [contentValue, setContentValue] = useState(content);

  useEffect(() => {
    setContentValue(content);
  }, [content]);
  return (
    <div className="w-full flex-grow border-b-[1px] pb-4">
      <textarea
        className="h-full w-full outline-none"
        value={contentValue}
        name=""
        id=""
        onChange={(e) => {
          const value = e.target.value;
          setContentValue(value);
          note.content = value;
          noteCtx?.editNote!({ ...note });
        }}
      ></textarea>
    </div>
  );
};

export const NoteFooter = () => {
  const notesCtx = useContext(NotesProvider);
  const noteCtx = useContext(NoteProvider);
  const [state, formAction] = useActionState(
    updateNote.bind(null, noteCtx?.note!),
    null,
  );
  const router = useRouter();

  return (
    <div className="flex items-center gap-4">
      <form
        action={formAction}
        onClick={() => {
          let data = [
            ...notesCtx.data.filter((note) => note._id !== noteCtx?.note?._id),
          ];
          notesCtx.editNotes!([...data, noteCtx?.note!]);
          notesCtx.editedNote!(null);
        }}
      >
        <button
          disabled={notesCtx.noteEdited === null}
          className="w-fit rounded-lg bg-notes-blue-secondary p-2 text-xs text-white"
        >
          <span>Save Note</span>
        </button>
      </form>
      <button
        onClick={() => {
          notesCtx.editedNote!(null);
          const actualNote = notesCtx.data.filter(
            (note_) => note_._id === noteCtx?.note!._id,
          );
          noteCtx?.editNote!(actualNote[0]);
        }}
        className="w-fit rounded-lg bg-notes-blue-third p-2 text-xs text-black"
      >
        <span> Cancel</span>
      </button>
    </div>
  );
};

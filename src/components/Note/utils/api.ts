import { INote } from "@/models/noteModel";
import { redirect } from "next/navigation";
import { mutate } from "swr";

export const saveHandler = async (new_note: INote) => {
  const response = await fetch("http://localhost:3000/api/notes", {
    method: "PUT",
    body: JSON.stringify({ notes: new_note }),
  });

  if (response.status === 200) {
    await mutate("http://localhost:3000/api/notes/tags");
    await mutate("http://localhost:3000/api/notes");
    return true;
  }
  return false;
};

export const deleteHandler = async (id: string) => {
  const response = await fetch("http://localhost:3000/api/notes", {
    method: "DELETE",
    body: JSON.stringify({ note_id: id }),
  });

  if (response.status === 200) {
    await mutate("http://localhost:3000/api/notes/tags");
    await mutate("http://localhost:3000/api/notes");
    redirect("/home");
  }
};

export const archiveHandler = async (note: INote) => {
  const response = await fetch("http://localhost:3000/api/notes", {
    method: "PUT",
    body: JSON.stringify({ notes: note }),
  });

  if (response.status === 200) {
    await mutate("http://localhost:3000/api/notes/tags");
    await mutate("http://localhost:3000/api/notes");
    return true;
  }
  return false;
};

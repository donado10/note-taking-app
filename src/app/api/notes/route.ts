import noteModel, { INote } from "@/models/noteModel";
import { revalidatePath, revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import mongoose from "mongoose";

export async function GET(request: Request) {
  const data = await noteModel.find();

  return Response.json({ notes: data, revalidated: true });
}

export async function PUT(request: Request) {
  const req = await request.json();

  const note = req.notes;

  if (note) {
    const response = await noteModel.findByIdAndUpdate(
      String(note._id),
      {
        ...note,
      },
      { new: true },
    );

    return Response.json({ message: "Note updated", revalidated: true });
  }
  return new Response("Note not updated", {
    status: 400,
  });
}

export async function DELETE(request: Request) {
  const req = await request.json();

  const note_id = req.note_id;

  if (note_id) {
    const response = await noteModel.findByIdAndDelete(String(note_id));

    return Response.json({ message: "Note deleted", revalidated: true });
  }
  return new Response("Note not deleted", {
    status: 400,
  });
}

export async function POST(request: Request) {
  const req = await request.json();

  const note: INote = req.notes;

  const isNoteExist: INote | null = await noteModel.findOne({
    title: note.title.trim(),
  });

  if (note && !isNoteExist) {
    const response = await noteModel.create({
      _id: new mongoose.Types.ObjectId(),
      ...note,
    });

    return Response.json({
      message: "Note created",
      id: response._id,
      revalidated: true,
    });
  }
  return new Response("Note not created", {
    status: 400,
  });
}

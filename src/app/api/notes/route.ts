import noteModel from "@/models/noteModel";
import { revalidatePath, revalidateTag } from "next/cache";
import { cookies } from "next/headers";

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

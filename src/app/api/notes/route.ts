import noteModel from "@/models/noteModel";
import { cookies } from "next/headers";

export async function PUT(request: Request) {
  const req = await request.json();

  const note = req.notes;

  if (note) {
    console.log(note);
    const response = await noteModel.findByIdAndUpdate(
      String(note._id),
      {
        ...note,
      },
      { new: true },
    );

    return new Response("Note updated", {
      status: 200,
    });
  }
  return new Response("Note not updated", {
    status: 400,
  });
}

import noteModel, { INote } from "@/models/noteModel";

export async function GET(request: Request) {
  const notes = (await noteModel.find()) as INote[];

  const tags = notes
    .map((note) => note.tags.join(","))
    .join(",")
    .split(",");

  return Response.json({
    tags: Array.from(new Set(tags)),
  });
}

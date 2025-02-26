import mongoose from "mongoose";

export interface INote {
  _id: mongoose.Schema.Types.ObjectId;
  title: string;
  tags: string[];
  content: string;
  lastEdited: string;
  isArchived: boolean;
}

export const noteSchema = new mongoose.Schema<INote>({
  _id: mongoose.Schema.Types.ObjectId,
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  lastEdited: {
    type: String,
    required: true,
  },
  isArchived: {
    type: Boolean,
    required: true,
  },
  tags: {
    type: [String],
    required: false,
  },
});

const noteModel =
  mongoose.models.notes || mongoose.model<INote[]>("notes", noteSchema);

export default noteModel;

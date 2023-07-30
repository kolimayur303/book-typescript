// models/Book.ts
import { Schema, model, Document } from "mongoose";

export interface IBook extends Document {
  title: string;
  author: string;
  ISBN: string;
}

const BookSchema = new Schema<IBook>({
  title: { type: String, required: true },
  author: { type: String, required: true },
  ISBN: { type: String, required: true },
});

export default model<IBook>("Book", BookSchema);

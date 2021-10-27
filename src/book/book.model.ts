import * as mongoose from "mongoose";

export const BookSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  author: {
    required: true,
    type: String,
  },
  publishYear: {
    required: true,
    type: Number,
  },
});

export interface Book extends mongoose.Document {
  id: string;
  name: string;
  author: string;
  publishYear: number;
}

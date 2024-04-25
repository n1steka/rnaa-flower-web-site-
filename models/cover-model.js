import mongoose from "mongoose";

const coverSchema = new mongoose.Schema({
  photo: { type: String },
});

const Cover = mongoose.models.Product || mongoose.model("Cover", coverSchema);

export default Cover;

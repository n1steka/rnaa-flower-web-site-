import mongoose from "mongoose";

const additionalSchema = new mongoose.Schema({
  image: {
    type: String,
    default: "",
  },
});

const Additional =
  mongoose.models.Product || mongoose.model("Cover", additionalSchema);

export default Additional;

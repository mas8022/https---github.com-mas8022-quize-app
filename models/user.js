import mongoose, { Schema } from "mongoose";

const schema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    default: 0,
  },
});

const model = mongoose.models?.User || mongoose.model("User", schema);
export default model;

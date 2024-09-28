import mongoose, { Schema } from "mongoose";

const schema = new Schema(
  {
    sender: {
      type: String,
      required: true,
    },
    receiver: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const model = mongoose.models?.Message || mongoose.model("Message", schema);
export default model;

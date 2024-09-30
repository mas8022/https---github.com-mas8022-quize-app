import mongoose, { Schema } from "mongoose";
import userModel from "..//models/user";

const schema = new Schema({
  player1: {
    type: String,
    required: true,
  },
  player2: {
    type: String,
    required: true,
  },
});

const model = mongoose.models?.GameRoom || mongoose.model("GameRoom", schema);
export default model;

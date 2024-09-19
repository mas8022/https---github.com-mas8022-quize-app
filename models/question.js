import mongoose, { Schema } from "mongoose";

const schema = new Schema({
  question: {
    type: String,
    required: true,
  },
  answerOne: {
    type: String,
    required: true,
  },
  answerTwo: {
    type: String,
    required: true,
  },
  answerThree: {
    type: String,
    required: true,
  },
  answerFour: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  publish: {
    type: Boolean,
    default: false,
  },
});

const model = mongoose.models?.Question || mongoose.model("Question", schema);
export default model;

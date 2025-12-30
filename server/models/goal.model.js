import { Schema, model } from "mongoose";

const GoalSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    targetAmount: {
      type: Number,
      required: true,
    },
    currentAmount: {
      type: Number,
      default: 0,
    },
    deadline: {
      type: Date,
    },
    color: {
      type: String,
      default: "#2563eb",
    },
  },
  {
    timestamps: true,
  }
);

export default model("Goal", GoalSchema);

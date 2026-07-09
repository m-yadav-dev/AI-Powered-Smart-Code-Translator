import mongoose from "mongoose";

const historySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
      index: true,
    },

    type: {
      type: String,
      enum: {
        values: ["translate", "analyze", "optimize", "explain"],
        message:
          "Type must be one of 'translate', 'analyze', 'optimize', or 'explain'",
      },
    },
    inputCode: {
      type: String,
      required: [true, "Input code is required"],
    },
    sourceLanguage: {
      type: String,
      default: "",
    },
    targetLanguage: {
      type: String,
      default: "",
    },
    outputCode: {
      type: String,
      required: [true, "Output code is required"],
    },
  },
  {
    timestamps: true,
  },
);

const History = mongoose.model("History", historySchema);

export default History;

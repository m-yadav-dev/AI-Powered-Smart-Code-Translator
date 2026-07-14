import mongoose from "mongoose";

const historySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
      index: true,
    },

    action: {
      type: String,
      enum: {
        values: ["translation", "complexity_analysis", "code_optimization", "code_explanation"],
        message:
          "Action must be one of 'translation', 'complexity_analysis', 'code_optimization', or 'code_explanation'",
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

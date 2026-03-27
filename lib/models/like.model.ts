import mongoose, { Schema } from "mongoose";

const LikeSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    confessionId: {
      type: mongoose.Schema.Types.ObjectId,

      required: true,
    },
  },
  { timestamps: true },
);

LikeSchema.index({ confessionId: 1, userId: 1 }, { unique: true }); // para maiwasan ang duplicate like

const Like = mongoose.models.like || mongoose.model("like", LikeSchema);
export default Like;

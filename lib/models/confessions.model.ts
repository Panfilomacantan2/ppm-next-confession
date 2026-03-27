import mongoose, { Schema } from "mongoose";

const confessionSchema = new Schema({
  clerk_id: {
    type: String,
    required: true,
    index: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    index: true,
  },
  content: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 2000,
  },
  author: {
    type: String,
    default: "Anonymous",
  },
  avatar: {
    type: String,
    default: null,
  },
  feeling: {
    type: String,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: true,
  },

  comments: [
    {
      author: { type: String, default: "Anonymous" },
      content: { type: String, required: true },
      avatar: { type: String, default: null },
      createdAt: { type: Date, default: Date.now },
    },
  ],
});

// Indexes para mas mabilis
confessionSchema.index({ createdAt: -1 });

const Confession =
  mongoose.models.confession || mongoose.model("confession", confessionSchema);

export default Confession;

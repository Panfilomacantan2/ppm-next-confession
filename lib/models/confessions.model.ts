import mongoose, { Schema } from "mongoose";

const confessionSchema = new Schema({
  user_id: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 2000, // Limit the confession length to 2000 characters
  },
  author: {
    type: String,
    default: "Anonymous",
  },
  avatar: {
    type: String,
    required: false,
  },
  feeling: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  likes: {
    type: [String],
    default: [], // Ensure it defaults to an empty array
  },
  comments: [
    {
      author: {
        type: String,
        default: "Anonymous",
      },
      content: {
        type: String,
        required: true,
      },
      avatar: {
        type: String,
        required: false,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

// Export the model, or create it if it doesn't exist already
const Confession =
  mongoose.models.confession || mongoose.model("confession", confessionSchema);

export default Confession;

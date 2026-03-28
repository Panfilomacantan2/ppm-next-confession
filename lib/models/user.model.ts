import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  // Clerk ID - This is the most important field
  clerkId: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },

  // Basic info synced from Clerk
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  avatar: {
    type: String, // Clerk image URL
    default: null,
  },

  // Optional fields you might need later
  username: {
    type: String,
    sparse: true, // Allows null/undefined values
    unique: true,
  },

  onboarded: {
    type: Boolean,
    default: false,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt timestamp before saving
userSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

// Indexes for better performance
userSchema.index({ clerkId: 1 });
userSchema.index({ email: 1 });

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;

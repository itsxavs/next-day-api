import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
  },
  title: String,
  message: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});
const PostMessage = mongoose.model("Post", postSchema);
export default PostMessage;

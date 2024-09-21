import mongoose, { Schema, ObjectId } from "mongoose";

export interface Task {
  title: string;
  description: string;
  status: string;
}
export interface Boards {
  name: string;
  userId: ObjectId;
  Tasks: ObjectId;
}
export interface User extends Document {
  username: string;
  email: string;
  password: string;
  boards: Boards[];
}

export const TaskSchema: Schema<Task> = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: {
      type: String,
      enum: ["todo", "progress", "completed"],
      default: "todo",
    },
  },
  { timestamps: true }
);

export const BoardSchema: Schema<Boards> = new Schema(
  {
    name: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    Tasks: [
      {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Task",
        default: [],
      },
    ],
  },
  { timestamps: true }
);

const UserSchema = new Schema<User>(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    boards: { type: [BoardSchema], default: [] },
  },
  { timestamps: true }
);

const UserModel =
  mongoose.models.User || mongoose.model<User>("User", UserSchema);
const TaskModel =
  (mongoose.models.Task as mongoose.Model<Task>) ||
  mongoose.model<Task>("Task", TaskSchema);
const BoardModel =
  (mongoose.models.Boards as mongoose.Model<Boards>) ||
  mongoose.model("Boards", BoardSchema);
export { UserModel, TaskModel, BoardModel };

import mongoose, { Schema } from "mongoose";

export interface Task {
  title: string;
  description: string;
  status: string;
}
export interface Boards {
  Tasks: Task[];
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
    status: { type: String, enum: ["todo", "doing", "done"], default: "todo" },
  },
  { timestamps: true }
);

export const BoardSchema: Schema<Boards> = new Schema(
  {
    Tasks: [TaskSchema],
  },
  { timestamps: true }
);

const UserSchema = new Schema<User>(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    boards: { type: [BoardSchema], default: [] }, // Array of boards
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

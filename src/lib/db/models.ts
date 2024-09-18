import mongoose, { Schema, Document } from "mongoose";

export interface Task extends Document {
  title: string;
  description: string;
  status: string;
}
export interface Boards extends Document {
  Tasks: Task[];
}
export interface User extends Document {
  username: string;
  email: string;
  password: string;
  boards: Boards[];
}

export const TaskSchema = new Schema<Task>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, enum: ["todo", "doing", "done"], default: "todo" },
  },
  { timestamps: true }
);

export const BoardSchema = new Schema<Boards>(
  {
    Tasks: [TaskSchema],
  },
  { timestamps: true }
);

export const UserSchema = new Schema<User>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  boards: [BoardSchema],
});

const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", UserSchema);
const TaskModel =
  (mongoose.models.Task as mongoose.Model<Task>) ||
  mongoose.model<Task>("Task");
const BoardModel =
  (mongoose.models.Boards as mongoose.Model<Boards>) ||
  mongoose.model("Boards", BoardSchema);
export { UserModel, TaskModel, BoardModel };

import { BoardModel, TaskModel } from "@/lib/db/models";
export const CreateBoard = async ({
  userId,
  boardName,
}: {
  userId: string;
  boardName: string;
}) => {
  const newBoard = new BoardModel({
    name: boardName,
    userId,
  });
  await newBoard.save();
  return newBoard._id;
};

export const getBoards = async (userId: string) => {
  const boards = await BoardModel.find({ userId }).populate("Tasks");
  return JSON.parse(JSON.stringify(boards));
};

export const getBoard = async (boardId: string) => {
  const board = await BoardModel.findById(boardId).populate("Tasks");
  return JSON.parse(JSON.stringify(board));
};

export const createTodo = async ({
  boardId,
  title,
  description,
}: {
  boardId: string;
  title: string;
  description: string;
}) => {
  const currentBoard = await BoardModel.findById(boardId);
  const newTodo = new TaskModel({
    title: title,
    description: description,
  });
  if (!newTodo || !currentBoard) return;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  currentBoard.Tasks.push(newTodo?._id);
  await Promise.all([currentBoard.save(), newTodo.save()]);

  return newTodo;
};

export const DeleteBoard = async (boardId: string) => {
  const board = await BoardModel.findById(boardId);
  if (!board) return;
  await TaskModel.deleteMany({ _id: { $in: board.Tasks } });
  await BoardModel.findByIdAndDelete(boardId);
};

export const updateTask = async ({
  TaskId,
  status,
}: {
  TaskId: string;
  status: string;
}) => {
  const task = await TaskModel.findById(TaskId);
  if (!task) return;
  task.status = status;
  await task.save();
  return JSON.parse(JSON.stringify({ ...task, id: task._id }));
};

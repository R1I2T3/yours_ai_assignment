import { UserModel } from "@/lib/db/models";

export const getUserByEmailOrUserName = async (
  username: string,
  email: string
) => {
  const user = await UserModel.findOne({
    $or: [{ username }, { email }],
  });
  return user;
};

export const createUser = async (user: {
  username: string;
  email: string;
  password: string;
}) => {
  const newUser = new UserModel(user);
  await newUser.save();
  return newUser;
};

export const getUserById = async (id: string) => {
  const user = await UserModel.findOne({ _id: id });
  return user;
};

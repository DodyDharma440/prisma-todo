import { hashSync, compareSync } from "bcrypt";

const SALT = 10;

export const generateHash = (password: string) => {
  return hashSync(password, SALT);
};

export const decodeHash = (password: string, hash: string) => {
  return compareSync(password, hash);
};

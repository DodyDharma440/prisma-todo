import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export type WithLoggedUser = Request & {
  loggedUser?: JwtPayload;
};

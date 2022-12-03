import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export type WithLoggedUser<
  P = Record<string, string>,
  ResBody = any,
  ReqBody = any,
  ReqQuery = any,
  Locals extends Record<string, any> = Record<string, any>
> = Request<P, ResBody, ReqBody, ReqQuery, Locals> & {
  loggedUser?: JwtPayload & { id: string; username: string };
};

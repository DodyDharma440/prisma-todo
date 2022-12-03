import { NextFunction, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { createErrResponse } from "@/utils/response";
import { decodeToken } from "@/utils/jwt";
import { WithLoggedUser } from "@/utils/auth";

const prisma = new PrismaClient();

export const authentication = (
  req: WithLoggedUser,
  res: Response,
  next: NextFunction
) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization;
    req.loggedUser = decodeToken(token) as any;
    next();
    return;
  }
  res.status(401).json(createErrResponse("Unauthenticated", 401));
};

export const authorization = async (
  req: WithLoggedUser,
  res: Response,
  next: NextFunction
) => {
  if (req.loggedUser) {
    const todoId = req.params.id;
    const user = req.loggedUser;
    const userTodo = await prisma.todo.findUnique({ where: { id: todoId } });
    const isValid = user.id === userTodo?.userId;
    if (isValid) {
      next();
      return;
    }
    res.status(403).json(createErrResponse("Forbidden access", 403));
    return;
  }
  res.status(401).json(createErrResponse("Unauthenticated", 401));
};

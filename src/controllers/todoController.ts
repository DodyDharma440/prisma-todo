import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { createSuccessResponse } from "@/utils/response";
import { ITodoInput } from "@/interfaces/todo";
import { WithLoggedUser } from "@/utils/auth";

const prisma = new PrismaClient();

class TodoController {
  static async getTodos(req: WithLoggedUser, res: Response) {
    const todos = await prisma.todo.findMany({
      where: { userId: req.loggedUser?.id },
    });
    res.status(200).json(createSuccessResponse(todos));
  }
  static async getTodo(req: Request<{ id: string }>, res: Response) {
    const todo = await prisma.todo.findFirst({
      where: { id: req.params.id },
    });
    res.status(200).json(createSuccessResponse(todo));
  }
  static async createTodo(req: WithLoggedUser<{}, ITodoInput>, res: Response) {
    const newTodo = await prisma.todo.create({
      data: {
        ...req.body,
        userId: req.loggedUser?.id,
      },
    });
    res.status(201).json(createSuccessResponse(newTodo, 201));
  }
  static async updateTodo(
    req: Request<{ id: string }, ITodoInput>,
    res: Response
  ) {
    const updatedTodo = await prisma.todo.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.status(200).json(createSuccessResponse(updatedTodo));
  }
  static async deleteTodo(req: Request<{ id: string }>, res: Response) {
    await prisma.todo.delete({
      where: { id: req.params.id },
    });
    res.status(200).json(createSuccessResponse("Success"));
  }
}

export default TodoController;

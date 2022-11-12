import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { createSuccessResponse } from "../utils/response";

const prisma = new PrismaClient();

type TodoInput = {
  title: string;
  description: string;
};

class TodoController {
  static async getTodo(req: Request, res: Response) {
    const todos = await prisma.todo.findMany();
    res.status(200).json(createSuccessResponse(todos));
  }
  static async createTodo(req: Request<{}, TodoInput>, res: Response) {
    const newTodo = await prisma.todo.create({
      data: req.body,
    });
    res.status(201).json(createSuccessResponse(newTodo, 201));
  }
  static async updateTodo(
    req: Request<{ id: string }, TodoInput>,
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

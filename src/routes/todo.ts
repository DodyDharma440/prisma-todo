import express from "express";
import TodoController from "@/controllers/todoController";
import { authorization, authentication } from "@/middlewares/auth";

const router = express.Router();

router.use(authentication);
router.get("/todos", TodoController.getTodos);
router.get("/todos/:id", TodoController.getTodo);
router.post("/todos", TodoController.createTodo);
router.put("/todos/:id", authorization, TodoController.updateTodo);
router.delete("/todos/:id", authorization, TodoController.deleteTodo);

export default router;

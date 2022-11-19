import express from "express";
import TodoController from "@/controllers/todoController";

const router = express.Router();

router.get("/todos", TodoController.getTodo);
router.post("/todos", TodoController.createTodo);
router.put("/todos/:id", TodoController.updateTodo);
router.delete("/todos/:id", TodoController.deleteTodo);

export default router;

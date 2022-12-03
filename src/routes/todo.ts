import express from "express";
import TodoController from "@/controllers/todoController";
import { authentication, authorization } from "@/middlewares/auth";

const router = express.Router();

router.use(authentication);
router.use(authorization);
router.get("/todos", TodoController.getTodos);
router.get("/todos/:id", TodoController.getTodo);
router.post("/todos", TodoController.createTodo);
router.put("/todos/:id", TodoController.updateTodo);
router.delete("/todos/:id", TodoController.deleteTodo);

export default router;

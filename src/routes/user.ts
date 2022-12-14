import express from "express";
import UserController from "@/controllers/userController";

const router = express.Router();

router.post("/users", UserController.createUser);
router.post("/login", UserController.login);

export default router;

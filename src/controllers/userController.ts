import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { createErrResponse, createSuccessResponse } from "@/utils/response";
import { generateToken } from "@/utils/jwt";
import { generateHash, decodeHash } from "@/utils/bcrypt";
import { IUserInput } from "@/interfaces/user";

const prisma = new PrismaClient();

class UserController {
  static async createUser(req: Request<{}, any, IUserInput>, res: Response) {
    try {
      const { username, password } = req.body;

      const hashedPassword = generateHash(password);
      const newUser = await prisma.user.create({
        data: {
          username,
          password: hashedPassword,
        },
      });
      res.status(201).json(createSuccessResponse(newUser, 201));
    } catch (error) {
      res.status(400).json(createErrResponse(error, 400));
    }
  }
  static async login(req: Request<{}, any, IUserInput>, res: Response) {
    try {
      const { username, password } = req.body;
      const user = await prisma.user.findUnique({
        where: {
          username,
        },
      });

      if (user) {
        const isPasswordValid = decodeHash(password, user.password);
        if (isPasswordValid) {
          const { id, username } = user;
          const token = generateToken({ id, username });
          res.status(200).json(createSuccessResponse({ token }));
          return;
        }
        res
          .status(400)
          .json(createErrResponse("Invalid username or password", 400));
        return;
      }

      res
        .status(400)
        .json(createErrResponse("Invalid username or password", 400));
    } catch (error) {
      res.status(400).json(createErrResponse(error, 400));
    }
  }
}

export default UserController;

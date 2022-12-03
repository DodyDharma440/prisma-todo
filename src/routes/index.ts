import { Router } from "express";
import todoRouter from "./todo";
import userRouter from "./user";

const router = Router();

const withPrefix = (router: Router, prefix?: string) => {
  const _router = Router();
  return _router.use(prefix || "/api", router);
};

router.get("/", (req, res) => {
  res.send({
    message: "Hello world",
  });
});

router.use(userRouter);
router.use(todoRouter);

export default withPrefix(router);

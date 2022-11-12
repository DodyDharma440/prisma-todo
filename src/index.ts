import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import routes from "./routes";

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(routes);

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});

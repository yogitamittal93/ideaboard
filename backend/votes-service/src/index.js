import express from "express";
import cors from "cors";
import routes from "./routes.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/", routes);

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Votes service running on port ${PORT}`);
});

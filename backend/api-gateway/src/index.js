import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes.js";
import ideasRoutes from "./routes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", ideasRoutes);
app.use("/", routes);

const PORT = process.env.PORT || 4100;
app.listen(PORT, () => {
  console.log(`🚀 API Gateway running on port ${PORT}`);
});

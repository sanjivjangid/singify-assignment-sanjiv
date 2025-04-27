import express from "express";
import cors from "cors";

import { streetLightsRouter } from "./routes/api.routes";

const app = express();
app.use(cors());

const PORT = 3000;

app.use((req,res,next) =>{
  req.time = new Date(Date.now()).toString();
  console.log(req.method,req.hostname, req.path, req.time);
  next();
});

app.use("/api", streetLightsRouter);

app.get("/health-check", (req, res) => {
  res.send("hello from server");
});

app.listen(PORT, () => {
  console.log(`Server is running on port:: ${PORT}`);
});

import express from "express";
import { sampleData } from "../sampleData/streetLights";

const router = express.Router();

router.get("/street/lights", (req, res) => {
  try {
    res.json({ data: sampleData, status: true}).status(200);
  } catch (error) {
    res.json({ data: [], status: false}).status(500);
  }
  
});

export { router as streetLightsRouter };

import express from "express";
import { getCoordinatesAndTimestamp, test } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/test", test);
router.get("/coordinates", getCoordinatesAndTimestamp);
export default router;

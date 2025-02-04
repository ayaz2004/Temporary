import express from "express";
import { test,getCoordinates } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/test", test);
router.get("/coordinates", getCoordinates);

export default router;

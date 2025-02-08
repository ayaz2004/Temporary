import express from "express";
import {
  getCoordinatesAndTimestamp,
  test,
  signout,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/test", test);
router.post("/signout", signout);

router.get("/coordinates", getCoordinatesAndTimestamp);
export default router;

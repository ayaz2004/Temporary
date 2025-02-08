import express from "express";
import {
  getAllNearByVandors, getCoordinatesAndTimestamp,
  notifyUsersForVan, test,
  signout,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/test", test);
router.post("/signout", signout);

router.get("/coordinates", getCoordinatesAndTimestamp);
router.post("/notifynearbyvandors", getAllNearByVandors);
router.post("/notifyusersforvan", notifyUsersForVan);
export default router;

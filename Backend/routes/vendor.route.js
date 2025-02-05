import { Router } from "express";
import {
  addVendor,
  getAllVendors,
  getVendorById,
} from "../controllers/vendor.controller.js";

const router = Router();

router.post("/addVendor", addVendor);
router.get("/getAllVendors", getAllVendors);
router.get("/getVendor/:vendorId", getVendorById);

export default router;

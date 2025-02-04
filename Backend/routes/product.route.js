import { Router } from "express";
import {
  addProduct,
  getAllProducts,
  getProduct,
} from "../controllers/product.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
const router = Router();
router.post(
  "/add/:userId",
  upload.fields([{ name: "images", maxCount: 5 }]),
  addProduct
);

router.get("/getProduct/:productId", getProduct); // Route to get a specific product by pruductId
router.get("/getAllProducts", getAllProducts); // Route to get all products

export default router;

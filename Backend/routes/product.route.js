import { Router } from "express";
import { addProduct } from "../controllers/product.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
const router = Router();
router.post("/add/:userId", upload.fields([
 {   name: "images",
    maxCount: 5,}
]),addProduct);

export default router;
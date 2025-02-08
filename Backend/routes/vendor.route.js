import express from "express";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataFilePath = path.join(__dirname, "../data.json");

// Get Vendor Dashboard Data
router.get("/dashboard/:vendorName", async (req, res) => {
  try {
    const { vendorName } = req.params;
    const decodedVendorName = decodeURIComponent(vendorName).trim();

    const data = await fs.readFile(dataFilePath, "utf8");
    const jsonData = JSON.parse(data);

    const vendorData = jsonData.vendorCollectionsHistory[decodedVendorName];

    if (!vendorData) {
      return res.status(404).json({ error: "Vendor not found" });
    }

    res.json({ collectionHistory: vendorData });
  } catch (err) {
    console.error("Error reading vendor dashboard data:", err);
    res.status(500).json({ error: "Failed to load vendor dashboard data" });
  }
});

export default router;

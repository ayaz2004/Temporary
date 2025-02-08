import express from "express";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataFilePath = path.join(__dirname, "../data.json");

// Get Dashboard Data
router.get("/dashboard", async (req, res) => {
  try {
    const data = await fs.readFile(dataFilePath, "utf8");
    const jsonData = JSON.parse(data);
    res.json(jsonData.dashboard);
  } catch (err) {
    res.status(500).json({ error: "Failed to read dashboard data" });
  }
});


// ✅ Get User Dashboard Data
router.get("/user/dashboard/:email", async (req, res) => {
    try {
      const email = decodeURIComponent(req.params.email);
      const data = await fs.readFile(dataFilePath, "utf8");
      const jsonData = JSON.parse(data);
  
      if (!jsonData.users || !Array.isArray(jsonData.users)) {
        return res.status(500).json({ error: "Invalid data format" });
      }
  
      const user = jsonData.users.find((u) => u.email === email);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      res.json({
        name: user.name,
        wastePosted: user.wastePosted || [],
        wasteCollected: user.wasteCollected || [],
      });
    } catch (err) {
      console.error("Error reading user dashboard data:", err);
      res.status(500).json({ error: "Failed to load user dashboard data" });
    }
  });

  
// Get Pending Vendors
router.get("/vendors/pending", async (req, res) => {
  try {
    const data = await fs.readFile(dataFilePath, "utf8");
    const jsonData = JSON.parse(data);
    res.json(jsonData.pendingVendors);
  } catch (err) {
    res.status(500).json({ error: "Failed to read vendor data" });
  }
});



// Approve or Reject Vendor
router.post("/vendors/:status/:id", async (req, res) => {
  const { status, id } = req.params;

  try {
    const data = await fs.readFile(dataFilePath, "utf8");
    let jsonData = JSON.parse(data);

    jsonData.pendingVendors = jsonData.pendingVendors.filter((vendor) => vendor.id != id);

    await fs.writeFile(dataFilePath, JSON.stringify(jsonData, null, 2));
    res.json({ message: `Vendor ${id} has been ${status === "verify" ? "approved" : "rejected"}` });
  } catch (err) {
    res.status(500).json({ error: "Failed to save changes" });
  }
});

// console.log("Looking for data.json at:", dataFilePath);


router.get("/vendors/dashboard/:vendorName", async (req, res) => {
    try {
      const { vendorName } = req.params;
      const decodedVendorName = decodeURIComponent(vendorName).trim();
  
      console.log(`Fetching vendor data for: ${decodedVendorName}`);
  
      const data = await fs.readFile(dataFilePath, "utf8");
      const jsonData = JSON.parse(data);
  
      // Check if vendorCollectionsHistory exists
      if (!jsonData.vendorCollectionsHistory || !jsonData.vendorCollectionsHistory[decodedVendorName]) {
        return res.status(404).json({ error: "Vendor not found" });
      }
  
      res.json({ collectionHistory: jsonData.vendorCollectionsHistory[decodedVendorName] });
    } catch (err) {
      console.error("Error reading vendor dashboard data:", err);
      res.status(500).json({ error: "Failed to load vendor dashboard data" });
    }
  });
  


export default router;

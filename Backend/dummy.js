import express from "express";
import cors from "cors";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import dataRoutes from "./routes/data.route.js";



const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", dataRoutes);

// Get __dirname in ES Modules
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataFilePath = path.join(__dirname, "./data.json");

const checkAdmin = (req, res, next) => {
    const { role } = req.headers; // Get role from frontend request
    if (role !== "admin") {
      return res.status(403).json({ error: "Access Denied: Admins only!" });
    }
    next();
};

//  API Route to Fetch Admin Dashboard Data
app.get("/api/dashboard", async (req, res) => {
  try {
    const data = await fs.readFile(dataFilePath, "utf8");
    const jsonData = JSON.parse(data);
    res.json(jsonData.dashboard);
  } catch (err) {
    res.status(500).json({ error: "Failed to load dashboard data" });
  }
});

//  API Route to Fetch Pending Vendors for Admin
app.get("/api/vendors/pending", async (req, res) => {
  try {
    const data = await fs.readFile(dataFilePath, "utf8");
    const jsonData = JSON.parse(data);
    res.json(jsonData.pendingVendors);
  } catch (err) {
    res.status(500).json({ error: "Failed to load vendor data" });
  }
});

//  API Route to Approve or Reject Vendors
app.post("/api/vendors/:status/:id", async (req, res) => {
    try {
      const { status, id } = req.params;
      let data = await fs.readFile(dataFilePath, "utf8");
      let jsonData = JSON.parse(data);
  
      jsonData.pendingVendors = jsonData.pendingVendors.filter(vendor => vendor.id != id);
  
      await fs.writeFile(dataFilePath, JSON.stringify(jsonData, null, 2));
      res.json({ message: `Vendor ${id} has been ${status}d successfully!` });
    } catch (err) {
      res.status(500).json({ error: `Failed to ${status} vendor` });
    }
});


app.get("/api/user/dashboard/:email", async (req, res) => {
    try {
      const email = decodeURIComponent(req.params.email);
      const data = await fs.readFile(dataFilePath, "utf8");  // ✅ Correct: Using async/await
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
      console.error("Error reading data file:", err);
      res.status(500).json({ error: "Failed to read data file" });
    }
  });
  

//  API Route to Fetch Vendor Dashboard Stats for a Specific Vendor
app.get("/api/vendor/dashboard/:vendorName", async (req, res) => {
    try {
        const { vendorName } = req.params;
        const data = await fs.readFile(dataFilePath, "utf8");
        const jsonData = JSON.parse(data);

        // Decode vendor name and trim spaces
        const formattedName = decodeURIComponent(vendorName).trim();

        if (!jsonData.vendorCollectionsHistory[formattedName]) {
            return res.status(404).json({ error: "Vendor not found" });
        }

        res.json({ collectionHistory: jsonData.vendorCollectionsHistory[formattedName] });
    } catch (err) {
        console.error("Error loading vendor dashboard data:", err);
        res.status(500).json({ error: "Failed to load vendor dashboard data" });
    }
});

//  Start Server on Port 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Dummy data server running on port ${PORT}!`);
});

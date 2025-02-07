import mongoose from "mongoose";

export const wasteType = {
  eWaste: "eWaste",
  Plastic: "Plastic",
  Metal: "Metal",
  Glass: "Glass",
};

const vendorSchema = new mongoose.Schema(
  {
    // Basic Info
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    image: { type: String },
    address: { type: String, required: true },

    coordinates: {
      latitude: { type: Number },
      longitude: { type: Number },
    },

    // Business Details
    businessLicense: { type: String },
    establishedYear: { type: Number },
    operatingAreas: [String],
    wasteTypes: [{ type: String, enum: Object.values(wasteType) }],
    specialization: { type: String },

    // Service Details
    availableTime: { type: String, required: true },
    responseTime: { type: String, required: true },
    price: { type: String, required: true },
    // minimumWeight: { type: Number },
    // maximumWeight: { type: Number },
    collectedWaste: { type: Number, default: 0 },
    servicesOffered: [String],

    // Certifications & Compliance
    certifications: { type: [String] },
    environmentalCompliance: { type: Boolean },
    safetyStandards: [String],

    // Performance Metrics
    rating: { type: Number, default: 0 },
    reviews: { type: Number, default: 0 },
    // distance: { type: String, required: true },
    completedPickups: { type: Number, default: 0 },
    // featured: { type: Boolean, default: false },

    // Equipment & Capacity
    vehicleTypes: [String],
    processingCapacity: { type: String },
    recyclingMethods: [String],
  },
  { timestamps: true }
);

const Vendor = mongoose.model("Vendor", vendorSchema);

export default Vendor;

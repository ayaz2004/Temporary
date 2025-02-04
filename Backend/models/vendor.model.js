import mongoose from "mongoose";

export const wasteType = {
  eWaste: "eWaste",
  Plastic: "Plastic",
  Metal: "Metal",
  Glass: "Glass",
};

const vendorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    reviews: {
      type: Number,
      required: true,
    },
    distance: {
      type: String,
      required: true,
    },
    availableTime: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    image: {
      type: [String],
    },
    specialization: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    responseTime: {
      type: String,
      required: true,
    },
    certifications: {
      type: [String],
      required: true,
    },
    category: {
      type: String,
      enum: wasteType,
      default: wasteType.Metal,
      required: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Vendor = mongoose.model("Vendor", vendorSchema);

export default Vendor;

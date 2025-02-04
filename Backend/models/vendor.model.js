import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  workArea: { type: String, required: true }, // Example: "South Delhi"
  vehicleNumber: { type: String }, // If using a vehicle
  collectedWaste: [
    {
      wasteType: String,
      quantity: Number,
      collectedAt: { type: Date, default: Date.now },
    },
  ],
  ratings: { type: Number, default: 0 }, // Average user rating
  completedRequests: { type: Number, default: 0 },
    cancelledRequests: { type: Number, default: 0 },
    adharNo:{
        type: String,
        required: true,
    }
});

const Vendor = mongoose.model("Vendor", vendorSchema);
export { Vendor };

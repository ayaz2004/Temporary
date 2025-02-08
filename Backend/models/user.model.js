import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    },
    role: {
      type: String,
      enum: ["user", "vendor", "admin"],
      default: "user",
    },
    approvedUser: {
      type: Boolean,
      default: false,
    },
    workArea: { type: String }, // Example: "South Delhi"
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
    adharNo: {
      type: String,
    },

    coordinates: {
      latitude: { type: Number },
      longitude: { type: Number },
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;

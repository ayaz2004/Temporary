import mongoose from "mongoose";

const statusSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    productId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "products",
      },
      
    ],
  },
  { timestamps: true }
);

const Status = mongoose.model("Status", statusSchema);

export default Status;

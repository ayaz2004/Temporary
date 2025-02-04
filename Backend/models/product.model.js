import mongoose from "mongoose";

export const wasteType = {
  eWaste: "eWaste",
  Plastic: "Plastic",
  Metal: "Metal",
  Glass: "Glass",
};

const productSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    images: {
      type: [String],
    },
    category: {
      type: String,
      enum: wasteType,
      default: wasteType.Metal,
      required: true,
    },
    quantity: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;

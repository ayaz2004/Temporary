import mongoose from "mongoose";

export const wasteType = {
  electronic: "electronic",
  plastic: "plastic",
  clothes: "clothes",
  glass: "glass",
  biodegradable: "biodegradable",
  paper:"paper",
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
      default: wasteType.biodegradable,
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

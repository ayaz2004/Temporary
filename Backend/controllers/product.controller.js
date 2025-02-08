import User from "../models/user.model.js";
import Product, { wasteType } from "../models/product.model.js";
import { errorHanler } from "../utils/error.js";
import ApiResponse from "../utils/ApiRresponse.js";
import mongoose from "mongoose";

export const addProduct = async (req, res, next) => {
  try {
    const { userId } = req.params;

    // Validate userId format
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return next(errorHanler(400, "Invalid user ID format"));
    }

    const { category, quantity, price, description, images } = req.body;
    console.log(req.body);
    // Validate required fields
    if (!category || !quantity || !price || !description) {
      return next(errorHanler(400, "All fields are required"));
    }

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return next(errorHanler(404, "User not found"));
    }

    // Create new product with proper userId format
    const newProduct = new Product({
      userId: userId, // Pass the string ID directly
      category: wasteType[category],
      quantity,
      price,
      description,
      images: images || [],
    });

    const savedProduct = await newProduct.save();

    res
      .status(201)
      .json(new ApiResponse(201, "Product added successfully", savedProduct));
  } catch (error) {
    next(errorHanler(500, error.message));
  }
};

export const getProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;

    // Validate productId format
    if (!productId) {
      return next(errorHanler(400, "Product ID is required"));
    }
    const product = await Product.findById(productId);

    if (!product) {
      return next(errorHanler(404, "Product not found"));
    }

    res.status(200).json({
      success: true,
      message: "Product fetched successfully",
      product,
    });
  } catch (error) {
    console.log(error.message);
    next(errorHanler(500, error.message));
  }
};

export const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();

    res.status(200).json({
      success: true,
      message: "All products fetched successfully",
      products,
    });
  } catch (error) {
    next(errorHanler(500, error.message));
  }
};

export const getUserProducts = async (req, res, next) => {
  try {
    const { userId } = req.params;

    // Validate userId format
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return next(errorHanler(400, "Invalid user ID format"));
    }

    // Find all products with the given userId
    const products = await Product.find({ userId });

    res
      .status(200)
      .json(
        new ApiResponse(200, "User products fetched successfully", products)
      );
  } catch (error) {
    next(errorHanler(500, error.message));
  }
};

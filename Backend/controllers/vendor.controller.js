import Vendor from "../models/vendor.model.js";
import { errorHanler } from "../utils/error.js";
import ApiResponse from "../utils/ApiRresponse.js";
import mongoose from "mongoose";
import {uploadImage} from "../utils/cloudinary.js"

export const addVendor = async (req, res, next) => {
  try {
    const {
      name,
      phone,
      email,
      address,
      businessLicense,
      availableTime,
      responseTime,
      price,

    } = req.body;

    // Validate required fields
    // if (
    //   !name ||
    //   !phone ||
    //   !address ||
    //   !availableTime ||
    //   !responseTime ||
    //   !price
    // ) {
    //   return next(errorHanler(400, "All required fields must be provided"));
    // }
    // const imagePath = req.files?.imageFile[0]?.path;
  
    // const imageResponse = await uploadImage(imagePath);
    // if(!imageResponse){
    //   return next(errorHanler(500, "Error uploading image"));
    // }


    const vendor = new Vendor({
      name,
      phone,
      email,
      address,
      businessLicense,
      availableTime,
      responseTime,
      price,
   
  
    });



    const savedVendor = await vendor.save({validateBeforeSave:false});

    console.log(savedVendor);

    res
      .status(201)
      .json(new ApiResponse(201, "Vendor added successfully", savedVendor));
  } catch (error) {
    next(errorHanler(500, error.message));
  }
};

export const getAllVendors = async (req, res, next) => {
  try {
    const vendors = await Vendor.find();
    res
      .status(200)
      .json(new ApiResponse(201, "Vendors fetched successfully", vendors));
  } catch (error) {
    next(errorHanler(500, error.message));
  }
};

export const getVendorById = async (req, res, next) => {
  try {
    const { vendorId } = req.params;

    console.log(vendorId);
    // Validate MongoDB ObjectId
    if (!vendorId) {
      return next(errorHanler(400, "Vendor ID is required"));
    }

    const vendor = await Vendor.findById(vendorId);

    if (!vendor) {
      return next(errorHanler(404, "Vendor not found"));
    }

    res
      .status(200)
      .json(new ApiResponse(201, "Vendor fetched successfully", vendor));
  } catch (error) {
    console.error("Vendor fetch error:", error); // Debug log
    next(errorHanler(500, error.message));
  }
};

import Vendor from "../models/vendor.model.js";
import { errorHanler } from "../utils/error.js";
import ApiResponse from "../utils/ApiRresponse.js";

export const addVendor = async (req, res, next) => {
  try {
    const vendor = new Vendor(req.body);
    const savedVendor = await vendor.save();
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
      .json(new ApiResponse(200, "Vendors fetched successfully", vendors));
  } catch (error) {
    next(errorHanler(500, error.message));
  }
};

export const getVendorById = async (req, res, next) => {
  try {
    const { vendorId } = req.params;
    const vendor = await Vendor.findById(vendorId);
    if (!vendor) {
      return next(errorHanler(404, "Vendor not found"));
    }
    res
      .status(200)
      .json(new ApiResponse(200, "Vendor fetched successfully", vendor));
  } catch (error) {
    next(errorHanler(500, error.message));
  }
};

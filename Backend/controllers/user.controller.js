import { getBrowser } from "../utils/puppeter.js";
import { getDistanceInMeters } from "../utils/getDistanceinMeteres.js";
import { sendNotification } from "../utils/Twilio.js";
import User from "../models/user.model.js";
import ApiResponse from "../utils/ApiRresponse.js";
import { errorHanler } from "../utils/error.js";
export const test = (req, res) => {
  res.json({ message: "API is working" });
};
// controllers/coordinates.controller.js
export const getCoordinatesAndTimestamp = async (req, res) => {
  try {
    // Wait for the scraping to complete and get the data
    const scrapedData = await getBrowser();

    // if (scrapedData && scrapedData.length > 0) {
    console.log(scrapedData);
    res.json({
      success: true,
      message: "Coordinates fetched successfully",
      data: scrapedData,
    });
    // } else {
    //   res.status(404).json({
    //     success: false,
    //     message: "No coordinates found"
    //   });
    // }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: "Server error while fetching coordinates",
    });
  }
};

export const getAllNearByVandors = async (req, res, next) => {
  const { latitude, longitude } = req.body.userCoordinates;

  const allUser = await User.find({ role: "vendor" });
  if (!allUser || allUser.length === 0) {
    return next(errorHanler(404, "No vendors found"));
  }

  allUser.map((vandor) => {
    if (vandor.coordinates.latitude && vandor.coordinates.longitude) {
      const distance = getDistanceInMeters(
        parseFloat(latitude),
        parseFloat(longitude),
        parseFloat(vandor.coordinates.latitude),
        parseFloat(vandor.coordinates.longitude)
      );
      console.log("Distance in meters:", distance);
      if (distance < 100) {
        sendNotification("8745971753");
      }
    }
  });
};

export const notifyUsersForVan = async (req, res, next) => {
try {
 
  const userCoordinates = req.body.userCoordinates;
  const vanCoordinates = req.body.vanCoordinates;
  console.log(userCoordinates, vanCoordinates);
  if (!userCoordinates || !vanCoordinates) {
    return next(errorHanler(400, "Latitude and Longitude are required"));
  }
  const distance = getDistanceInMeters(
    parseFloat(userCoordinates.latitude),
    parseFloat(userCoordinates.longitude),
    parseFloat(vanCoordinates.latitude),
    parseFloat(vanCoordinates.longitude)
  );

  console.log("Distance in meters for van:", distance);
  if (distance < 130) {
    sendNotification("8745971753");
  }
  res.json(new ApiResponse(200, "Notification sent successfully"));
} catch (error) {
  next(errorHanler(500, error.message));
}
};

import { getBrowser } from "../utils/puppeter.js";

export const test = (req, res) => {
  res.json({ message: "API is working" });
};
// controllers/coordinates.controller.js
export const getCoordinatesAndTimestamp = async (req, res) => {
  try {
    // Wait for the scraping to complete and get the data
    const scrapedData = await getBrowser();

    // if (scrapedData && scrapedData.length > 0) {
    // console.log(scrapedData)
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

export const signout = (req, res, next) => {
  try {
    res
      .clearCookie("access_token")
      .status(200)
      .json("User has been signed out");
  } catch (error) {
    next(error);
  }
};

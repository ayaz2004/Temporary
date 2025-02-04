import { getBrowser } from "../utils/puppeter.js";

export const test = (req, res) => {
  res.json({ message: "API is working" });
};

export const getCoordinates = async (req, res) => {
  try {
    const browser = await getBrowser();
    res.json({ message: "Coordinates fetched successfully",browser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
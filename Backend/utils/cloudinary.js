import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dli0szw7r",
  api_key: "677294152168619",
  api_secret: "rwt5ZfdQOM_VBL_j0u6Qq4D04Hg",
});

export const uploadImage = async (file) => {
  console.log(file);
  try {
    const result = await cloudinary.uploader.upload(file, {
      folder: "vendors",
      use_filename: true,
    });
    return result.secure_url;
  } catch (error) {
    throw new Error(error.message);
  }
};

import { Router } from "express";
import { httpHandler } from "../../helper/response/errorUtil.js";
import contactService from "./services.js";
import authorization from "../../helper/authrization/auth.js";
import { imageUploader } from "../../helper/commonFunction.js";
import { v2 as cloudinary } from "cloudinary";

const router = Router();
const imageUpload = imageUploader();
router.post(
  "/create",
  imageUpload.single("img"),
  httpHandler(async (req, res) => {
  
    const data = req.body;
    if (req.file) {
      const { path } = req.file;
      const { secure_url } = await cloudinary.uploader.upload(path);
      const result = await contactService.insertContactDetals(secure_url, data);
      res.send(result);
    } else {
      const result = await contactService.insertContactDetals(data);
      res.send(result);
    }
  })
);

export default router;
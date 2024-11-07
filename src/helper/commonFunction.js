export const timeAndDateFormate = () => {
  const date = new Date().toISOString();
  const dateObject = new Date(date);
  const optionsDate = { year: "numeric", month: "2-digit", day: "2-digit" };
  const optionsTime = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata",
  };
  const formattedDate = dateObject.toLocaleDateString("en-US", optionsDate);
  const formattedTime = dateObject.toLocaleTimeString("en-US", optionsTime);
  return { formattedTime, formattedDate };
};
import multer from "multer";
import dotenv from "dotenv";
dotenv.config();

export const imageUploader = () => {
  const imageStorage = multer.diskStorage({
    destination: `image/images`,
    filename: (req, file, cb) => {
      cb(null, file.fieldname + "_" + Date.now() + file.originalname);
    },
  });
  const imageUpload = multer({
    storage: imageStorage,

    fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.(png|jpg|jpeg|webp|svg|avif|mp4)$/)) {
        return cb(
          new Error("Please upload a Image in PNG, JPG, webp and jpeg format")
        );
      }
      cb(undefined, true);
    },
  });
  return imageUpload;
};

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export default async function sendmail(msg) {
  await transporter.sendMail({
    from: '"Hivoco Tech Studio" <hi@hivoco.com>', // sender address
    to: msg.to,
    subject: msg.subject,
    html: msg.html,
  });
}

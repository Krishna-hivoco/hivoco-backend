import { Router } from "express";
import contactRouter from "./router.js";
const router = Router();

router.use("/contact", contactRouter);

const contactModule = {
  init: (app) => {
    app.use(router);
    console.log("Contact-Us module Loaded");
  },
};

export default contactModule;

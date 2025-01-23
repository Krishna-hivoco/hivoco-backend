import { Router } from "express";
import policyRouter from "./router.js";
const router = Router();

router.use("/policy", policyRouter);

const policyModule = {
  init: (app) => {
    app.use(router);
    console.log("Policy Module Loaded");
  },
};

export default policyModule;

import { Router } from "express";
import { httpHandler } from "../../helper/response/errorUtil.js";
import contactService from "./services.js";
import authorization from "../../helper/authrization/auth.js";

import policyService from "./services.js";

const router = Router();

router.post("/add-policy",

  httpHandler(async (req, res) => {
    const {auth_id, policies} = req.body;
    const result = await policyService.addPolicy(auth_id, policies);
    res.send(result);
  })
);

router.put("/update-policy/:auth_id",

  httpHandler(async (req, res) => {
    const { auth_id } = req.params;
    const policyData = req.body;
    const result = await policyService.updatePolicy(auth_id, policyData);
    res.send(result);
  })
);
router.put("/update-policy/:auth_id",

  httpHandler(async (req, res) => {
    const { auth_id } = req.params;
    const policyData = req.body;
    const result = await policyService.updatePolicy(auth_id, policyData);
    res.send(result);
  })
);
router.get("/get-list-of-employee",
  authorization.auth,
  httpHandler(async (req, res) => {
    const user  = req.user
    const result = await policyService.listOfEmployee(user);
    res.send(result);
  })
);
router.get("/get-info-of-employee/:auth_id",
  authorization.auth,
  httpHandler(async (req, res) => {
    const user  = req.user
    const {auth_id} = req.params
    const result = await policyService.infoOfEmployee(user, auth_id);
    res.send(result);
  })
);
router.post("/ischecked",

  httpHandler(async (req, res) => {
    const { auth_id, policyName } = req.body;
    const result = await policyService.isPolicyChecked(auth_id, policyName);
    res.send(result);
  })
);

export default router;

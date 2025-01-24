// router.js
import express from "express";
import {registerUser, loginUser, refreshAccessToken, logoutUser, registerEmployee, loginEmployee } from "./services.js";
import createError from "http-errors";
import { StatusCodes } from "http-status-codes";
import authorization from "../../helper/authrization/auth.js";

const router = express.Router();

// router.post("/register", async (req, res, next) => {
//   try {
//     const { name, email, password } = req.body;
//     await registerUser(name, email, password);
//     res
//       .status(StatusCodes.CREATED)
//       .json({ message: "User registered successfully" });
//   } catch (error) {
//     next(error);
//   }
// });

// Login route
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { accessToken, refreshToken } = await loginUser(email, password);
    res.status(StatusCodes.OK).json({ accessToken, refreshToken });
  } catch (error) {
    next(error);
  }
});

// Refresh token route
router.post("/refresh-token", async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    const { accessToken } = await refreshAccessToken(refreshToken);
    res.status(StatusCodes.OK).json({ accessToken });
  } catch (error) {
    next(error);
  }
});

// Logout route
router.post("/logout", (req, res) => {
  // We can just clear the cookies or client-side storage in a real-world scenario
  res.status(StatusCodes.OK).json(logoutUser());
});


router.post("/register-employee", authorization.auth, async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const user = req.user;
    await registerEmployee(name, email, password,user);
    res
      .status(StatusCodes.CREATED)
      .json({ message: "Employee registered successfully" });
  } catch (error) {
    next(error);
  }
});
router.post("/login-employee", async (req, res, next) => {
 try {
   const { email, password } = req.body;
   const result = await loginEmployee(email, password);
   res.status(StatusCodes.OK).json(result );
 } catch (error) {
   next(error);
 }
});

export default router;

// router.js
import express from "express";
import {registerUser, loginUser, refreshAccessToken, logoutUser } from "./services.js";
import createError from "http-errors";
import { StatusCodes } from "http-status-codes";

const router = express.Router();

router.post("/register", async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    await registerUser(name, email, password);
    res
      .status(StatusCodes.CREATED)
      .json({ message: "User registered successfully" });
  } catch (error) {
    next(error);
  }
});

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

export default router;

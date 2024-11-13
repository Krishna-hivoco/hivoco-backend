// authService.js
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import createError from "http-errors"; // for creating errors
import { StatusCodes } from "http-status-codes"; // for using status codes
import authModel from "./model.js"; // Assuming a User model

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRATION = "30m";
const REFRESH_TOKEN_EXPIRATION = "5d";

// Register user (optional if needed)

export const registerUser = async (name, email, password) => {
  const existingUser = await authModel.findOne({ email });
  if (existingUser)
    throw createError(StatusCodes.BAD_REQUEST, "User already exists");

  // Hash the password before saving

  const newUser = new authModel({ name, email, password });

  await newUser.save();
  return { message: "User registered successfully" };
};

// Login user
export const loginUser = async (email, password) => {
  const user = await authModel.findOne({ email });
  if (!user) throw createError(StatusCodes.NOT_FOUND, "User not found");
  const isPasswordValid = bcrypt.compareSync(password, user.password);

  if (!isPasswordValid)
    throw createError(StatusCodes.UNAUTHORIZED, "Invalid credentials");

  const accessToken = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
    expiresIn: JWT_EXPIRATION,
  });
  const refreshToken = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRATION,
  });

  return { accessToken, refreshToken };
};

// Logout user (delete tokens)
export const logoutUser = () => {
  return { message: "Logged out successfully" };
};

// Refresh the access token using the refresh token
export const refreshAccessToken = async (refreshToken) => {
  if (!refreshToken)
    throw createError(StatusCodes.BAD_REQUEST, "Refresh token required");

  try {
    const decoded = jwt.verify(refreshToken, JWT_SECRET);
    const newAccessToken = jwt.sign(
      { id: decoded.id, role: decoded.role },
      JWT_SECRET,
      {
        expiresIn: JWT_EXPIRATION,
      }
    );
    return { accessToken: newAccessToken };
  } catch (err) {
    throw createError(StatusCodes.UNAUTHORIZED, "Invalid refresh token");
  }
};

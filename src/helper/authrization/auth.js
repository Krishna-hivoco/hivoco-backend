import createError from "http-errors-lite";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
      return next(createError(StatusCodes.UNAUTHORIZED, "Not authenticated."));
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return next(createError(StatusCodes.UNAUTHORIZED, "Token not provided."));
    }

    // Verify the token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return next(
        createError(StatusCodes.FORBIDDEN, "Invalid or expired token.")
      );
    }

    req.user = decoded; // Store user data in request object

    // Check if the user is an admin
    if (req.user.role !== "admin") {
      return next(
        createError(StatusCodes.FORBIDDEN, "Access denied. Admins only.")
      );
    }

    // If the user is an admin, proceed with the request
    next();
  } catch (err) {
    next(
      createError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "An unexpected error occurred."
      )
    );
  }
};

const authorization = {
  auth,
};

export default authorization;

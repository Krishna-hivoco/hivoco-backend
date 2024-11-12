import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const authschema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    set: (value) => value.toLowerCase(), // Convert email to lowercase before saving
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "user",
    enum: ["user", "admin"],
  },
});

authschema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

const authModel = mongoose.model("Auth", authschema);
export default authModel;

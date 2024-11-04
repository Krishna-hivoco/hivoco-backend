import mongoose from "mongoose";
const contactSchema = new mongoose.Schema(
  {
    category: {
      type: String,
    },
    name: {
      type: String,
    },
    company_name: {
      type: String,
    },
    contact_number: {
      type: String,
    },
    email: {
      type: String,
    },
    image: {
      type: String,
    },
    inquiry_subject: {
      type: String,
    },
    inquiry_description: {
      type: String,
    },
  },
  { timestamps: true }
);

// Create the model
const Contact = mongoose.model("Contact", contactSchema);
export default Contact;

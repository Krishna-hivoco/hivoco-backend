import createError from "http-errors-lite";
import { StatusCodes } from "http-status-codes";
import assert from "assert";
import Contact from "./model.js";
const insertContactDetals = async (image, data) => {
  if (image) {
    data = { ...data, image: image };
  }
  const insert = await new Contact(data).save();
  return insert;
};

const contactService = {
  insertContactDetals,
};

export default contactService;

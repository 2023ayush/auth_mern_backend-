import mongoose from "mongoose";
import validator from "validator";
const messageSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: [3, "First Name Must Contain At Least 3 Characters"],
  },
  lastName: {
    type: String,
    required: true,
    minLength: [3, "Last Name Must Contain At Least 3 Characters"],
  },
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, "please provide a valid email"],
  },
  phone: {
    type: String,
    required: true,
    minLength: [10, "Phone Number must contain 100 digits"],
  },
  message: {
    type: String,
    required: true,
    minLength: [10, "Message must contain 10 Characters"],
  },
});
export const Message = mongoose.model("Message", messageSchema);

import { Message } from "../models/messageSchema.js";
export const sendMessage = async (req, res, next) => {
  const { firstName, lastName, email, message, phone } = req.body;
  if (!firstName || !lastName || !email || !message || !phone) {
    return res.status(400).json({
      success: false,
      message: "please fill form",
    });
  }
  await Message.create({ firstName, lastName, email, phone, message });
  res.status(200).json({
    success: true,
    message: "Message sent successfully",
  });
};

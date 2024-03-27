import mongoose from "mongoose";
export const dbConnection = () => {
  mongoose
    .connect(process.env.MONGO)
    .then(() => {
      console.log("Connected to database");
    })
    .catch((err) => {
      console.log("Failed the connection");
    });
};

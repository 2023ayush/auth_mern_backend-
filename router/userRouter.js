import express from "express";
import {
  addNewAdmin,
  login,
  patientRegister,
} from "../controllers/userController.js";
const router = express.Router();
router.post("/patient/register", patientRegister);
router.get("/login", login);
router.post("/admin/addnew", addNewAdmin);
export default router;

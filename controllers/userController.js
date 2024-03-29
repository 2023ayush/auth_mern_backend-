import { catchAsyncErrors } from "../middlewares/catchAsynErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { User } from "../models/userSchema.js";
import { generateToken } from "../utils/jwtToken.js";
// patient register
export const patientRegister = catchAsyncErrors(async (req, res, next) => {
  const { firstName, lastName, email, phone, password, gender, role, dob } =
    req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !password ||
    !gender ||
    !role ||
    !dob
  ) {
    return next(new ErrorHandler("please fill full form", 400));
  }
  let user = await User.findOne({ email });
  if (user) {
    return next(new ErrorHandler("User Already Registered", 400));
  }
  user = await User.create({
    firstName,
    lastName,
    email,
    phone,
    password,
    gender,
    role: "Patient",
    dob,
  });
  generateToken(user, "User Registered", 200, res);
});

// patient login
export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password, role, confirmPassword } = req.body;
  if (!email || !password || !role || !confirmPassword) {
    return next(new ErrorHandler("Please provide all details", 400));
  }
  if (password !== confirmPassword) {
    return next(
      new ErrorHandler("Password And Confirm Password donot match", 400)
    );
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid EMAIL OR PASSWORD", 400));
  }
  const isPasswordMatch = await user.comparePassword(password);
  if (!isPasswordMatch) {
    return next(new ErrorHandler("Invalid EMAIL OR PASSWORD", 400));
  }
  if (role !== user.role) {
    return next(new ErrorHandler("User with this role not found", 400));
  }
  generateToken(user, "User LogedIn Successfully", 200, res);
});

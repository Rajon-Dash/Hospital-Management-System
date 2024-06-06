import { catchAsyncErrors } from "../moddlewares/catchAsyncErrors.js";
import { ErrorHandler } from "../moddlewares/errorMiddleWare.js";
import { User } from "../models/userSchema.js";
import { generataToken } from "../utils/jwtToken.js";
import cloudinary from "cloudinary";
// Patient       Register

export const patientRegister = catchAsyncErrors(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    password,
    gender,
    dob,
    nid,
    role,
  } = req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !password ||
    !gender ||
    !dob ||
    !nid ||
    !role
  ) {
    return next(new ErrorHandler("Please fill full form", 400));
  }

  let user = await User.findOne({ email });
  if (user) {
    return next(new ErrorHandler("User already Registered!", 400));
  }
  user = await User.create({
    firstName,
    lastName,
    email,
    phone,
    password,
    gender,
    dob,
    nid,
    role,
  });

  generataToken(user, "user Register", 200, res);
});

// Login

export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password, confirmPassword, role } = req.body;

  if (!email || !password || !confirmPassword || !role) {
    return next(new ErrorHandler("Please provied all details!", 400));
  }

  if (password !== confirmPassword) {
    return next(
      new ErrorHandler("Password and confirm password don not match!", 400)
    );
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid email and password", 400));
  }

  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email and password", 400));
  }

  if (role !== user.role) {
    return next(new ErrorHandler("User with this role not found", 400));
  }
  generataToken(user, "user login successfully ", 200, res);
});

//Add Admin

export const addNewAdmin = catchAsyncErrors(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    password,
    gender,
    dob,
    nid,
    role,
  } = req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !password ||
    !gender ||
    !dob ||
    !nid ||
    !role
  ) {
    return next(new ErrorHandler("Please fill full form", 400));
  }
  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return next(new ErrorHandler("Admin with this email already exists", 400));
  }

  const admin = await User.create({
    firstName,
    lastName,
    email,
    phone,
    password,
    gender,
    dob,
    nid,
    role: "Admin",
  });

  generataToken(admin, "user login successfully ", 200, res);

  // res.status(200),
  //   json({
  //     success: true,
  //     message: "New Admin Registered",
  //   });
});

// All doctor get from database

export const getAllDoctors = catchAsyncErrors(async (req, res, next) => {
  const doctors = await User.find({ role: "Doctor" });
  res.status(200).json({
    success: true,
    doctors,
  });
});

export const getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});

//Logout Admin => means clear cookies of Admin generated cookies

export const logoutAdmin = catchAsyncErrors(async (req, res, next) => {
  res
    .status(200)
    .cookie("adminToken", "", {
      httponly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "User logout successfully",
    });
});

//Logout patient => means clear cookies of patient generated cookies

export const logoutPatient = catchAsyncErrors(async (req, res, next) => {
  res
    .status(200)
    .cookie("patientToken", "", {
      httponly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "User logout successfully",
    });
});

export const addNewDoctor = catchAsyncErrors(async (req, res, next) => {
  console.log('Request files:', req.files); // Log the received files

  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Doctor avatar required", 400));
  }

  const { docAvatar } = req.files;
  const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
  if (!allowedFormats.includes(docAvatar.mimetype)) {
    return next(new ErrorHandler("File format not supported", 400));
  }

  const {
    firstName,
    lastName,
    email,
    phone,
    password,
    gender,
    dob,
    nid,
    doctorDepartment
  } = req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !password ||
    !gender ||
    !dob ||
    !nid ||
    !doctorDepartment
  ) {
    return next(new ErrorHandler("Please fill the full form", 400));
  }

  let isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return next(
      new ErrorHandler(`${isRegistered.role} already registered!`, 400)
    );
  }

  const cloudinaryResponse = await cloudinary.uploader.upload(
    docAvatar.tempFilePath // Use tempFilePath here
  );

  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.log(
      "Cloudinary Error",
      cloudinaryResponse.error || "Unknown Cloudinary Error"
    );
    return next(new ErrorHandler("Cloudinary upload failed", 500));
  }

  const doctor = await User.create({
    firstName,
    lastName,
    email,
    phone,
    password,
    gender,
    dob,
    nid,
    doctorDepartment,
    role: "Doctor",
    docAvatar: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    }
  });

  res.status(200).json({
    success: true,
    message: "Doctor registered",
    doctor,
  });
});


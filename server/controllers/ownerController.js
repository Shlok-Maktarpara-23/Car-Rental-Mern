import imagekit from "../configs/imageKit.js";
import Booking from "../models/Booking.js";
import Car from "../models/Cars.js";
import User from "../models/User.js";
import fs from "fs";

// API to change role of user
export const changeRoleToOwner = async (req, res) => {
  try {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { role: "owner" });
    res.json({ success: true, message: "Now you can list your cars for rent" });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};

// API to list Car
export const addCar = async (req, res) => {
  try {
    const { _id } = req.user;
    let car = JSON.parse(req.body.carData);
    const imageFile = req.file;

    // Upload image to ImageKit
    const fileBuffer = fs.readFileSync(imageFile.path);
    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/cars",
    });

    // optimation through imagekit url transformation
    var optimizedImageUrl = imagekit.url({
      path: response.filePath,
      transformation: [
        { width: "1280" }, // Resize to width 1280px
        { quality: "auto" }, // Auto compression
        { format: "webp" }, // Convert to modern WebP format
      ],
    });

    const image = optimizedImageUrl;
    await Car.create({ ...car, owner: _id, image });

    res.json({ success: true, message: "Car listed successfully" });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};

// API to get all cars of owner
export const getOwnerCars = async (req, res) => {
  try {
    const { _id } = req.user;
    const cars = await Car.find({ owner: _id });
    res.json({ success: true, cars });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};

// API to Toggle car availability
export const toggleCarAvailability = async (req, res) => {
  try {
    const { _id } = req.user;
    const { carId } = req.body;
    const car = await Car.findById(carId);

    // check if the car belongs to the owner
    if (car.owner.toString() !== _id.toString()) {
      return res.json({ success: false, message: "Unauthorized" });
    }

    car.isAvailable = !car.isAvailable;
    await car.save();

    res.json({
      success: true,
      message: "Car availability updated successfully",
    });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};

// API to delete a car
export const deleteCar = async (req, res) => {
  try {
    const { _id } = req.user;
    const { carId } = req.body;
    const car = await Car.findById(carId);

    // check if the car belongs to the owner
    if (car.owner.toString() !== _id.toString()) {
      return res.json({ success: false, message: "Unauthorized" });
    }

    car.owner = null; // disassociate car from owner
    car.isAvailable = false; // mark car as unavailable

    await car.save();

    res.json({
      success: true,
      message: "Car availability updated successfully",
    });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};

// API to get Dashboard Data
export const getDashboardData = async (req, res) => {
  try {
    const { _id, role } = req.user;

    if (role !== "owner") {
      return res.json({ success: false, message: "Unauthorized" });
    }

    const cars = await Car.find({ owner: _id });
    const bookings = await Booking.find({ owner: _id })
      .populate("car")
      .short({ createdAt: -1 });

    const pendingBookings = bookings.find({ owner: _id, status: "pending" });
    const completedBookings = bookings.find({
      owner: _id,
      status: "confirmed",
    });

    // Calculate monthly earnings from bookings where status is 'confirmed'
    const monthlyRevenue = bookings
      .slice()
      .filter((booking) => booking.status === "confirmed")
      .reduce((acc, booking) => acc + booking.price, 0);

    const dashboardData = {
      totalCars: cars.length,
      totalBookings: bookings.length,
      pendingBookings: pendingBookings.length,
      completedBookings: completedBookings.length,
      recentBookings: bookings.slice(0, 5),
      monthlyRevenue,
    };
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};

// API to update user image

export const updateUserImage = async (req, res) => {
  try {
    const { _id } = req.user;

    const imageFile = req.file;

    // Upload image to ImageKit
    const fileBuffer = fs.readFileSync(imageFile.path);
    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/users",
    });

    // optimation through imagekit url transformation
    var optimizedImageUrl = imagekit.url({
      path: response.filePath,
      transformation: [
        { width: "400" }, // Resize to width 1280px
        { quality: "auto" }, // Auto compression
        { format: "webp" }, // Convert to modern WebP format
      ],
    });

    const image = optimizedImageUrl;

    await User.findByIdAndUpdate(_id, { image });
    res.json({ success: true, message: "Profile image updated successfully" });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};

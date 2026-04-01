import User from "../models/User.js";
import fs from "fs";
import Car from "../models/Car.js";
import imagekit from "../configs/imageKit.js";
import Booking from "../models/Booking.js";

// API to change role to owner
export const changeRoleToOwner = async (req, res) => {
  try {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { role: "owner" });
    res.json({ success: true, message: "Now you can list cars" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// API to add a car
export const addCar = async (req, res) => {
  try {
    const { _id } = req.user;
    let car = JSON.parse(req.body.carData);
    const imageFile = req.file;

    if (!imageFile) {
      return res.json({ success: false, message: "Image file is required" });
    }

    const fileBuffer = fs.readFileSync(imageFile.path);

    // Upload to ImageKit
    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/cars",
    });

    // Clean up local temp file
    fs.unlinkSync(imageFile.path);

    // Optimized image URL
    const optimizedImageURL = imagekit.url({
      path: response.filePath,
      transformation: [
        { width: "1280" }, // Width resizing
        { quality: "auto" },
        { format: "webp" },
      ],
    });

    await Car.create({ ...car, owner: _id, image: optimizedImageURL });

    res.json({ success: true, message: "Car Added Successfully" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// API to get cars owned by the logged-in user
export const getOwnerCars = async (req, res) => {
  try {
    const { _id } = req.user;
    const cars = await Car.find({ owner: _id });
    res.json({ success: true, cars });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// API to toggle car availability
export const toggleCarAvailability = async (req, res) => {
  try {
    const { _id } = req.user;
    const { carId } = req.body;

    const car = await Car.findById(carId);

    if (!car) {
      return res.json({ success: false, message: "Car not found" });
    }

    if (car.owner.toString() !== _id.toString()) {
      return res.json({ success: false, message: "Unauthorized" });
    }

    car.isAvailable = !car.isAvailable;
    await car.save();

    res.json({ success: true, message: "Availability Toggled Successfully" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// API to delete a car
export const deleteCar = async (req, res) => {
  try {
    const { _id } = req.user;
    const { carId } = req.body;

    const car = await Car.findById(carId);

    if (!car) {
      return res.json({ success: false, message: "Car not found" });
    }

    if (car.owner.toString() !== _id.toString()) {
      return res.json({ success: false, message: "Unauthorized" });
    }

    // Hard delete
    await Car.findByIdAndDelete(carId);

    res.json({ success: true, message: "Car Deleted Successfully" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// API to get dashboard data
export const getDashboardData = async (req, res) => {
  try {
    const { _id, role } = req.user;

    if (role !== "owner") {
      return res.json({ success: false, message: "Unauthorized" });
    }

    const cars = await Car.find({ owner: _id });
    
    const bookings = await Booking.find({ owner: _id })
      .populate("car")
      .sort({ createdAt: -1 });

    const pendingBookings = await Booking.find({ owner: _id, status: "pending" });
    const completedBookings = await Booking.find({ owner: _id, status: "confirmed" });

    const monthlyRevenue = bookings.slice().filter(booking => booking.status === 'confirmed').reduce((acc, booking) => acc + booking.price, 0);

    const dashboardData = {
      totalCars: cars.length,
      totalBookings: bookings.length,
      pendingBookings: pendingBookings.length,
      completedBookings: completedBookings.length,
      recentBookings: bookings.slice(0, 3),
      monthlyRevenue
    }
    
    res.json({success: true, dashboardData})

  } catch (error) {
    console.error("Dashboard Data Error:", error.message);
    res.json({ success: false, message: error.message });
  }
};

//API to update user image
export const updateUserImage = async (req, res) => {
    try{
      const {_id} = req.user;

      const imageFile = req.file;

      if (!imageFile) {
        return res.json({ success: false, message: "Image file is required" });
      }

      const fileBuffer = fs.readFileSync(imageFile.path);

      // Upload to ImageKit
      const response = await imagekit.upload({
        file: fileBuffer,
        fileName: imageFile.originalname,
        folder: "/users",
      });

      // Clean up local temp file
      fs.unlinkSync(imageFile.path);

      // Optimized image URL
      const optimizedImageURL = imagekit.url({
        path: response.filePath,
        transformation: [
          { width: "1280" }, // Width resizing
          { quality: "auto" },
          { format: "webp" },
        ],
      });

      const image = optimizedImageURL;

      await User.findByIdAndUpdate(_id, {image});
      res.json({success: true, message: "Image Updated"})

    } catch(error){
      console.error("Dashboard Data Error:", error.message);
      res.json({ success: false, message: error.message });
    }
}
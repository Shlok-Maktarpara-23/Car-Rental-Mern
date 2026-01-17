import Booking from "../models/Booking.js";
import Car from "../models/Cars.js";

// Function to check car availability for a given date range
const checkCarAvailability = async (car, pickupDate, returnDate) => {
  const bookings = await Booking.find({
    car,
    pickupDate: { $lt: returnDate },
    returnDate: { $gt: pickupDate },
  });
  return bookings.length === 0;
};

// API to Check Availability of a car for the given date and location
export const checkAvailabilityOfCar = async (req, res) => {
  try {
    const { location, pickupDate, returnDate } = req.body;

    // fetch all available cars in the location
    const cars = await Car.find({ location, isAvailable: true });

    // Check car availability for the given date range using promise
    const availableCarsPromises = cars.map(async (car) => {
      const isAvailable = (await checkCarAvailability(
        car._id,
        pickupDate,
        returnDate
      ))
        ? car
        : null;
      return { ...car._doc, isAvailable: isAvailable };
    });

    let availableCars = await Promise.all(availableCarsPromises);
    availableCars = availableCars.filter((car) => car.isAvailable === true);

    res.json({ success: true, availableCars });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};

// API to Book a car
export const createBooking = async (req, res) => {
  try {
    const { _id } = req.user;
    const { car, pickupDate, returnDate } = req.body;

    const isAvailable = await checkCarAvailability(car, pickupDate, returnDate);

    if (!isAvailable) {
      return res.json({ success: false, message: "Car is not available" });
    }

    const carData = await Car.findById(car);

    // Calculate price based on pickup and return date
    const picked = new Date(pickupDate);
    const returned = new Date(returnDate);

    const noOfDays = Math.ceil((returned - picked) / (1000 * 60 * 60 * 24));
    const price = noOfDays * carData.pricePerDay;

    await Booking.create({
      car,
      owner: carData.owner,
      user: _id,
      pickupDate,
      returnDate,
      price,
    });

    res.json({ success: true, message: "Car booked successfully" });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};

// API to get all bookings of a user
export const getUserBookings = async (req, res) => {
  try {
    const { _id } = req.user;
    const bookings = await Booking.find({ user: _id }).populate("car").short({ createdAt: -1 });
    res.json({ success: true, bookings });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};

// API to get all bookings of an owner
export const getOwnerBookings = async (req, res) => {
  try {
    if (req.user.role !== 'owner') {
      return res.json({ success: false, message: "Unauthorized" });
    }
    const bookings = await Booking.find({ owner: req.user._id }).populate("car user").select("-password").sort({ createdAt: -1 });
    res.json({ success: true, bookings });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};

// API to change booking status
export const changeBookingStatus = async (req, res) => {
    try {
        const {_id} = req.user;
        const {bookingId, status} = req.body;

        const booking = await Booking.findById(bookingId);

        // check if the booking belongs to the owner's car
        if (booking.owner.toString() !== _id.toString()) {
            return res.json({ success: false, message: "Unauthorized" });
        }

        booking.status = status;
        await booking.save();

        res.json({ success: true, message: "Booking status updated successfully" });
    } catch (error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
}

/*
Step 1: cars.map() calls the function

cars = [car1, car2, car3];  // 3 cars
cars.map(async (car) => { ... });
// Calls: asyncFunc(car1), asyncFunc(car2), asyncFunc(car3)

Step 2: Each async function returns Promise IMMEDIATELY

// This function:
async (car) => {
    const result = await checkCarAvailability(car._id);  // Takes 100ms
    return result;  // Returns after 100ms
}

// When called:
const promise1 = asyncFunc(car1);  // Returns Promise IMMEDIATELY (0ms)
const promise2 = asyncFunc(car2);  // Returns Promise IMMEDIATELY (0ms)  
const promise3 = asyncFunc(car3);  // Returns Promise IMMEDIATELY (0ms)

Step 3: .map() collects ALL promises

availableCarsPromises = [
    Promise1,  // For car1 (pending)
    Promise2,  // For car2 (pending) 
    Promise3   // For car3 (pending)
];
*/

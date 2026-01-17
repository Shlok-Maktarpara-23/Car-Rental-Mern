import express from 'express';
import "dotenv/config";
import cors from 'cors';
import connectDB from './configs/db.js';
import userRouter from './routes/userRoutes.js';
import ownerRouter from './routes/ownerRoutes.js';
import bookingRouter from './routes/bookingRoutes.js';

// Initialize Express app
const app = express();

// Connect to Database
await connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Sample route
app.get('/', (req, res) => {
    res.send('Server is running');
});

// User Routes
app.use('/api/users', userRouter);

// Owner Routes
app.use('/api/owners', ownerRouter);

// Booking Routes
app.use('/api/bookings', bookingRouter);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
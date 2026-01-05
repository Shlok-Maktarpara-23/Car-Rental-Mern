import express from 'express';
import "dotenv/config";
import cors from 'cors';
import connectDB from './configs/db.js';

// Initialize Express app
const app = express();

// Connect to Database
await connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Sample route
app.get('/', (req, res) => {
    res.send('Server is running');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
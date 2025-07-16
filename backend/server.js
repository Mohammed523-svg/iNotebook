import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './db.js'; // Assuming your connectDB function is in './db.js'
import authRoutes from './routes/auth.js'; // Your auth route file
import notesRoutes from './routes/notes.js'; // Your notes route file
import cors from 'cors';

const app = express();
const port = 5000;
app.use(cors()); // Enable CORS for all routes
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies

app.use(express.json()); // Middleware to parse JSON request bodies

// connectDB function to connect to MongoDB
connectDB()
  .then(() => {
    // Use your routes *after* the database connection is successful
    app.use('/api/auth', authRoutes);
    app.use('/api/notes', notesRoutes); // Assuming you have a notes route file

    
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
  });
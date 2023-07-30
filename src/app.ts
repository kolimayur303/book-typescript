// src/app.ts
import express, { Application, Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import bookRoutes from "./routes";

const app: Application = express();
const PORT = 3000;

// connection creation and creation a new db
mongoose.connect('mongodb://127.0.0.1:27017/Book').then(db =>{
    
    console.log('MONGO connected');

}).catch(error => console.log(error));

// Middleware
app.use(bodyParser.json());

// Routes
app.use(bookRoutes);

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

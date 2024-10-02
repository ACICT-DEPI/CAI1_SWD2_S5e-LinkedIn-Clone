const express= require('express');
const connectDB = require('./db/connectDB');
const cookieParser = require('cookie-parser');
const logger = require("./middleware/logger");

require("dotenv").config();

const authRoutes = require("./routes/auth.routes");

// Init App
const app = express();

// Apply Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(logger);

//Routes
app.use("/api/auth", authRoutes);



const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
  connectDB()
  console.log("Server is running on port", PORT)
});




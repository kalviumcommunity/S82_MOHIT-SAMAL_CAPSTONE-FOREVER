

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const DB = require('./config/db.js');
const connectCloudinary = require('./config/Cloudinary.js');
require('dotenv').config();

const userRoutes = require('./routes/UserRoutes.js')

const productRouter = require('./routes/productRoutes.js')
const cartRouter = require('./routes/cartRoutes.js');
const orderRouter = require('./routes/orderRoute.js');


// App Config
const app = express();
const PORT = process.env.PORT || 5000;

DB();
connectCloudinary();



// Middleware
app.use(cors());
app.use(express.json());

// Routes (we’ll add these later)
app.use("/api/user", userRoutes);
app.use("/api/product",productRouter);

app.use("/api/cart",cartRouter);


app.use("/api/order",orderRouter)

app.get("/", (req, res) => {
  res.send("Capstone-Forever Backend Running 🚀");
});

app.listen(PORT, () => console.log(`🚀 Server running on port http://localhost:${PORT}`));
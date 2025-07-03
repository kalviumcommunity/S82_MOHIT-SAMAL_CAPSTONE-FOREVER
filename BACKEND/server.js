

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const DB = require('./config/db.js');
const connectCloudinary = require('./config/Cloudinary.js');
require('dotenv').config();


// App Config
const app = express();
const PORT = process.env.PORT || 5000;

DB();
connectCloudinary();
//-------------------------------------

//3rd party auth
const passport = require('passport');
const session = require('express-session');
require('./config/passport'); // new file for Google strategy

app.use(session({ secret: 'your_secret', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/'); // redirect to frontend or dashboard
});

//-------------------------------------

const userRoutes = require('./routes/UserRoutes.js')

const productRouter = require('./routes/productRoutes.js')
const cartRouter = require('./routes/cartRoutes.js');
const orderRouter = require('./routes/orderRoute.js');






// Middleware
app.use(cors());
app.use(express.json());

// Routes (we’ll add these later)
app.use("/api/user", userRoutes);
app.use("/api/product",productRouter);

app.use("/api/cart",cartRouter);

app.use('/api/payment', require('./routes/paymentRoutes.js'));

app.use("/api/order",orderRouter)

app.get("/", (req, res) => {
  res.send("Capstone-Forever Backend Running 🚀");
});

app.listen(PORT, () => console.log(`🚀 Server running on port http://localhost:${PORT}`));
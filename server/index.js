const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const passport = require("passport");
const session = require("express-session");
const { generateToken } = require("./utils/token");

const authRoutes = require("./routes/auth");
const experienceRoutes = require("./routes/experience");
require("./utils/passport"); //  Passport config
dotenv.config();

const app = express();

app.use(cors({
  // origin: "http://localhost:5173",
  origin: process.env.CLIENT_URL,
  credentials: true,
}));
app.use(express.json());

// Session + Passport middleware for Google OAuth
app.use(session({
  secret: "vaultSecret",
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("InterviewVault API Running");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/experience", experienceRoutes);

// Google OAuth endpoints
app.get("/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get("/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false
  }),
  (req, res) => {
    const token = generateToken(req.user._id);
    // res.redirect(`http://localhost:5173/explore?token=${token}`);
    res.redirect(`${process.env.CLIENT_URL}/explore?token=${token}`);


  }
);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => console.error(err));

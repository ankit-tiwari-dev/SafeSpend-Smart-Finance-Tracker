import dotenv from "dotenv";
dotenv.config();

import express, { json, urlencoded, static as expressStatic } from "express";
import cors from "cors";
import { join } from "path";
import session from "express-session";
import passport from "passport";

import connectDB from "./config/db.js";
import "./config/passport.js";

import authRoutes from "./routes/auth.routes.js";
import incomeRoutes from "./routes/income.routes.js";
import expenseRoutes from "./routes/expense.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import budgetRoutes from "./routes/budget.routes.js";
import goalRoutes from "./routes/goal.routes.js";
import contactRoutes from "./routes/contact.routes.js";

const app = express();

// CORS
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://safespend-pro.vercel.app",
      "https://safespend-smart-finance-tracker.vercel.app",
      process.env.CLIENT_URL,
    ].filter(Boolean),
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Body parsers
app.use(json());
app.use(urlencoded({ extended: true }));

// Sessions (REQUIRED for Google OAuth)
app.use(
  session({
    name: "safespend.sid",
    secret: process.env.SESSION_SECRET || "your-session-secret-change-in-production",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 86400000, // 24 hours
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    },
  })
);

// Passport
app.use(passport.initialize());
app.use(passport.session());

// DB
connectDB();

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/income", incomeRoutes);
app.use("/api/v1/expense", expenseRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);
app.use("/api/v1/budgets", budgetRoutes);
app.use("/api/v1/goals", goalRoutes);
app.use("/api/v1", contactRoutes); // Mounts /contact and /feedback

// Static files
app.use("/uploads", expressStatic(join(process.cwd(), "uploads")));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

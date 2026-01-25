import { Schema, model } from "mongoose";
import { hash, compare } from "bcryptjs";

const UserSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    googleId: {
      type: String,
      default: null,
    },
    authProvider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },
    gmailAccessToken: {
      type: String,
      default: null,
    },
    gmailRefreshToken: {
      type: String,
      default: null,
    },
    profileImageUrl: {
      type: String,
      default: null,
    },
    bio: { type: String, default: null },
    gender: { type: String, default: null },
    dob: { type: Date, default: null },
    phone: { type: String, default: null },
    address: { type: String, default: null },
    city: { type: String, default: null },
    state: { type: String, default: null },
    country: { type: String, default: null },
    zip: { type: String, default: null },
    settings: {
      currency: { type: String, default: "INR" },
      monthStart: { type: Number, default: 1 },
      budgetThresholds: {
        warning: { type: Number, default: 80 },
        danger: { type: Number, default: 100 },
      },
    },
    otp: {
      type: String,
      default: null,
    },
    otpExpires: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  if (this.password) this.password = await hash(this.password, 10);
  next();
});

UserSchema.methods.comparePassword = async function (enteredPassword) {
  return await compare(enteredPassword, this.password);
};

export default model("User", UserSchema);

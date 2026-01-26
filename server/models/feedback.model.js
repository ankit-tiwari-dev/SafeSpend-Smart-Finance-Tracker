import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
    {
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
        },
        category: {
            type: String,
            required: true,
            enum: ["Bug Report", "Feature Request", "General Feedback", "Other"],
        },
        comment: {
            type: String,
            required: true,
            trim: true,
            maxlength: 1000,
        },
        email: {
            type: String,
            trim: true, // Optional: if user wants to be contacted
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // Optional: link to user if logged in
        },
    },
    { timestamps: true }
);

const Feedback = mongoose.model("Feedback", feedbackSchema);
export default Feedback;

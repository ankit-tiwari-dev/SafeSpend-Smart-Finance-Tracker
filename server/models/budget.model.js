import { Schema, model } from "mongoose";

const BudgetSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        icon: {
            type: String,
        },
        limit: {
            type: Number,
            required: true,
        },
        spent: {
            type: Number,
            default: 0,
        },
        month: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

// Ensure unique budget per category per month for a user
BudgetSchema.index({ userId: 1, category: 1, month: 1 }, { unique: true });

export default model("Budget", BudgetSchema);

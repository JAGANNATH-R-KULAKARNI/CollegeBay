import mongoose from "mongoose";
import { Order } from "./Order";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    cart: {
      type: [String],
      default: [],
    },
    orders: [
      {
        orderId: { type: String }, //details.id
        cart: {
          type: [
            {
              name: { type: String },
              route: { type: String },
              category: { type: String },
              image: { type: String },
              price: { type: Number },
              brand: { type: String },
              rating: { type: Number },
              numReviews: { type: Number },
              countInStock: { type: Number },
            },
          ],
        },
        amountPaid: { type: Number, required: true },
        paidOn: { type: String }, //update_time
        name: { type: String },
        email: { type: String },
        phnum: { type: String },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;

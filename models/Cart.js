import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    route: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);

const Cart = mongoose.models.Cart || mongoose.model("Cart", cartSchema);
export default Cart;

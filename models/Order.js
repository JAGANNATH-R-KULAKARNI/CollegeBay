import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    orderId: { type: String }, //details.id
    cart: { type: [String] },
    cartAmount: { type: [Number] },
    amountPaid: { type: Number, required: true },
    paidOn: { type: String }, //update_time
    name: { type: String },
    email: { type: String },
    phnum: { type: String },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);
export default Order;

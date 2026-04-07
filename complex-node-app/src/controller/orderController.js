import orderDetails from "../db/db.js";

export async function fetchOrders(req, res) {
  try {
    const orders = await orderDetails.getOrders(req.user.id);
    return res.status(200).json(orders);
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
}
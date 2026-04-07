const calculateTotal=async(order, discountService)=> {
  if (!order || !order.items || order.items.length === 0) {
    throw new Error('Invalid order');
  }

  const subtotal = order.items.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  const discount = await discountService.getDiscount(order.userId);

  if (discount > 0) {
    return subtotal - discount;
  }

  return subtotal;
}

export default calculateTotal;
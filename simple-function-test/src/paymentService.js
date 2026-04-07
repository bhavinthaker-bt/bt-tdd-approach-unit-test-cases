const processPayment= async(paymentApi, amount)=> {
  if (!amount || amount <= 0) {
    throw new Error('Invalid amount');
  }

  try {
    return await paymentApi.pay(amount);
  } catch (err) {
    try {
      return await paymentApi.pay(amount);
    } catch (err2) {
      throw new Error('Payment failed');
    }
  }
}

export default processPayment;
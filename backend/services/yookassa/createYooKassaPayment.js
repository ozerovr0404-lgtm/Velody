import { YooCheckout } from "@a2seven/yoo-checkout";
import { randomUUID } from 'crypto';

const checkout = new YooCheckout({
  shopId: process.env.YOOKASSA_SHOP_ID,
  secretKey: process.env.YOOKASS_SECRET_KEY
});

export const createYooKassaPayment = async ({
  amount,
  description
}) => {

  console.log({
 shop: process.env.YOOKASSA_SHOP_ID,
 secret: process.env.YOOKASSA_SECRET_KEY
});
  const payment = await checkout.createPayment(
    {
      amount: {
        value: amount.toFixed(2),
        currency: "RUB"
      },
      confirmation: {
        type: "redirect",
        return_url: "http://localhost:5173/payment/success"
      },
      capture: true,
      description
    },
    randomUUID()
  );

  return payment;
}
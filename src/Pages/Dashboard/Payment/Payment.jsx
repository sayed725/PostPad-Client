import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheakoutForm from "./CheakoutForm";

import { Helmet } from "react-helmet-async";
import { useState } from "react";
import SslPayment from "./ssl-payment";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState("stripe");

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  return (
    <div className="container mx-auto p-4">
      <Helmet>
        <title>PostPad | Payment</title>
      </Helmet>

      <h2 className="text-4xl font-semibold text-center mb-10">Payments</h2>

      <div className="mb-6 flex justify-center">
        <select
          value={paymentMethod}
          onChange={handlePaymentMethodChange}
          className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-[#20293d] dark:text-white "
        >
          <option value="stripe">Pay with Stripe</option>
          <option value="ssl">Pay with SSL eCommerce</option>
        </select>
      </div>

      <div className="max-w-md mx-auto">
        {paymentMethod === "stripe" ? (
          <Elements stripe={stripePromise}>
            <CheakoutForm />
          </Elements>
        ) : (
          <SslPayment/>
        )}
      </div>
    </div>
  );
};

export default Payment;

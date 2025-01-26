import { loadStripe } from "@stripe/stripe-js";

import { Elements } from "@stripe/react-stripe-js";
import CheakoutForm from "./CheakoutForm";
import { Helmet } from "react-helmet-async";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
const Payment = () => {
  return (
    <div>
      <Helmet>
        {" "}
        <title>PostPad | Payment </title>
      </Helmet>
      <h2 className="text-4xl font-semibold text-center mb-10">Payments</h2>
      <div>
        <Elements stripe={stripePromise}>
          <CheakoutForm></CheakoutForm>
        </Elements>
      </div>
    </div>
  );
};

export default Payment;

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";

import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import { Helmet } from "react-helmet-async";

const CheakoutForm = () => {
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const navigate = useNavigate();

  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const totalPrice = 10;
  // console.log(totalPrice)

  useEffect(() => {
    if (totalPrice > 0) {
      axiosSecure
        .post("/create-payment-intent", { price: totalPrice })
        .then((res) => {
          //    console.log(res.data.clientSecret)
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [axiosSecure, totalPrice]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      // console.log('payment error', error)
      setError(error.message);
    } else {
      // console.log('payment method', paymentMethod)
      setError("");
    }

    // confirm payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      // console.log('confirm error')
    } else {
      // console.log('payment intent', paymentIntent)
      if (paymentIntent.status === "succeeded") {
        // console.log('transaction id', paymentIntent.id)
        setTransactionId(paymentIntent.id);

        axiosSecure.patch(`/payment/${user.email}`).then((res) => {
          //   console.log(res.data)
          if (res.data.modifiedCount > 0) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: ` Congrats!! ${user.displayName} is an Member Now!`,
              showConfirmButton: false,
              timer: 1500,
            });
            navigate("/member");
          }
        });
      }
    }
  };

  return (
    <div>
      <Helmet>
        {" "}
        <title>PostPad | Payment </title>
      </Helmet>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className="bg-[#005694] hover:bg-[#005694] text-white px-6 py-2 mt-10 rounded-md my-4"
          type="submit"
          disabled={!stripe || !clientSecret}
        >
          Pay
        </button>
        <p className="text-red-600">{error}</p>
        {transactionId && (
          <p className="text-green-600">
            {" "}
            Your transaction id: {transactionId}
          </p>
        )}
      </form>

      <h2>Demo card for testing: 4242 4242 4242 4242 </h2>
      <h2>Date: Any future date </h2>
      <h2>CVC: Any 3 number </h2>
      <h2>ZIP: Any 5 number </h2>
    </div>
  );
};

export default CheakoutForm;

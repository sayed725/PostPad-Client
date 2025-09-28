import React, { useState } from 'react';
import useAuth from '../../../Hooks/useAuth';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import { Helmet } from 'react-helmet-async';

const SslPayment = () => {
   const { user } = useAuth();

   const axiosPublic = useAxiosPublic();

  const totalPrice = 10;

  const handlePayment = async(e) => {
    e.preventDefault();
    // save the payment info to the server

    const payment = {
        email: user?.email,
        name: user?.displayName,
        price: totalPrice,
        transactionId: "",
        date: new Date(),
        status: 'pending',
    }


    const response = await axiosPublic.post('/create-ssl-payment', payment);
    console.log(response)

    if(response.data?.gatewayURL){
      window.location.replace(response.data.gatewayURL);
    }



















    // console.log('Processing SSL payment for amount', payment);
  };

  return (
    <div className="max-w-md mx-auto p-6 border rounded-lg shadow-md">
        <Helmet>
        {" "}
        <title>PostPad | Payment </title>
      </Helmet>
      <h3 className="text-2xl font-medium mb-4 text-center">SSL Payment</h3>
      <form onSubmit={handlePayment}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="amount">
            Payment Amount
          </label>
          <input
            type="number"
            id="amount"
            defaultValue={totalPrice}
            readOnly
            placeholder="Enter amount"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-[#20293d] dark:text-white "
            required
            min="1"
            step="0.01"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-[#005694] text-white p-2 rounded-md hover:bg-[#005694] transition-colors"
        >
          Pay Now
        </button>
      </form>
    </div>
  );
};

export default SslPayment;
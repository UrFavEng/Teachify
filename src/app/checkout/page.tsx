"use client";
import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./_components/CheckoutForm";
import { useSearchParams } from "next/navigation";
const Page = () => {
  const searchParams = useSearchParams();
  const options = {
    mode: "payment" as const, // Ensure mode is set as a literal type
    currency: "usd",
    amount: Number(searchParams.get("amount")) * 100,
  };
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
  );

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm
        amount={(Number(searchParams.get("amount")) * 100) as number}
      />
    </Elements>
  );
};

export default Page;

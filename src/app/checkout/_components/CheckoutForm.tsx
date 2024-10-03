"use client";
import { CartContext } from "@/context/CartContext";
import CartAPIs from "@/utils/CartAPIs";
import OrderAPIs from "@/utils/OrderAPIs";
import { useUser } from "@clerk/nextjs";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { useContext, useState } from "react";
interface CheckoutFormProps {
  amount: number;
}
const CheckoutForm = ({ amount }: CheckoutFormProps) => {
  const { user } = useUser();

  const { cart, setCart } = useContext(CartContext);
  const [errorMessage, setErrorMessage] = useState();

  const [loading, setLoading] = useState(false);

  const handleError = (error) => {
    setLoading(false);
    setErrorMessage(error.message);
  };
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    setLoading(true);
    createOrder();
    // Trigger form validation and wallet collection
    const { error: submitError } = await elements.submit();
    if (submitError) {
      handleError(submitError);
      return;
    }

    const res = await fetch("api/create-intent", {
      method: "POST",
      body: JSON.stringify({ amount: amount }),
    });
    const clientSecret = await res.json();
    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      clientSecret,
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/payment-confirm",
      },
    });

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      console.log(result.error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };
  const createOrder = () => {
    let productIds = [];
    cart.forEach((el) => {
      productIds.push(el?.product?.products[0]?.documentId);
    });
    const data = {
      data: {
        email: user?.primaryEmailAddress?.emailAddress,
        userName: user?.fullName,
        amount,
        products: productIds,
      },
    };
    OrderAPIs.createOrder(data).then((res) => {
      if (res) {
        cart.forEach((element) => {
          CartAPIs.deleteCart(element?.product?.products[0]?.documentId);
        });
      }
    });
  };
  return (
    <form
      onSubmit={handleSubmit}
      className=" flex items-center justify-center flex-col container mx-auto my-12 px-6 min-h-[70vh]"
    >
      <div className=" w-[85vw] md:w-[50vw]">
        {" "}
        <PaymentElement />
      </div>
      <button className=" bg-primary py-2 mt-6 rounded-lg px-6 text-shadowOrBorder transition-all ease-in-out hover:bg-bgPrimary hover:text-primary">
        Submit
      </button>
    </form>
  );
};

export default CheckoutForm;

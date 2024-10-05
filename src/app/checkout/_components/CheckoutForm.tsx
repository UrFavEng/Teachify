"use client";
import {
  useCreateOrderMutation,
  useDeleteCartMutation,
  useGetUserCartQuery,
} from "@/app/store/apislice";
import { CreateOrderReq } from "@/app/store/types";
import { useUser } from "@clerk/nextjs";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { StripeError } from "@stripe/stripe-js";
import { useState } from "react";
interface CheckoutFormProps {
  amount: number;
}
const CheckoutForm = ({ amount }: CheckoutFormProps) => {
  const { user } = useUser();

  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  console.log(errorMessage, loading);

  const handleError = (error: StripeError) => {
    setLoading(false);
    setErrorMessage(error?.message || "An unknown error occurred");
  };
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    setLoading(true);
    createOrderFun(); // Trigger form validation and wallet collection
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
  const { data: dataUserCart } = useGetUserCartQuery({
    email: user?.primaryEmailAddress?.emailAddress,
  });
  const [DeleteCart] = useDeleteCartMutation();

  const deleteItem = (id: string) => {
    DeleteCart({ id })
      .unwrap()
      .then((fulfilled) => {
        console.log(fulfilled);
        // console.log("cart =>", cart);
        console.log("id =>", id);
        // setCart((old) => old?.filter((i) => i?.product?.documentId !== id));
      })
      .catch((rejected) => {
        console.log(rejected);
      });
    // CartAPIs.deleteCart(id).then(() => {});
  };
  const [CreateOrder] = useCreateOrderMutation();
  const createOrderFun = () => {
    if (dataUserCart) {
      const productIds = dataUserCart.data
        .map((el) => el.products[0].documentId)
        .filter(Boolean) as string[];

      const data: CreateOrderReq = {
        data: {
          email: user?.primaryEmailAddress?.emailAddress as string,
          userName: user?.fullName as string,
          amount,
          products: productIds,
        },
      };
      CreateOrder(data)
        .unwrap()
        .then(() => {
          dataUserCart.data.forEach((element) => {
            console.log(element);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            deleteItem(element.documentId as string);
          });
        })
        .catch((rejected) => {
          console.log(rejected);
        });
    }
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

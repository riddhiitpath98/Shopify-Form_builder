import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Button, Input } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import styles from "./CardElement.module.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function CheckoutForm({ priceId, setShowCardElement, toggleModal }) {
    console.log('priceId: ', priceId);
    const shopId = useSelector((state) => state.shopId.shopId);
    console.log('shopId: ', shopId);
    const user = useSelector(state => state?.user?.userData?.user)
    const navigate = useNavigate();
    // collect data from the user
    const userData = useState({});

    // stripe items
    const stripe = useStripe();
    const elements = useElements();

    // main function
    const createSubscription = async () => {
        try {

            // create a payment method
            const paymentMethod = await stripe?.createPaymentMethod({
                type: "card",
                card: elements?.getElement(CardElement),
                billing_details: {
                    name: "Riddhi",
                    email: "riddhip.itpathsolutions@gmail.com",
                    address: { city: "Ahmedabad", line1: "Naroda road", line2: "memco", country: "US", state: "Gujrat" }
                },
            });
            console.log('first', {
                paymentMethod: paymentMethod?.paymentMethod?.id,
                name: "Riddhi",
                email: "riddhip.itpathsolutions@gmail.com",
                priceId: priceId
            })
            // call the backend to create subscription
            const response = await axios.post("/payment/create-subscription", {
                paymentMethod: paymentMethod?.paymentMethod?.id,
                name: "Riddhi",
                email: "riddhip.itpathsolutions@gmail.com",
                priceId: priceId,
                shopId
            })
            const confirmPayment = await stripe?.confirmCardPayment(
                response?.data?.clientSecret
            );

            if (confirmPayment?.error) {
                alert(confirmPayment.error.message);
            } else {
                toast("Payment Successfull")
                navigate("/dashboard", { replace: true });
                setShowCardElement(false);
                toggleModal();
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="grid gap-4 m-auto">
            <input
                placeholder="Name"
                type="text"
                onChange={(e) => handleOnChange(e.target.value)}
                className={styles.classicInput}
            />
            <br />
            <input
                placeholder="Email"
                type="text"
                onChange={(e) => handleOnChange(e.target.value)}
                className={styles.classicInput}
            />

            <CardElement />
            <button onClick={createSubscription} disabled={!stripe} className={styles.classicButton}>
                Subscribe
            </button>
        </div>
    );
}

export default CheckoutForm;
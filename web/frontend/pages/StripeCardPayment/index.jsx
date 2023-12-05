import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Button, Input } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import styles from "./CardElement.module.css";

function CheckoutForm() {
    const user = useSelector(state => state?.user?.userData?.user)

    // collect data from the user
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

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
                    name: name,
                    email: email,
                },
            });

            console.log("object", {
                paymentMethod: paymentMethod?.paymentMethod?.id,
                name: name,
                email: email,
                priceId: 'price_1OJYVgSEo6lSgy9nGpTnG5Rr'
            });
            // call the backend to create subscription
            // const response = await axios.post("/payment/create-subscription", {
            //     paymentMethod: paymentMethod?.paymentMethod?.id,
            //     name: user?.shop_owner,
            //     email: user?.email,
            //     priceId: 'price_1OJYVgSEo6lSgy9nGpTnG5Rr'
            // })
            // const data = await response.json();

            const confirmPayment = await stripe?.confirmCardPayment(
                "pi_3OJrjnSEo6lSgy9n1SHLZyb6_secret_vaK5oGJHEZ8fFRStiX3Ue3P43"
            );
            console.log('confirmPayment', confirmPayment)
            if (confirmPayment?.error) {
                alert(confirmPayment.error.message);
            } else {
                alert("Success! Check your email for the invoice.");
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
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={styles.classicInput}
            />
            <br />
            <input
                placeholder="Email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
import { Elements } from '@stripe/react-stripe-js';
import React from 'react';
import CheckoutForm from '../StripeCardPayment';
import { loadStripe } from "@stripe/stripe-js";
import { Modal } from '@shopify/polaris';
const stripePromise = loadStripe("pk_test_51Ns1GtSEo6lSgy9nBDPpMCyJkpcuDTYpDo3VV3HZ7kgxWS2URSwUqWL7ShhgXQwWZLCUXHYfPSr5grIM9SCaus5r00DHhniALW");

const PaymentModal = ({ active, priceId, toggleModal, setShowCardElement }) => {
    return (
        <Modal
            open={active}
            // onClose={toggleModal}
            title="Pricing plans"
            large
        >
            <Elements stripe={stripePromise}>
                <CheckoutForm priceId={priceId} toggleModal={toggleModal} setShowCardElement={setShowCardElement} />
            </Elements>
        </Modal>
    )
}

export default PaymentModal
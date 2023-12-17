import { Elements } from '@stripe/react-stripe-js';
import React from 'react';
import CheckoutForm from '../StripeCardPayment';
import { loadStripe } from "@stripe/stripe-js";
import { Modal } from '@shopify/polaris';
const stripePromise = loadStripe("pk_live_IGCZ91wblgKajj7dxA8xci0E");

const PaymentModal = ({ active, priceId, toggleModal, setShowCardElement }) => {
    return (
        <Modal
            open={active}
            onClose={() => setShowCardElement(false)}
            title="Make Payment"
            large
        >
            <Elements stripe={stripePromise}>
                <CheckoutForm priceId={priceId} toggleModal={toggleModal} setShowCardElement={setShowCardElement} />
            </Elements>
        </Modal>
    )
}

export default PaymentModal
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Country, State, City } from "country-state-city";
import { SUBSCRIPTION_TYPES, toastConfig, validateTextField } from "../../constant";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Spinner from 'react-bootstrap/Spinner'
import 'bootstrap/dist/css/bootstrap.min.css';

import "./CardElement.css";
import { useAppQuery } from "../../hooks";
import { addShopData } from "../../redux/actions/allActions";
import IFrameLoader from "../../components/IFrameLoader";

function CheckoutForm({ priceId, setShowCardElement, toggleModal }) {
    const shopData = useAppQuery({ url: "/api/shop" });
    const subscriptionData = useSelector(
        (state) => state.subscription?.subscriptionData?.data
    );
    const [iframeVisible, setIFrameVisible] = useState(false);

    const handleIFrameOpen = () => {
        setIFrameVisible(true);
    };
    const handleIframeClose = () => {
        setIFrameVisible(false);
    };


    const initialState = {
        email: "",
        cardholderName: "",
        addressLine1: "",
        addressLine2: "",
        country: "",
        city: "",
        state: "",
        accept_TNC: ""
    };
    const [billingAddress, setBillingAddress] = useState({
        ...initialState, accept_TNC: false
    });
    const [errorValues, setErrorValues] = useState(initialState);
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [cardData, setCardData] = useState({});
    const [paymentLoading, setPaymentLoading] = useState(false);

    const shopId = useSelector((state) => state.shopId.shopId);
    const user = useSelector((state) => state?.user?.userData?.user);
    const navigate = useNavigate();
    // collect data from the user
    const userData = useState({});
    const dispatch = useDispatch();

    useEffect(() => {
        // Fetch the initial list of countries
        const countryList = Country.getAllCountries();
        setCountries(countryList);
    }, []);

    // stripe items
    const stripe = useStripe();
    const elements = useElements();

    const options = {
        // passing the client secret obtained from the server
        clientSecret: "{{CLIENT_SECRET}}",
    };

    const enabledSubmitButton = useMemo(() => {
        let isValid = true;
        for (let i = 0; i < Object.keys(billingAddress).length; i++) {
            if (validateTextField(Object.keys(billingAddress)[i], billingAddress[Object.keys(billingAddress)[i]]) !== "") {
                isValid = false;
                break;
            }
        }
        if (Object.keys(cardData).length === 0 || !cardData.complete) {
            isValid = false;
        }
        return !isValid
    }, [billingAddress, cardData])

    const handleCountryChange = (e) => {
        let selectedCountry = e.target.value;
        // Update the selected country in the state
        setBillingAddress({
            ...billingAddress,
            country: selectedCountry,
            state: "", // Reset state when the country changes
            city: "", // Reset city when the country changes
        });
        setErrorValues({ ...errorValues, [e.target.name]: validateTextField(e.target.name, selectedCountry) });
        // Fetch and update the list of states based on the selected country
        const countryStates = State.getStatesOfCountry(selectedCountry);
        setStates(countryStates);
        setCities([]);
    };
    const handleStateChange = (e) => {
        let selectedState = JSON.parse(e.target.value);
        setErrorValues({ ...errorValues, [e.target.name]: validateTextField(e.target.name, selectedState.isoCode) });
        setBillingAddress({
            ...billingAddress,
            [e.target.name]: selectedState.isoCode,
            city: "", // Reset city when the state changes
        });

        // Fetch and update the list of cities based on the selected state
        const stateCities = City.getCitiesOfState(
            selectedState?.countryCode,
            selectedState?.isoCode
        );
        setCities(stateCities);
    };

    const handleInputChange = (e) => {
        const { type, name, value, checked } = e.target;
        if (type === 'checkbox') {
            setErrorValues({ ...errorValues, [name]: validateTextField(name, checked) });
            setBillingAddress({
                ...billingAddress,
                [name]: checked,
            });
        }
        else {
            setErrorValues({ ...errorValues, [name]: validateTextField(name, value) });
            setBillingAddress({
                ...billingAddress,
                [name]: value,
            });
        }

    };
    const handleSubmitSubscription = async (e) => {
        e.preventDefault();
        const errorMessages = {};
        const { ...data } = billingAddress;
        Object.keys(data).forEach((val) => {
            const error = validateTextField(val, data[val]);
            if (error) {
                errorMessages[val] = error;
            }
        });
        if (Object.keys(errorMessages).length) {
            setErrorValues(errorMessages);
            // return;
        }

        try {
            // create a payment method
            if (!Object.values(billingAddress).includes("")) {
                setPaymentLoading(true);
                const paymentMethod = await stripe?.createPaymentMethod({
                    type: "card",
                    card: elements?.getElement(CardElement),
                    billing_details: {
                        name: billingAddress?.cardholderName,
                        email: billingAddress?.email,
                        address: {
                            city: billingAddress?.city,
                            line1: billingAddress?.addressLine1,
                            line2: billingAddress?.addressLine2,
                            country: billingAddress?.country,
                            state: billingAddress?.state,
                        },
                    },
                });

                // call the backend to create subscription
                const response = await axios.post("/payment/create-subscription", {
                    paymentMethod: paymentMethod?.paymentMethod?.id,
                    name: billingAddress?.cardholderName,
                    email: billingAddress?.email,
                    priceId: priceId,
                    shopId,
                    customerId: user?.subscription?.customerId || null,
                });

                await stripe?.confirmCardPayment(
                    response?.data?.clientSecret
                ).then(res => {
                    if (res?.paymentIntent?.status === 'succeeded') {
                        const {
                            id,
                            name,
                            email,
                            domain,
                            city,
                            country,
                            customer_email,
                            shop_owner,
                            myshopify_domain,
                            phone,
                        } = shopData.data;
                        let user = {
                            shopId: id,
                            shopName: name,
                            email,
                            domain: myshopify_domain,
                            city,
                            country,
                            customer_email,
                            shop_owner,
                            myshopify_domain,
                            phone,
                            acceptTermCondition: billingAddress?.accept_TNC
                        };
                        subscriptionData.filter(({ subscriptionName, _id }, index) => {
                            if (subscriptionName === SUBSCRIPTION_TYPES.PREMIUM) {
                                user = { ...user, subscriptionName, subscriptionId: _id };
                            }
                        });
                        dispatch(addShopData(user)).then((data) => {
                            if (data?.payload) {
                                setShowCardElement(false);
                                toggleModal();
                                setBillingAddress({})
                                setErrorValues({});
                                setPaymentLoading(false)
                                toast.success("premium subscription Added", toastConfig);
                                navigate("/dashboard", { replace: true });
                            }
                        });
                    }
                    if (res?.error) {
                        toast.error(res.error.message, toastConfig);
                    }
                });
            }
        } catch (error) {
            console.log(error);
        }
    };


    const styleOptions = {
        style: {
            base: {
                fontSize: "16px",
                color: "#424770",
                letterSpacing: "0.025em",
                fontFamily: "Source Code Pro, monospace",
                "::placeholder": {
                    color: "#aab7c4",
                },
            },
            invalid: {
                color: "#9e2146",
            },
        },
    };
    return (
        <Form noValidate className="custom-container" onSubmit={(e) => handleSubmitSubscription(e)}>
            <h1 className="formHeader">Add Card Details</h1>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label className="labelName">Email</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={billingAddress?.email}
                        onChange={handleInputChange}
                        // className="classicInput"
                        placeholder="Enter email"
                    />
                    <small className="text-danger">{errorValues?.email}</small>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="formCard">
                    <Form.Label className="labelName">Card Details:</Form.Label>
                    <CardElement
                        options={{ style: { base: { fontSize: "16px" } } }}
                        onChange={(event) => {
                            setCardData(event);
                        }}
                    />
                    <small className="text-danger">{cardData?.error?.message}</small>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridCardDetail">
                    <Form.Label className="labelName">Cardholder Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="cardholderName"
                        value={billingAddress?.cardholderName}
                        onChange={handleInputChange}
                        // className="classicInput"
                        placeholder="Enter Name"
                    />
                    <small className="text-danger">{errorValues?.cardholderName}</small>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridAddress1">
                    <Form.Label className="labelName">Address Line 1</Form.Label>
                    <Form.Control
                        type="text"
                        name="addressLine1"
                        value={billingAddress?.addressLine1}
                        onChange={handleInputChange}
                        // className="classicInput"
                        placeholder="Address line 1"
                    />
                    <small className="text-danger">{errorValues?.addressLine1}</small>
                </Form.Group>
            </Row>
            <Row>
                <Form.Group as={Col} controlId="formGridAddress2">
                    <Form.Label className="labelName">Address Line 2</Form.Label>
                    <Form.Control
                        type="text"
                        name="addressLine2"
                        value={billingAddress?.addressLine2}
                        onChange={handleInputChange}
                        // className="classicInput"
                        placeholder="Address line 2"
                    />
                    <small className="text-danger">{errorValues?.addressLine2}</small>
                </Form.Group>
            </Row>

            <Row className="mb-3">
                <Form.Group className="labelName" as={Col} controlId="formGridCountry">
                    <Form.Label className="labelName">Country</Form.Label>
                    <Form.Control
                        as="select"
                        name="country"
                        custom
                        value={billingAddress?.country}
                        onChange={(e) => handleCountryChange(e)}
                    >
                        <option value="" disabled selected>
                            Select Country
                        </option>
                        {countries?.map((option) => (
                            <option key={option.isoCode} value={option.isoCode}>
                                {option.name}
                            </option>
                        ))}
                    </Form.Control>
                    <small className="text-danger">{errorValues?.country}</small>
                </Form.Group>
                <Form.Group className="labelName" as={Col} controlId="formGridState">
                    <Form.Label className="labelName">State</Form.Label>
                    <Form.Control
                        as="select"
                        name="state"
                        custom
                        value={billingAddress?.state?.name}
                        onChange={(e) => handleStateChange(e)}
                    >
                        <option value="" disabled selected>
                            Select State
                        </option>
                        {states?.map((option) => (
                            <option key={option.isoCode} value={JSON.stringify(option)}>
                                {option.name}
                            </option>
                        ))}
                    </Form.Control>
                    <small className="text-danger">{errorValues?.state}</small>
                </Form.Group>
                <Form.Group className="labelName" as={Col} controlId="formGridCity">
                    <Form.Label className="labelName">City</Form.Label>
                    <Form.Control
                        as="select"
                        name="city"
                        custom
                        value={billingAddress?.city}
                        onChange={(e) => handleInputChange(e)}
                    >
                        <option value="" disabled selected>
                            Select City
                        </option>
                        {cities?.map((option) => (
                            <option key={option.isoCode} value={option.isoCode}>
                                {option.name}
                            </option>
                        ))}
                    </Form.Control>
                    <small className="text-danger">{errorValues?.city}</small>
                </Form.Group>
            </Row>
            <Row>
                <Form.Group as={Col} controlId="formGridCheckbox">
                    <Form.Check
                        type="checkbox"
                        id="myCheckbox"
                        name="accept_TNC"
                        value={billingAddress.accept_TNC}
                        label={<span>I agree{' '}<span className="terms-condition-container" onClick={handleIFrameOpen}>Terms and Conditions</span></span>}
                        onChange={handleInputChange}
                    />
                    <small className="text-danger">{errorValues?.accept_TNC}</small>
                </Form.Group>
            </Row>
            <Row>
                <Button type="submit" disabled={enabledSubmitButton} className="buttonElement">
                    {paymentLoading ? (
                        <Spinner animation="border" size="sm" />
                    ) : (
                        <span>Pay $6.67</span>
                    )}

                </Button>
            </Row>
            {iframeVisible && (
                <IFrameLoader
                    open={iframeVisible}
                    handleClose={handleIframeClose}
                    src="https://www.google.com?igu=1"
                    title="Example Iframe"
                    width="1000"
                    height="1000"
                />
            )}
        </Form>
    );
}
export default CheckoutForm;

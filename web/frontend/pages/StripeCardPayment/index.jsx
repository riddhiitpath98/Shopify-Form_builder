import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Country, State, City } from "country-state-city";
import { validateTextField } from "../../constant";
import "./CardElement.css";

function CheckoutForm({ priceId, setShowCardElement, toggleModal }) {
  const initialState = {
    email: "",
    cardholderName: "",
    addressLine1: "",
    addressLine2: "",
    country: "",
    city: "",
    zip: "",
    state: "",
  };
  const [billingAddress, setBillingAddress] = useState(initialState);
  const [errorValues, setErrorValues] = useState(initialState);
  console.log("errorValues: ", errorValues);

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const shopId = useSelector((state) => state.shopId.shopId);
  const user = useSelector((state) => state?.user?.userData?.user);
  const navigate = useNavigate();
  // collect data from the user
  const userData = useState({});

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

  const handleCountryChange = (selectedCountry) => {
    // Update the selected country in the state
    setBillingAddress({
      ...billingAddress,
      country: selectedCountry,
      state: "", // Reset state when the country changes
      city: "", // Reset city when the country changes
    });

    // Fetch and update the list of states based on the selected country
    const countryStates = State.getStatesOfCountry(selectedCountry);
    setStates(countryStates);
    setCities([]);
  };
  const handleStateChange = (selectedState) => {
    setBillingAddress({
      ...billingAddress,
      state: selectedState?.isoCode,
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
    const { name, value } = e.target;
    setErrorValues({ ...errorValues, [name]: validateTextField(name, value) });
    setBillingAddress({
      ...billingAddress,
      [e.target.name]: e.target.value,
    });
  };
  // main function
  const createSubscription = async (e) => {
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
      return;
    }
    // if (!stripe || !elements) {
    //   return;
    // }
    try {
      // create a payment method
      const paymentMethod = await stripe?.createPaymentMethod({
        type: "card",
        card: elements?.getElement(CardElement),
        billing_details: {
          name: "Riddhi",
          email: "riddhip.itpathsolutions@gmail.com",
          address: {
            city: "Ahmedabad",
            line1: "Naroda road",
            line2: "memco",
            country: "US",
            state: "Gujrat",
          },
        },
      });
      console.log("first", {
        paymentMethod: paymentMethod?.paymentMethod?.id,
        name: "Riddhi",
        email: "riddhip.itpathsolutions@gmail.com",
        priceId: priceId,
      });
      // call the backend to create subscription
      const response = await axios.post("/payment/create-subscription", {
        paymentMethod: paymentMethod?.paymentMethod?.id,
        name: "Riddhi",
        email: "riddhip.itpathsolutions@gmail.com",
        priceId: priceId,
        shopId,
      });
      const confirmPayment = await stripe?.confirmCardPayment(
        response?.data?.clientSecret
      );

      if (confirmPayment?.error) {
        alert(confirmPayment.error.message);
      } else {
        toast("Payment Successfull");
        navigate("/dashboard", { replace: true });
        setShowCardElement(false);
        toggleModal();
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
    <form
      onSubmit={(e) => createSubscription(e)}
      noValidate
      style={{
        display: "grid",
        // gap: "10px",
        maxWidth: "500px",
        margin: "auto",
      }}
    >
      <label htmlFor="email" className="">
        Email
      </label>
      <input
        type="text"
        name="email"
        value={billingAddress.email}
        onChange={handleInputChange}
        className="classicInput"
      />
      <p className="errorMessage">{errorValues?.email}</p>
      <label htmlFor="cardDetails">Card details</label>
      <CardElement
        options={{ style: { base: { fontSize: "16px" } } }}
        onChange={(event) => {
          console.log("CardElement [change]", event);
        }}
      />

      <label htmlFor="cardholderName">Cardholder Name</label>
      <input
        type="text"
        name="cardholderName"
        value={billingAddress.cardholderName}
        onChange={handleInputChange}
        className="classicInput"
      />
      <p className="errorMessage">{errorValues?.cardholderName}</p>
      <label htmlFor="addressLine1">Address Line 1</label>
      <input
        type="text"
        name="addressLine1"
        value={billingAddress.addressLine1}
        onChange={handleInputChange}
        className="classicInput"
      />
      <p className="errorMessage">{errorValues?.addressLine1}</p>
      <label htmlFor="addressLine2">Address Line 2</label>
      <input
        type="text"
        name="addressLine2"
        value={billingAddress.addressLine2}
        onChange={handleInputChange}
        className="classicInput"
      />
      <p className="errorMessage">{errorValues?.addressLine2}</p>
      <div
        style={{
          display: "grid",
          //   gridTemplateColumns: "1fr 1fr 1fr",
          //   gap: "10px",
        }}
      >
        <select
          id="country"
          name="country"
          value={billingAddress?.country}
          onChange={(e) => handleCountryChange(e.target.value)}
          className="classicInput otherInputs"
        >
          <option value="" disabled>
            Select Country
          </option>
          {countries?.map((option) => (
            <option key={option.isoCode} value={option.isoCode}>
              {option.name}
            </option>
          ))}
        </select>
        <p className="errorMessage">{errorValues?.country}</p>
        <select
          id="state"
          name="state"
          value={billingAddress?.state}
          onChange={(e) => handleStateChange(JSON.parse(e.target.value))}
          className="classicInput otherInputs"
        >
          <option value="" disabled>
            Select State
          </option>
          {states?.map((option) => (
            <option key={option.isoCode} value={JSON.stringify(option)}>
              {option.name}
            </option>
          ))}
        </select>
        <p className="errorMessage">{errorValues?.state}</p>
        <select
          id="city"
          name="city"
          value={billingAddress?.city}
          onChange={(e) => handleInputChange(e)}
          className="classicInput otherInputs"
        >
          <option value="" disabled>
            Select City
          </option>
          {cities?.map((option) => (
            <option key={option.isoCode} value={option.isoCode}>
              {option.name}
            </option>
          ))}
        </select>
        <p className="errorMessage">{errorValues?.city}</p>

        <label htmlFor="zip">Zip</label>
        <input
          type="text"
          name="zip"
          value={billingAddress.zip}
          onChange={handleInputChange}
          className="classicInput"
        />
        <p className="errorMessage">{errorValues?.zip}</p>
      </div>
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
  );
}
export default CheckoutForm;

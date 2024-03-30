import React, { useState } from 'react';
import { getCookie, getStripe } from '../../utils/utils';
import './checkout.css'
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
    const navigate = useNavigate();
    const [serviceCost, setServiceCost] = useState(50);

    // Function to handle checkout process
    // async function handleCheckout() {
    //     const stripe = await getStripe();

    //     // Calculate total price including GST
    //     const serviceCostFloat = parseFloat(serviceCost);
    //     const gst = (serviceCostFloat * 0.18).toFixed(2);
    //     const totalPrice = (serviceCostFloat + parseFloat(gst)).toFixed(2);

    //     const { error } = await stripe.redirectToCheckout({
    //         lineItems: [
    //             {
    //                 price: 'price_1OgTiiSHYwCJi5OxPHwRuPRY',
    //                 quantity: 1,
    //             },
    //         ],
    //         mode: 'payment',
    //         successUrl: `http://localhost:3000/success`,
    //         cancelUrl: `http://localhost:3000/payment/error`,
    //         customerEmail: 'ankit8743890@gmail.com',
    //     });
    //     console.warn(error.message);
    // }

    // Function to handle input change for service cost
    const handleServiceCostChange = (e) => {
        setServiceCost(e.target.value);
    };

    return (
        <div className="container mx-auto mt-8 text-gray-800">
            <div className="flex justify-between items-center mb-8">
                <div className="mr-8">
                    <h1 className="text-3xl font-bold mb-4">Checkout</h1>

                    {/* Service and Service Man Section */}
                    <div className="mb-4">
                        <CheckoutSection title="Selected Service" content="Service Name" />
                    </div>

                    <div>
                        <CheckoutSection title="Selected Service Man" content="Service Man Name" />
                    </div>
                </div>

                {/* Track Address Button */}
                <button onClick={() => navigate(`/map/${getCookie("userId")}`)} className="btn-blue">Track Address</button>
            </div>

            {/* Address Section */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Delivery Address</h2>
                <CheckoutSection title="Name" content="John Doe" />
                <CheckoutSection title="Address" content="123 Main Street" />
                <CheckoutSection title="City, Country" content="City, Country" />
            </div>

            {/* Price Summary Section */}
            {/* <div className="border-t pt-4"> */}
            {/* <h2 className="text-2xl font-bold mb-4">Price Summary</h2> */}

            {/* Input for Service Cost */}
            {/* <div className="flex justify-between mb-2">
                    <label htmlFor="serviceCost">Service Cost:</label>
                    <input
                        id="serviceCost"
                        type="number"
                        step="0.01"
                        min="0"
                        value={serviceCost}
                        onChange={handleServiceCostChange}
                        placeholder="Enter service cost"
                        className="input-field"
                    />
                </div> */}

            {/* Display GST and Total Price */}
            {/* <div className="flex justify-between mb-2">
                    <span>GST (18%):</span>
                    <span>${(serviceCost * 0.18).toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                    <span>Total Price:</span>
                    <span>${(parseFloat(serviceCost) + (parseFloat(serviceCost) * 0.18)).toFixed(2)}</span>
                </div> */}

            {/* Checkout Button */}
            {/* <button 
                onClick={handleCheckout}>
                Checkout
            </button> */}

            {/* </div> */}
            <a
                href="https://buy.stripe.com/test_6oE3fKg140Sl6XKcMN"
                className="btn-green"
                // className="btn-stripe"
                target="_blank"
                rel="noopener noreferrer"
            >
                Go to Stripe Payment
            </a>
        </div>
    );
};

// Reusable component for each section in the checkout page
const CheckoutSection = ({ title, content }) => (
    <div className="mb-2">
        <h2 className="text-lg font-semibold mb-1">{title}</h2>
        <p>{content}</p>
    </div>
);

export default CheckoutPage;

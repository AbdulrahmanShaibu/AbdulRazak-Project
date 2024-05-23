import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const stripePromise = loadStripe('your-public-key-from-stripe');

const Payment = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsProcessing(true);

        const cardElement = elements.getElement(CardElement);

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            setError(error.message);
            setIsProcessing(false);
        } else {
            setError(null);
            console.log('PaymentMethod:', paymentMethod);
            setIsProcessing(false);
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                maxWidth: 400,
                margin: '0 auto',
                padding: 3,
                border: '1px solid #ccc',
                borderRadius: 2,
                backgroundColor: '#fff',
                boxShadow: 3,
            }}
        >
            <Box sx={{ marginBottom: 2 }}>
                <Typography variant="h6" component="label" sx={{ display: 'block', marginBottom: 1 }}>
                    Card Details
                </Typography>
                <CardElement options={cardElementOptions} />
            </Box>
            {error && <Alert severity="error" sx={{ marginBottom: 2 }}>{error}</Alert>}
            <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={!stripe || isProcessing}
                startIcon={isProcessing && <CircularProgress size={24} />}
            >
                {isProcessing ? 'Processing...' : 'Pay'}
            </Button>
        </Box>
    );
};

const cardElementOptions = {
    style: {
        base: {
            fontSize: '16px',
            color: '#32325d',
            fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
            '::placeholder': {
                color: '#aab7c4',
            },
        },
        invalid: {
            color: '#fa755a',
        },
    },
};

const WrappedPayment = () => (
    <Elements stripe={stripePromise}>
        <Payment />
    </Elements>
);

export default WrappedPayment;

import React, { useState, useEffect } from 'react';
import { TextField, Button, Card, CardContent, Typography, Modal, Box, Snackbar, Alert } from '@mui/material';

const modalStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};

const modalContentStyle = {
    backgroundColor: '#fff',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    outline: 'none',
    borderRadius: '8px',
};

const cardStyle = {
    marginBottom: '16px',
};

const StudentPaymentStatus = () => {
    const [status, setStatus] = useState('');
    const [endDate, setEndDate] = useState('');
    const [payments, setPayments] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        // Fetch payment status data from API
    }, []);

    const validateInputs = () => {
        if (status.trim() === '' || endDate.trim() === '') {
            setError('Status and End Date are required.');
            return false;
        }
        // Additional validation logic can go here
        return true;
    };

    const handleAddPayment = () => {
        if (validateInputs()) {
            // Call API to add payment status
            const newPayment = { status, endDate };
            setPayments([...payments, newPayment]);
            setStatus('');
            setEndDate('');
            setOpenModal(false); // Close modal after adding payment
        } else {
            setOpenSnackbar(true);
        }
    };

    return (
        <div>
            {payments.map((payment, index) => (
                <Card key={index} style={cardStyle}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            Payment Information
                        </Typography>
                        <Typography variant="body1" component="p">
                            Status: {payment.status}
                        </Typography>
                        <Typography variant="body1" component="p">
                            End Date: {payment.endDate}
                        </Typography>
                    </CardContent>
                </Card>
            ))}

            <Button variant="contained" onClick={() => setOpenModal(true)} color="primary">
                Add Payment
            </Button>

            <Modal
                open={openModal}
                onClose={() => setOpenModal(false)}
                aria-labelledby="add-payment-modal-title"
                aria-describedby="add-payment-modal-description"
                style={modalStyle}
            >
                <Box style={modalContentStyle}>
                    <Typography variant="h6" id="add-payment-modal-title" gutterBottom>
                        Add Payment
                    </Typography>
                    <TextField
                    disabled={true}
                        label="Status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        fullWidth
                        margin="normal"
                        error={!!error}
                    />
                    <TextField
                        label="End Date"
                        type='date'
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        fullWidth
                        margin="normal"
                        error={!!error}
                    />
                    <Button variant="contained" onClick={handleAddPayment} color="primary">
                        Add
                    </Button>
                </Box>
            </Modal>

            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={() => setOpenSnackbar(false)}
            >
                <Alert onClose={() => setOpenSnackbar(false)} severity="error" sx={{ width: '100%' }}>
                    {error}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default StudentPaymentStatus;

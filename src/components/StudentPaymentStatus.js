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
    const [selectedPaymentId, setSelectedPaymentId] = useState(null);

    useEffect(() => {
        fetchPaymentStatuses(); // Fetch existing payment statuses on component mount
    }, []);

    const fetchPaymentStatuses = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/student/all_student_payment_status');
            if (!response.ok) {
                throw new Error('Failed to fetch payment statuses');
            }
            const data = await response.json();
            setPayments(data); // Set fetched payment statuses into state
        } catch (error) {
            console.error('Error fetching payment statuses:', error);
        }
    };

    const validateInputs = () => {
        if (status.trim() === '' || endDate.trim() === '') {
            setError('Status and End Date are required.');
            return false;
        }
        // Additional validation logic can go here
        return true;
    };
    const handleDeletePayment = async (paymentId) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/student/delete_student_payment_status/${paymentId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete payment status');
            }

            // Remove deleted payment from state
            const updatedPayments = payments.filter(payment => payment.id !== paymentId);
            setPayments(updatedPayments);
        } catch (error) {
            console.error('Error deleting payment status:', error);
        }
    };

    const handleAddPayment = async () => {
        if (validateInputs()) {
            try {
                let response;
                if (selectedPaymentId) {
                    // Update existing payment
                    response = await fetch(`http://127.0.0.1:8000/api/student/update_student_payment_status/${selectedPaymentId}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ status, end_date: endDate }),
                    });
                } else {
                    // Add new payment
                    response = await fetch('http://127.0.0.1:8000/api/student/add_student_payment_status', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ status, end_date: endDate }),
                    });
                }

                if (!response.ok) {
                    throw new Error(selectedPaymentId ? 'Failed to update payment status' : 'Failed to add payment status');
                }

                const newData = await response.json();
                if (selectedPaymentId) {
                    // Update existing payment in state
                    const updatedPayments = payments.map(payment => {
                        if (payment.id === selectedPaymentId) {
                            return newData;
                        }
                        return payment;
                    });
                    setPayments(updatedPayments);
                } else {
                    // Add new payment to state
                    setPayments([...payments, newData]);
                }

                setStatus('');
                setEndDate('');
                setSelectedPaymentId(null);
                setOpenModal(false); // Close modal after adding/updating payment
            } catch (error) {
                console.error(`Error ${selectedPaymentId ? 'updating' : 'adding'} payment status:`, error);
            }
        } else {
            setOpenSnackbar(true);
        }
    };

    const handleEditPayment = (paymentId) => {
        const selectedPayment = payments.find(payment => payment.id === paymentId);
        if (selectedPayment) {
            setStatus(selectedPayment.status);
            setEndDate(selectedPayment.end_date);
            setSelectedPaymentId(paymentId);
            setOpenModal(true);
        } else {
            console.error('Payment not found for editing');
        }
    };

    const handleCloseModal = () => {
        setStatus('');
        setEndDate('');
        setSelectedPaymentId(null);
        setOpenModal(false);
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
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
                            End Date: {payment.end_date}
                        </Typography>
                        <Button onClick={() => handleEditPayment(payment.id)}>Edit</Button>
                        <Button onClick={() => handleDeletePayment(payment.id)}>Delete</Button>
                    </CardContent>
                </Card>
            ))}

            <Button variant="contained" onClick={() => setOpenModal(true)} color="primary">
                Add Payment
            </Button>

            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="add-payment-modal-title"
                aria-describedby="add-payment-modal-description"
                style={modalStyle}
            >
                <Box style={modalContentStyle}>
                    <Typography variant="h6" id="add-payment-modal-title" gutterBottom>
                        {selectedPaymentId ? 'Edit Payment' : 'Add Payment'}
                    </Typography>
                    <TextField
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
                        {selectedPaymentId ? 'Update' : 'Add'}
                    </Button>
                </Box>
            </Modal>

            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
            >
                <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
                    {error}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default StudentPaymentStatus;

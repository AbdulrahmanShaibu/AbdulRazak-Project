import React, { useState, useEffect } from 'react';
import { TextField, Button, Card, CardContent, Typography, Modal, Box } from '@mui/material';

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
};

const cardStyle = {
    marginBottom: '16px',
};

const StudentPaymentStatus = () => {
    const [status, setStatus] = useState('');
    const [endDate, setEndDate] = useState('');
    const [payments, setPayments] = useState([]);
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        // Fetch payment status data from API
    }, []);

    const handleAddPayment = () => {
        // Call API to add payment status
        setOpenModal(false); // Close modal after adding payment
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
                        label="Status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="End Date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <Button variant="contained" onClick={handleAddPayment} color="primary">
                        Add
                    </Button>
                </Box>
            </Modal>
        </div>
    );
};

export default StudentPaymentStatus;

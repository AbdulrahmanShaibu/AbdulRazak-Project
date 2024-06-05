import React, { useState, useEffect } from 'react';
import {
    Container,
    TextField,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Snackbar,
    Alert,
    Box
} from '@mui/material';
import { useFormik } from 'formik';
import axios from 'axios';

const validate = values => {
    const errors = {};
    if (!values.payment_type) {
        errors.payment_type = 'Payment type is required';
    }
    return errors;
};

const Payments = () => {
    const [payments, setPayments] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('success');

    const fetchPayments = async () => {
        try {
            const response = await axios.get('/api/payments');
            setPayments(response.data);
        } catch (error) {
            setMessage('Failed to fetch payments');
            setSeverity('error');
        }
    };

    useEffect(() => {
        fetchPayments();
    }, []);

    const formik = useFormik({
        initialValues: {
            payment_type: ''
        },
        validate,
        onSubmit: async (values, { resetForm }) => {
            try {
                if (editingId) {
                    await axios.put(`/api/payments/${editingId}`, values);
                    setMessage('Payment updated successfully');
                } else {
                    await axios.post('/api/payments', values);
                    setMessage('Payment added successfully');
                }
                setSeverity('success');
                fetchPayments();
                resetForm();
                setEditingId(null);
            } catch (error) {
                setMessage('Something went wrong');
                setSeverity('error');
            }
        }
    });

    const handleEdit = (payment) => {
        formik.setValues(payment);
        setEditingId(payment.id);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/payments/${id}`);
            setMessage('Payment deleted successfully');
            setSeverity('success');
            fetchPayments();
        } catch (error) {
            setMessage('Something went wrong');
            setSeverity('error');
        }
    };

    const handleCloseSnackbar = () => {
        setMessage('');
    };

    return (
        <Container>
            <h4>Payments</h4>
            <Paper component="form" onSubmit={formik.handleSubmit} sx={{ mb: 2 }} style={{
                padding:'15px'
            }}>
                <TextField
                    fullWidth
                    id="payment_type"
                    name="payment_type"
                    label="Payment Type"
                    value={formik.values.payment_type}
                    onChange={formik.handleChange}
                    error={formik.touched.payment_type && Boolean(formik.errors.payment_type)}
                    helperText={formik.touched.payment_type && formik.errors.payment_type}
                    sx={{ mb: 2 }}
                />
                <Button color="primary" variant="contained" fullWidth type="submit">
                    {editingId ? 'Update Payment' : 'Add Payment'}
                </Button>
            </Paper>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Payment Type</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {payments.map((payment) => (
                            <TableRow key={payment.id}>
                                <TableCell>{payment.id}</TableCell>
                                <TableCell>{payment.payment_type}</TableCell>
                                <TableCell>
                                    <Button onClick={() => handleEdit(payment)}>Edit</Button>
                                    <Button onClick={() => handleDelete(payment.id)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Snackbar open={Boolean(message)} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={severity}>
                    {message}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default Payments;

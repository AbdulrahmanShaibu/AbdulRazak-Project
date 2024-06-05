import React, { useState, useEffect } from 'react';
import {
  TextField, Button, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Snackbar, Alert, CircularProgress,
  Grid
} from '@mui/material';
import axios from 'axios';

// Fake API endpoints
const API_URL = 'https://jsonplaceholder.typicode.com/posts';

const PaymentsRecord = () => {
  const [payments, setPayments] = useState([]);
  const [form, setForm] = useState({ payment_type_uid: '', amount: '', date: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch payments data on component mount
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL);
      setPayments(response.data);
    } catch (error) {
      setError('Error fetching payments');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.payment_type_uid || !form.amount || !form.date) {
      setError('All fields are required');
      return;
    }

    try {
      const response = await axios.post(API_URL, form);
      setPayments([...payments, response.data]);
      setForm({ payment_type_uid: '', amount: '', date: '' });
      setError('');
      setSuccess('Payment added successfully');
    } catch (error) {
      setError('Error adding payment');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h4>Payments Record</h4>
      <Paper style={{ padding: '20px', marginBottom: '20px' }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                name="payment_type_uid"
                label="Payment Type UID"
                value={form.payment_type_uid}
                onChange={handleChange}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                name="amount"
                label="Amount"
                type="number"
                value={form.amount}
                onChange={handleChange}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                name="date"
                label="Date"
                type="date"
                value={form.date}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                required
                fullWidth
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} style={{ marginTop: '10px' }}>
            <Grid item>
              <Button type="submit" variant="contained" color="primary">Add Payment</Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Payment Type UID</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {payments.map((payment, index) => (
                <TableRow key={payment.id} style={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#fff' }}>
                  <TableCell>{payment.payment_type_uid}</TableCell>
                  <TableCell>{payment.amount}</TableCell>
                  <TableCell>{payment.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError('')}>
        <Alert onClose={() => setError('')} severity="error">{error}</Alert>
      </Snackbar>

      <Snackbar open={!!success} autoHideDuration={6000} onClose={() => setSuccess('')}>
        <Alert onClose={() => setSuccess('')} severity="success">{success}</Alert>
      </Snackbar>
    </div>
  );
};

export default PaymentsRecord;

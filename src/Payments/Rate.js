// Rate.js
import React, { useState, useEffect } from 'react';
import {
  Container, Table, TableBody, TableCell, TableHead, TableRow,
  Paper, TextField, Button, Snackbar, Alert
} from '@mui/material';
import axios from 'axios';

const API_BASE_URL = 'https://your-api-endpoint.com'; // Replace with your actual API base URL

const Rate = () => {

  const [rates, setRates] = useState([]);
  const [newRate, setNewRate] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchRates();
  }, []);

  const fetchRates = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/rates`);
      setRates(response.data);
    } catch (error) {
      setError('Failed to fetch rates');
      setOpen(true);
    }
  };

  const handleCreateRate = async () => {
    if (!newRate) {
      setError('Rate cannot be empty');
      setOpen(true);
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/rates`, { rate: newRate });
      setRates([...rates, response.data]);
      setNewRate('');
      setSuccess('Rate added successfully');
      setOpen(true);
    } catch (error) {
      setError('Failed to create rate');
      setOpen(true);
    }
  };

  const handleUpdateRate = async (id, rate) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/rates/${id}`, { rate });
      setRates(rates.map(r => (r.id === id ? response.data : r)));
      setSuccess('Rate updated successfully');
      setOpen(true);
    } catch (error) {
      setError('Failed to update rate');
      setOpen(true);
    }
  };

  const handleDeleteRate = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/rates/${id}`);
      setRates(rates.filter(r => r.id !== id));
      setSuccess('Rate deleted successfully');
      setOpen(true);
    } catch (error) {
      setError('Failed to delete rate');
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setError('');
    setSuccess('');
  };

  return (
    <Container>
      <h4>Rate Management</h4>
      <Paper style={{ padding: 16, marginBottom: 16 }}>
        <TextField
          label="New Rate"
          value={newRate}
          onChange={(e) => setNewRate(e.target.value)}
          style={{ marginRight: 16 }}
        />
        <Button variant="contained" color="primary" onClick={handleCreateRate}>
          Add Rate
        </Button>
      </Paper>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Rate</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rates.map((rate) => (
              <TableRow key={rate.id}>
                <TableCell>{rate.id}</TableCell>
                <TableCell>
                  <TextField
                    value={rate.rate}
                    onChange={(e) => handleUpdateRate(rate.id, e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <Button variant="contained" color="secondary" onClick={() => handleDeleteRate(rate.id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={error ? 'error' : 'success'}>
          {error || success}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Rate;

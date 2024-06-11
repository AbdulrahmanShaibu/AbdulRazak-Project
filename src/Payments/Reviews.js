// src/Reviews.js
import React, { useEffect, useState } from 'react';
import { Container, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Alert } from '@mui/material';
import axios from 'axios';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [form, setForm] = useState({ id: '', rate: '', description: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    // Fetch reviews from the fake API
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/teacher/all_reviews');
      setReviews(response.data);
    } catch (err) {
      setError('Failed to fetch reviews.');
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/teacher/all_reviews', form);
      setReviews([...reviews, response.data]);
      setForm({ id: '', rate: '', description: '' });
      setSuccess('Review added successfully!');
      setError('');
    } catch (err) {
      setError('Failed to add review.');
      setSuccess('');
    }
  };

  return (
    <Container>
      <h4>Reviews</h4>
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}
      <Paper style={{padding:'15px'}} elevation={1}>
      <form onSubmit={handleSubmit}>
        <TextField
          label="ID"
          name="id"
          value={form.id}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Rate"
          name="rate"
          type="number"
          value={form.rate}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          name="description"
          value={form.description}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
      </Paper>
      <TableContainer component={Paper} style={{ marginTop: 20 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>S/N</TableCell>
              <TableCell>Rate</TableCell>
              <TableCell>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reviews.map((review, index) => (
              <TableRow key={review.id}>
                <TableCell>{index+1}</TableCell>
                <TableCell>{review.rate}</TableCell>
                <TableCell>{review.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Reviews;

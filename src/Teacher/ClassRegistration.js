import React, { useState, useEffect } from 'react';
import { TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid, Box, Typography, Pagination } from '@mui/material';
import axios from 'axios';

const initialFormState = {
  auth_id: '',
  name: '',
  registration_number: '',
  level: '',
  subject: '',
  estimated_fee: '',
  file: '',
  description: '',
  latlong: '',
  status: '',
};

const formSteps = [
  ['auth_id', 'name', 'registration_number', 'level'],
  ['subject', 'estimated_fee', 'file', 'description'],
  ['latlong', 'status'],
];

const ClassRegistration = () => {
  const [formData, setFormData] = useState(initialFormState);
  const [classes, setClasses] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [page, setPage] = useState(1);
  const [formStep, setFormStep] = useState(0);
  const rowsPerPage = 5;

  useEffect(() => {
    axios.get('/api/classes')
      .then(response => setClasses(response.data))
      .catch(error => console.error('Error fetching classes:', error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      axios.put(`/api/classes/${editingId}`, formData)
        .then(response => {
          setClasses(classes.map(cls => cls.id === editingId ? response.data : cls));
          setEditingId(null);
          setFormData(initialFormState);
        })
        .catch(error => console.error('Error updating class:', error));
    } else {
      axios.post('/api/classes', formData)
        .then(response => {
          setClasses([...classes, response.data]);
          setFormData(initialFormState);
        })
        .catch(error => console.error('Error creating class:', error));
    }
    setFormStep(0);
  };

  const handleEdit = (id) => {
    const classToEdit = classes.find(cls => cls.id === id);
    setFormData(classToEdit);
    setEditingId(id);
    setFormStep(0);
  };

  const handleDelete = (id) => {
    axios.delete(`/api/classes/${id}`)
      .then(() => setClasses(classes.filter(cls => cls.id !== id)))
      .catch(error => console.error('Error deleting class:', error));
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const displayClasses = classes.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const handleNext = () => {
    setFormStep((prevStep) => prevStep + 1);
  };

  const handlePrev = () => {
    setFormStep((prevStep) => prevStep - 1);
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>Class Registration</Typography>
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {formSteps[formStep].map((key) => (
              <Grid item xs={12} sm={6} key={key}>
                <TextField
                  name={key}
                  label={key.replace('_', ' ')}
                  value={formData[key]}
                  onChange={handleChange}
                  margin="normal"
                  fullWidth
                />
              </Grid>
            ))}
          </Grid>
          <Box mt={2} display="flex" justifyContent="space-between">
            {formStep > 0 && <Button onClick={handlePrev} variant="contained" color="primary">Previous</Button>}
            {formStep < formSteps.length - 1 && <Button onClick={handleNext} variant="contained" color="primary">Next</Button>}
            {formStep === formSteps.length - 1 && <Button type="submit" variant="contained" color="primary">Submit</Button>}
          </Box>
        </form>
      </Paper>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {Object.keys(initialFormState).map((key) => (
                <TableCell key={key}>{key.replace('_', ' ')}</TableCell>
              ))}
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayClasses.map((cls) => (
              <TableRow key={cls.id}>
                {Object.keys(initialFormState).map((key) => (
                  <TableCell key={key}>{cls[key]}</TableCell>
                ))}
                <TableCell>
                  <Button onClick={() => handleEdit(cls.id)} variant="contained" color="primary" sx={{ mr: 1 }}>Edit</Button>
                  <Button onClick={() => handleDelete(cls.id)} variant="contained" color="secondary">Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box mt={2} display="flex" justifyContent="center">
        <Pagination
          count={Math.ceil(classes.length / rowsPerPage)}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default ClassRegistration;
import React, { useState, useEffect } from 'react';
import { TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid, Box, Typography, Pagination, Snackbar, Alert } from '@mui/material';
import axios from 'axios';

const initialFormState = {
  auth_id: '',
  name: '',
  registration_number: '',
  level: '',
  subject: '',
  estimated_fee: '',
  file: null,
  description: '',
  latitude: '',
  longitude: '',
  status: '',
};

const formSteps = [
  ['auth_id', 'name', 'registration_number', 'level'],
  ['subject', 'estimated_fee', 'file', 'description'],
  ['latitude', 'longitude', 'status'],
];

const ClassRegistration = () => {
  const [formData, setFormData] = useState(initialFormState);
  const [classes, setClasses] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [page, setPage] = useState(1);
  const [formStep, setFormStep] = useState(0);
  const [errors, setErrors] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const rowsPerPage = 5;

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/teacher/list_classes/')
      .then(response => setClasses(response.data))
      .catch(error => console.error('Error fetching classes:', error));
  }, []);

  const validate = () => {
    const newErrors = {};
    formSteps[formStep].forEach(key => {
      if (!formData[key] && key !== 'file') {
        newErrors[key] = 'This field is required';
      }
    });
    if (formData['estimated_fee'] && isNaN(formData['estimated_fee'])) {
      newErrors['estimated_fee'] = 'Estimated fee must be a number';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: files ? files[0] : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const formSubmitData = new FormData();
    Object.keys(formData).forEach(key => {
      formSubmitData.append(key, formData[key]);
    });

    const axiosCall = editingId
      ? axios.put(`http://127.0.0.1:8000/api/teacher/class_status/${editingId}`, formSubmitData)
      : axios.post('http://127.0.0.1:8000/api/teacher/add_class/', formSubmitData);

    axiosCall
      .then(response => {
        const updatedClasses = editingId
          ? classes.map(cls => cls.id === editingId ? response.data : cls)
          : [...classes, response.data];
        setClasses(updatedClasses);
        setEditingId(null);
        setFormData(initialFormState);
        setFormStep(0);
        setSnackbarMessage(editingId ? 'Class updated successfully' : 'Class created successfully');
        setSnackbarOpen(true);
      })
      .catch(error => console.error('Error submitting class:', error));
  };

  const handleEdit = (id) => {
    const classToEdit = classes.find(cls => cls.id === id);
    setFormData(classToEdit);
    setEditingId(id);
    setFormStep(0);
  };

  const handleDelete = (id) => {
    axios.delete(`/api/not/created_api/classes/${id}`)
      .then(() => {
        setClasses(classes.filter(cls => cls.id !== id));
        setSnackbarMessage('Class deleted successfully');
        setSnackbarOpen(true);
      })
      .catch(error => console.error('Error deleting class:', error));
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const displayClasses = classes.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const handleNext = () => {
    if (validate()) {
      setFormStep((prevStep) => prevStep + 1);
    }
  };

  const handlePrev = () => {
    setFormStep((prevStep) => prevStep - 1);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>Class Registration</Typography>
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {formSteps[formStep].map((key) => (
              <Grid item xs={12} sm={6} key={key}>
                {key === 'file' ? (
                  <Button variant="contained" component="label" fullWidth>
                    Upload File
                    <input
                      type="file"
                      name={key}
                      hidden
                      onChange={handleChange}
                    />
                  </Button>
                ) : (
                  <TextField
                    name={key}
                    label={key.replace('_', ' ')}
                    value={formData[key]}
                    onChange={handleChange}
                    margin="normal"
                    fullWidth
                    error={!!errors[key]}
                    helperText={errors[key]}
                  />
                )}
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
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ClassRegistration;

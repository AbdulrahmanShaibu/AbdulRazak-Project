// ClassStatus.js
import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Alert } from '@mui/material';
import axios from 'axios';
import { useForm } from 'react-hook-form';

const ClassStatus = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/teacher/class_status');
      setClasses(response.data);
      setLoading(false);
    } catch (error) {
      setError('Error fetching classes');
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/teacher/class_status', data);
      setClasses([...classes, response.data]);
      reset();
    } catch (error) {
      setError('Error adding class');
    }
  };

  return (
    <Container>
      <h4>Class Status</h4>
      <Paper style={{padding:'15px'}}>
        {error && <Alert severity="error">{error}</Alert>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            {...register('auth_id', { required: true })}
            label="Auth ID"
            variant="outlined"
            fullWidth
            margin="normal"
            error={!!errors.auth_id}
            helperText={errors.auth_id && 'Auth ID is required'}
          />
          <TextField
            {...register('urlImg', { required: true })}
            label="Image URL"
            variant="outlined"
            fullWidth
            margin="normal"
            error={!!errors.urlImg}
            helperText={errors.urlImg && 'Image URL is required'}
          />
          <TextField
            {...register('name', { required: true })}
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            error={!!errors.name}
            helperText={errors.name && 'Name is required'}
          />
          <TextField
            {...register('class_type', { required: true })}
            label="Class Type"
            variant="outlined"
            fullWidth
            margin="normal"
            error={!!errors.class_type}
            helperText={errors.class_type && 'Class Type is required'}
          />
          <Button type="submit" variant="contained" color="primary" style={{ marginTop: '10px' }}>Add Class</Button>
        </form>
      </Paper>
      {loading ? (
        <CircularProgress style={{ marginTop: '20px' }} />
      ) : (
        <TableContainer component={Paper} style={{ marginTop: '20px' }}>
          <Table>
            <TableHead>
              <TableRow>
                {/* <TableCell>Auth ID</TableCell> */}
                <TableCell>S/N</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Class Type</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {classes.map((classItem, index) => (
                <TableRow key={classItem.id}>
                  {/* <TableCell>{classItem.auth_id}</TableCell> */}
                  <TableCell>{index+1}</TableCell>
                  <TableCell>
                    <img src={classItem.urlImg} alt={classItem.name} style={{ width: '50px', height: '50px' }} />
                  </TableCell>
                  <TableCell>{classItem.name}</TableCell>
                  <TableCell>{classItem.class_type}</TableCell>
                  <TableCell>{classItem.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default ClassStatus;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button, MenuItem, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Snackbar, Alert } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const ClassManagement = () => {
    const [teachers, setTeachers] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [classInstances, setClassInstances] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        subject_name: '',
        rate: ''
    });
    const [error, setError] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const fetchData = async () => {
        try {
            const teachersResponse = await axios.get('http://127.0.0.1:8000/api/teacher/get_all_teachers/');
            setTeachers(teachersResponse.data);
            const subjectsResponse = await axios.get('http://127.0.0.1:8000/api/subject/all_subject');
            setSubjects(subjectsResponse.data);
            const classesResponse = await axios.get('http://127.0.0.1:8000/api/teacher/all_rates');
            setClassInstances(classesResponse.data);

            console.log(subjectsResponse.data);
        } catch (error) {
            setError('Error fetching data');
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isNaN(formData.rate)) {
            setError('Rate must be a number');
            return;
        }

        try {
            await axios.post('http://localhost:5000/classes', formData);
            fetchData();
            setFormData({
                name: '',
                subject_name: '',
                rate: ''
            });
            setSnackbarMessage('Class added successfully');
            setSnackbarOpen(true);
            setError(''); // Clear error after successful action
        } catch (error) {
            setError('Error adding class');
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/classes/${id}`);
            fetchData();
            setSnackbarMessage('Class deleted successfully');
            setSnackbarOpen(true);
            setError(''); // Clear error after successful action
        } catch (error) {
            setError('Error deleting class');
        }
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <Container>
            <Typography variant="h6" gutterBottom>
                Class Management
            </Typography>
            {error && <Alert severity="error">{error}</Alert>}
            <Paper sx={{ margin: 'auto', padding: 2 }}>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                select
                                label="Teacher"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                fullWidth
                                required
                            >
                                {teachers.map((teacher) => (
                                    <MenuItem key={teacher.id} value={teacher.id}>
                                        {teacher.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                select
                                label="Subject"
                                name="subject_name"
                                value={formData.subject_name}
                                onChange={handleChange}
                                fullWidth
                                required
                            >
                                {subjects.map((subject) => (
                                    <MenuItem key={subject.id} value={subject.id}>
                                        {subject.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                label="Rate"
                                name="rate"
                                value={formData.rate}
                                onChange={handleChange}
                                fullWidth
                                required
                                error={isNaN(formData.rate)}
                                helperText={isNaN(formData.rate) ? 'Rate must be a number' : ''}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary">
                                Add Class
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
            <TableContainer component={Paper} style={{ marginTop: 20 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Teacher</TableCell>
                            <TableCell>Subject</TableCell>
                            <TableCell>Rate</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {classInstances.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell>{teachers.find((t) => t.id === row.name)?.name || row.name}</TableCell>
                                <TableCell>{subjects.find((s) => s.id === row.subject_name)?.name || row.subject_name}</TableCell>
                                <TableCell>{row.rate}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleDelete(row.id)} color="secondary">
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default ClassManagement;

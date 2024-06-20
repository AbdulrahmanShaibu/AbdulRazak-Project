// components/ClassManagement.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Container, Typography, TextField, Button, Paper, IconButton,
    Snackbar, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Alert } from 'bootstrap';
import { AltRouteRounded } from '@mui/icons-material';

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
            const [teachersResponse, subjectsResponse, classesResponse] = await Promise.all([
                axios.get('http://127.0.0.1:8000/api/teacher/get_all_teachers/'),
                axios.get('http://127.0.0.1:8000/api/subject/all_subject'),
                axios.get('http://127.0.0.1:8000/api/teacher/all_rates')
            ]);

            setTeachers(teachersResponse.data);
            setSubjects(subjectsResponse.data);
            setClassInstances(classesResponse.data);
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
        if (isNaN(parseFloat(formData.rate))) {
            setError('Rate must be a number');
            return;
        }
    
        try {
            await axios.post('http://127.0.0.1:8000/api/subject/add_subject/', {
                teacher_id: formData.name,
                subject_name: formData.subject_name,
                rate: parseFloat(formData.rate)
            });
            fetchData();
            setFormData({ name: '', subject_name: '', rate: '' });
            setSnackbarMessage('Class added successfully');
            setSnackbarOpen(true);
            setError('');
        } catch (error) {
            setError('Error adding class');
        }
    };
    
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/subject/delete_subject/${id}`);
            fetchData();
            setSnackbarMessage('Class deleted successfully');
            setSnackbarOpen(true);
            setError('');
        } catch (error) {
            setError('Error deleting class');
        }
    };
    
    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <Container>
            <Typography variant="h6" gutterBottom>Class Management</Typography>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <Paper sx={{ margin: 'auto', padding: 2 }}>
                <form onSubmit={handleSubmit}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <label htmlFor="name" style={{ marginBottom: '8px' }}>Teacher</label>
                            <select
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                style={{ padding: '8px', fontSize: '16px', width: '100%', boxSizing: 'border-box' }}
                            >
                                <option value="">Select Teacher</option>
                                {teachers.map((teacher) => (
                                    <option key={teacher.id} value={teacher.id}>{teacher.name}</option>
                                ))}
                            </select>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <label htmlFor="subject_name" style={{ marginBottom: '8px' }}>Subject</label>
                            <select
                                name="subject_name"
                                value={formData.subject_name}
                                onChange={handleChange}
                                required
                                style={{ padding: '8px', fontSize: '16px', width: '100%', boxSizing: 'border-box' }}
                            >
                                <option value="">Select Subject</option>
                                {subjects.map((subject) => (
                                    <option key={subject.id} value={subject.id}>{subject.subject_name}</option>
                                ))}
                            </select>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <label htmlFor="rate" style={{ marginBottom: '8px' }}>Rate</label>
                            <input
                                type="text"
                                name="rate"
                                value={formData.rate}
                                onChange={handleChange}
                                required
                                style={{ padding: '8px', fontSize: '16px', width: '100%', boxSizing: 'border-box' }}
                            />
                            {isNaN(formData.rate) && <span style={{ color: 'red', fontSize: '12px' }}>Rate must be a number</span>}
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <button
                                type="submit"
                                style={{
                                    padding: '10px', fontSize: '16px', color: 'white',
                                    backgroundColor: '#3f51b5', border: 'none', cursor: 'pointer'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#303f9f'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#3f51b5'}
                            >
                                Add Class
                            </button>
                        </div>
                    </div>
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
                            <TableRow key={row._id}>
                                <TableCell>{teachers.find((t) => t.id === row.name)?.name || row.name}</TableCell>
                                <TableCell>{subjects.find((s) => s.id === row.subject_name)?.subject_name || row.subject_name}</TableCell>
                                <TableCell>{row.rate}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleDelete(row._id)} color="secondary">
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <AltRouteRounded onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
                    {snackbarMessage}
                </AltRouteRounded>
            </Snackbar>
        </Container>
    );
};

export default ClassManagement;


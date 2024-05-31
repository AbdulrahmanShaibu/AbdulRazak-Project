import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button, MenuItem, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const StudentSelectedTeacher = () => {
    const [teachers, setTeachers] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [classes, setClasses] = useState([]);
    const [formData, setFormData] = useState({
        teacher_id: '',
        subject_id: '',
        rate_no: ''
    });

    const fetchData = () => {
        axios.get('http://localhost:5000/teachers').then((response) => {
            setTeachers(response.data);
        });
        axios.get('http://localhost:5000/subjects').then((response) => {
            setSubjects(response.data);
        });
        axios.get('http://localhost:5000/classes').then((response) => {
            setClasses(response.data);
        });
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

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/classes', formData).then(() => {
            fetchData();
            setFormData({
                teacher_id: '',
                subject_id: '',
                rate_no: ''
            });
        });
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:5000/classes/${id}`).then(() => {
            fetchData();
        });
    };

    return (
        <Container>
            <Typography variant="h6" gutterBottom>
                Class Management
            </Typography>
            <Paper sx={{ margin: 'auto', padding: 2 }}>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                select
                                label="Teacher"
                                name="teacher_id"
                                value={formData.teacher_id}
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
                                name="subject_id"
                                value={formData.subject_id}
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
                                label="Rate No"
                                name="rate_no"
                                value={formData.rate_no}
                                onChange={handleChange}
                                fullWidth
                                required
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
                            <TableCell>Rate No</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {classes.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell>{teachers.find((t) => t.id === row.teacher_id)?.name || row.teacher_id}</TableCell>
                                <TableCell>{subjects.find((s) => s.id === row.subject_id)?.name || row.subject_id}</TableCell>
                                <TableCell>{row.rate_no}</TableCell>
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
        </Container>
    );
};

export default StudentSelectedTeacher;

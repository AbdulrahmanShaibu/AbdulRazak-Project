// src/components/ClassWork.js

import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import {
    Container,
    Typography,
    TextField,
    Button,
    Grid,
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Snackbar,
    Alert
} from '@mui/material';

const validationSchema = Yup.object({
    link_url: Yup.string().url('Invalid URL').required('Link URL is required'),
    teacher_id: Yup.string().required('Teacher ID is required'),
    student_id: Yup.string().required('Student ID is required'),
    title: Yup.string().required('Title is required'),
    status: Yup.string().required('Status is required'),
    marks: Yup.number().required('Marks are required').min(0, 'Marks must be at least 0'),
    description: Yup.string()
});

const ClassWork = () => {
    const [classworks, setClassworks] = useState([]);
    const [selectedClasswork, setSelectedClasswork] = useState(null);
    const [notification, setNotification] = useState({ open: false, message: '', severity: '' });

    useEffect(() => {
        fetchClassworks();
    }, []);

    const fetchClassworks = () => {
        axios.get('http://127.0.0.1:8000/api/teacher/all_classworks')
            .then(response => {
                setClassworks(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the classworks!', error);
            });
    };

    const handleFormSubmit = (values) => {
        if (selectedClasswork) {
            axios.put(`/api/classworks/${selectedClasswork.id}`, values)
                .then(response => {
                    setNotification({ open: true, message: 'Classwork updated successfully', severity: 'success' });
                    setSelectedClasswork(null);
                    fetchClassworks();
                })
                .catch(error => {
                    setNotification({ open: true, message: 'Error updating classwork', severity: 'error' });
                });
        } else {
            axios.post('http://127.0.0.1:8000/api/teacher/add_classWork', values)
                .then(response => {
                    setNotification({ open: true, message: 'Classwork created successfully', severity: 'success' });
                    fetchClassworks();
                    console.log(response.data);
                })
                .catch(error => {
                    setNotification({ open: true, message: 'Error creating classwork', severity: 'error' });
                    console.log(error);
                });
        }
    };

    const handleEdit = (classwork) => {
        setSelectedClasswork(classwork);
    };

    const handleDelete = (id) => {
        axios.delete(`/api/classworks/${id}`)
            .then(response => {
                setNotification({ open: true, message: 'Classwork deleted successfully', severity: 'success' });
                fetchClassworks();
            })
            .catch(error => {
                setNotification({ open: true, message: 'Error deleting classwork', severity: 'error' });
            });
    };

    const formik = useFormik({
        initialValues: selectedClasswork || {
            link_url: '',
            teacher_id: '',
            student_id: '',
            title: '',
            status: '',
            marks: '',
            description: ''
        },
        enableReinitialize: true,
        validationSchema: validationSchema,
        onSubmit: (values, { setSubmitting, resetForm }) => {
            handleFormSubmit(values);
            setSubmitting(false);
            resetForm();
        }
    });

    return (
        <Container>
            <Typography variant="h6">Class Work</Typography>
            <Box component="form" onSubmit={formik.handleSubmit} sx={{ mb: 4 }}>
                <Paper elevation={3} style={{ padding: '15px' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} style={{ display: 'flex', gap: '20px' }}>
                            <TextField
                                fullWidth
                                id="link_url"
                                name="link_url"
                                label="Link URL"
                                value={formik.values.link_url}
                                onChange={formik.handleChange}
                                error={formik.touched.link_url && Boolean(formik.errors.link_url)}
                                helperText={formik.touched.link_url && formik.errors.link_url}
                            />
                            <TextField
                                fullWidth
                                id="teacher_id"
                                name="teacher_id"
                                label="Teacher ID"
                                value={formik.values.teacher_id}
                                onChange={formik.handleChange}
                                error={formik.touched.teacher_id && Boolean(formik.errors.teacher_id)}
                                helperText={formik.touched.teacher_id && formik.errors.teacher_id}
                            />
                        </Grid>
                        <Grid item xs={12} style={{ display: 'flex', gap: '20px' }}>
                            <TextField
                                fullWidth
                                id="student_id"
                                name="student_id"
                                label="Student ID"
                                value={formik.values.student_id}
                                onChange={formik.handleChange}
                                error={formik.touched.student_id && Boolean(formik.errors.student_id)}
                                helperText={formik.touched.student_id && formik.errors.student_id}
                            />
                            <TextField
                                fullWidth
                                id="title"
                                name="title"
                                label="Title"
                                value={formik.values.title}
                                onChange={formik.handleChange}
                                error={formik.touched.title && Boolean(formik.errors.title)}
                                helperText={formik.touched.title && formik.errors.title}
                            />
                        </Grid>
                        <Grid item xs={12} style={{ display: 'flex', gap: '20px' }}>
                            <TextField
                                fullWidth
                                id="status"
                                name="status"
                                label="Status"
                                value={formik.values.status}
                                onChange={formik.handleChange}
                                error={formik.touched.status && Boolean(formik.errors.status)}
                                helperText={formik.touched.status && formik.errors.status}
                            />
                            <TextField
                                fullWidth
                                id="marks"
                                name="marks"
                                label="Marks"
                                type="number"
                                value={formik.values.marks}
                                onChange={formik.handleChange}
                                error={formik.touched.marks && Boolean(formik.errors.marks)}
                                helperText={formik.touched.marks && formik.errors.marks}
                            />
                        </Grid>
                        <Grid item xs={12} style={{ display: 'flex', gap: '20px' }}>
                            <TextField
                                fullWidth
                                id="description"
                                name="description"
                                label="Description"
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                error={formik.touched.description && Boolean(formik.errors.description)}
                                helperText={formik.touched.description && formik.errors.description}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button color="primary" variant="contained" fullWidth type="submit">
                                Submit Class-Work
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Box>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Link URL</TableCell>
                            {/* <TableCell>Teacher ID</TableCell>
                            <TableCell>Student ID</TableCell> */}
                            <TableCell>Title</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Marks</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {classworks.map((classwork) => (
                            <TableRow key={classwork.id}>
                                <TableCell>{classwork.link_url}</TableCell>
                                {/* <TableCell>{classwork.teacher_id}</TableCell>
                                <TableCell>{classwork.student_id}</TableCell> */}
                                <TableCell>{classwork.title}</TableCell>
                                <TableCell>{classwork.status}</TableCell>
                                <TableCell>{classwork.marks}</TableCell>
                                <TableCell>{classwork.description}</TableCell>
                                <TableCell>
                                    <Button onClick={() => handleEdit(classwork)}>Edit</Button>
                                    <Button onClick={() => handleDelete(classwork.id)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Snackbar open={notification.open} autoHideDuration={6000} onClose={() => setNotification({ ...notification, open: false })}>
                <Alert onClose={() => setNotification({ ...notification, open: false })} severity={notification.severity}>
                    {notification.message}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default ClassWork;

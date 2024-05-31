// CourseOutline.js
import React, { useState, useEffect } from 'react';
import {
  Container,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Snackbar,
  Alert,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const apiBaseUrl = 'https://api.example.com'; // Replace with your actual API base URL

const CourseOutline = () => {
  const [courseOutlines, setCourseOutlines] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [editId, setEditId] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState({ open: false, message: '', severity: '' });
  const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm();

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [courseOutlinesResponse, teachersResponse, subjectsResponse] = await Promise.all([
          axios.get(`${apiBaseUrl}/course-outlines`),
          axios.get(`${apiBaseUrl}/teachers`),
          axios.get(`${apiBaseUrl}/subjects`)
        ]);

        setCourseOutlines(courseOutlinesResponse.data);
        setTeachers(teachersResponse.data);
        setSubjects(subjectsResponse.data);
      } catch (error) {
        setOpenSnackbar({ open: true, message: 'Failed to fetch initial data!', severity: 'error' });
      }
    };

    fetchInitialData();
  }, []);

  const onSubmit = async (data) => {
    try {
      if (editId) {
        const response = await axios.put(`${apiBaseUrl}/course-outlines/${editId}`, data);
        setCourseOutlines((prev) => prev.map(item => (item.id === editId ? response.data : item)));
        setOpenSnackbar({ open: true, message: 'Course outline updated successfully!', severity: 'success' });
      } else {
        const response = await axios.post(`${apiBaseUrl}/course-outlines`, data);
        setCourseOutlines((prev) => [...prev, response.data]);
        setOpenSnackbar({ open: true, message: 'Course outline created successfully!', severity: 'success' });
      }
      reset();
      setEditId(null);
    } catch (error) {
      setOpenSnackbar({ open: true, message: 'Operation failed!', severity: 'error' });
    }
  };

  const onDelete = async (id) => {
    try {
      await axios.delete(`${apiBaseUrl}/course-outlines/${id}`);
      setCourseOutlines((prev) => prev.filter(item => item.id !== id));
      setOpenSnackbar({ open: true, message: 'Course outline deleted successfully!', severity: 'success' });
    } catch (error) {
      setOpenSnackbar({ open: true, message: 'Deletion failed!', severity: 'error' });
    }
  };

  const onEdit = (data) => {
    setEditId(data.id);
    setValue('teacher_id', data.teacher_id);
    setValue('subject_id', data.subject_id);
    setValue('file', data.file);
  };

  return (
    <Container>
      <h1>Course Outline</h1>
      <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl fullWidth margin="normal">
            <InputLabel id="teacher-id-label">Teacher ID</InputLabel>
            <Select
              labelId="teacher-id-label"
              {...register('teacher_id', { required: 'Teacher ID is required' })}
              error={!!errors.teacher_id}
              defaultValue=""
            >
              {teachers.map(teacher => (
                <MenuItem key={teacher.id} value={teacher.id}>{teacher.name}</MenuItem>
              ))}
            </Select>
            {errors.teacher_id && <p style={{ color: 'red' }}>{errors.teacher_id.message}</p>}
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel id="subject-id-label">Subject ID</InputLabel>
            <Select
              labelId="subject-id-label"
              {...register('subject_id', { required: 'Subject ID is required' })}
              error={!!errors.subject_id}
              defaultValue=""
            >
              {subjects.map(subject => (
                <MenuItem key={subject.id} value={subject.id}>{subject.name}</MenuItem>
              ))}
            </Select>
            {errors.subject_id && <p style={{ color: 'red' }}>{errors.subject_id.message}</p>}
          </FormControl>
          <TextField
            label="File"
            {...register('file', { required: 'File is required' })}
            error={!!errors.file}
            helperText={errors.file?.message}
            fullWidth
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary">
            {editId ? 'Update' : 'Submit'}
          </Button>
          <Button onClick={() => { reset(); setEditId(null); }} variant="outlined" color="secondary" style={{ marginLeft: '10px' }}>
            Cancel
          </Button>
        </form>
      </Paper>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Teacher ID</TableCell>
              <TableCell>Subject ID</TableCell>
              <TableCell>File</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courseOutlines.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.teacher_id}</TableCell>
                <TableCell>{row.subject_id}</TableCell>
                <TableCell>{row.file}</TableCell>
                <TableCell>
                  <Button onClick={() => onEdit(row)} variant="outlined" color="primary" style={{ marginRight: '10px' }}>Edit</Button>
                  <Button onClick={() => onDelete(row.id)} variant="outlined" color="secondary">Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Snackbar
        open={openSnackbar.open}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar({ open: false, message: '', severity: '' })}
      >
        <Alert onClose={() => setOpenSnackbar({ open: false, message: '', severity: '' })} severity={openSnackbar.severity}>
          {openSnackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default CourseOutline;

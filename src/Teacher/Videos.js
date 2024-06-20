import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button,
  TextField, Typography, Grid, Container, Box, Dialog, DialogActions, DialogContent, DialogTitle, Alert
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';

const theme = createTheme();

const Videos = () => {
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [open, setOpen] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    topic_uid: '',
    student_uid: '',
    student_subject_id: '',
    title: '',
    youtube_url: ''
  });

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/teacher/all_videos');
      setVideos(response.data);
    } catch (error) {
      setError('Error fetching videos');
    }
  };

  const validate = () => {
    const errors = {};
    if (!formData.topic_uid) errors.topic_uid = 'Topic UID is required';
    if (!formData.student_uid) errors.student_uid = 'Student UID is required';
    if (!formData.student_subject_id) errors.student_subject_id = 'Student Subject ID is required';
    if (!formData.title) errors.title = 'Title is required';
    if (!formData.youtube_url) errors.youtube_url = 'YouTube URL is required';
    // Basic URL validation
    const urlPattern = /^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/;
    if (formData.youtube_url && !urlPattern.test(formData.youtube_url)) {
      errors.youtube_url = 'YouTube URL is invalid';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    if (!validate()) {
      return;
    }

    try {
      await axios.post('http://127.0.0.1:8000/api/teacher/add_video', formData);
      setSuccess('Video added successfully');
      fetchVideos();
      setFormData({
        topic_uid: '',
        student_uid: '',
        student_subject_id: '',
        title: '',
        youtube_url: ''
      });
      setOpen(false);
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.message || 'Error adding video');
      } else {
        setError('Error adding video');
      }
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Box my={4}>
          <Typography variant="h4" gutterBottom>Videos</Typography>
        </Box>
        <Grid container spacing={3}>
          {error && <Grid item xs={12}><Alert severity="error">{error}</Alert></Grid>}
          {success && <Grid item xs={12}><Alert severity="success">{success}</Alert></Grid>}
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handleClickOpen}>
              Add New Video
            </Button>
          </Grid>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add New Video</DialogTitle>
            <DialogContent>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      label="Topic UID"
                      name="topic_uid"
                      value={formData.topic_uid}
                      onChange={handleChange}
                      fullWidth
                      required
                      error={!!formErrors.topic_uid}
                      helperText={formErrors.topic_uid}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="YouTube URL"
                      name="youtube_url"
                      value={formData.youtube_url}
                      onChange={handleChange}
                      fullWidth
                      required
                      error={!!formErrors.youtube_url}
                      helperText={formErrors.youtube_url}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      fullWidth
                      required
                      error={!!formErrors.title}
                      helperText={formErrors.title}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Student UID"
                      name="student_uid"
                      value={formData.student_uid}
                      onChange={handleChange}
                      fullWidth
                      required
                      error={!!formErrors.student_uid}
                      helperText={formErrors.student_uid}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Student Subject ID"
                      name="student_subject_id"
                      value={formData.student_subject_id}
                      onChange={handleChange}
                      fullWidth
                      required
                      error={!!formErrors.student_subject_id}
                      helperText={formErrors.student_subject_id}
                    />
                  </Grid>
                </Grid>
              </form>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="secondary">Cancel</Button>
              <Button onClick={handleSubmit} color="primary">Add</Button>
            </DialogActions>
          </Dialog>
          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell>YouTube URL</TableCell>
                    <TableCell>Student UID</TableCell>
                    <TableCell>Student Subject ID</TableCell>
                    <TableCell>Update</TableCell>
                    <TableCell>Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {videos.map((video) => (
                    <TableRow key={video.id}>
                      <TableCell>{video.title}</TableCell>
                      <TableCell>{video.youtube_url}</TableCell>
                      <TableCell>{video.student_uid}</TableCell>
                      <TableCell>{video.student_subject_id}</TableCell>
                      <TableCell>
                        <Button>Update</Button>
                      </TableCell>
                      <TableCell>
                        <Button>Delete</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default Videos;

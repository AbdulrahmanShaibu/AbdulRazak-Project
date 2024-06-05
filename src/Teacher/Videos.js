import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Typography, Grid } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';

const theme = createTheme();

const Videos = () => {
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
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
      const response = await axios.get('YOUR_GET_API_URL');
      setVideos(response.data);
    } catch (error) {
      setError('Error fetching videos');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('YOUR_POST_API_URL', formData);
      setSuccess('Video added successfully');
      fetchVideos();
      // Clear form fields after successful submission
      setFormData({
        topic_uid: '',
        student_uid: '',
        student_subject_id: '',
        title: '',
        youtube_url: ''
      });
    } catch (error) {
      setError('Error adding video');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>Videos</Typography>
        </Grid>
        <Grid item xs={12}>
          {error && <Typography color="error">{error}</Typography>}
          {success && <Typography color="success">{success}</Typography>}
        </Grid>
        <Grid item xs={12} md={6}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Topic UID"
                  name="topic_uid"
                  value={formData.topic_uid}
                  onChange={handleChange}
                  fullWidth
                  required
                  error={formData.topic_uid === '' && error !== null}
                  helperText={formData.topic_uid === '' && error !== null ? 'Topic UID is required' : ''}
                />
              </Grid>
              {/* Add other fields similarly */}
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary">Add Video</Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
        <Grid item xs={12} md={6}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>YouTube URL</TableCell>
                  {/* Add other headers */}
                </TableRow>
              </TableHead>
              <TableBody>
                {videos.map((video) => (
                  <TableRow key={video.id}>
                    <TableCell>{video.title}</TableCell>
                    <TableCell>{video.youtube_url}</TableCell>
                    {/* Add other cells */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Videos;

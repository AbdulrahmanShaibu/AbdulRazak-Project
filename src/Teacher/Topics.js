import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, TextField, Button, Typography,
  CircularProgress
} from '@mui/material';

const Topics = () => {
  const [topics, setTopics] = useState([]);
  const [formData, setFormData] = useState({
    subject_uid: '',
    topic_name: ''
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTopics();
  }, []);

  const fetchTopics = async () => {
    setLoading(true);
    try {
      const response = await fetch('YOUR_API_ENDPOINT');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setTopics(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.subject_uid.trim()) {
      setErrors({ subject_uid: 'Subject UID is required' });
      return;
    }
    if (!formData.topic_name.trim()) {
      setErrors({ topic_name: 'Topic Name is required' });
      return;
    }
    setErrors({});
    setLoading(true);
    try {
      const response = await fetch('YOUR_API_ENDPOINT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (!response.ok) {
        throw new Error('Failed to add topic');
      }
      const newTopic = await response.json();
      setTopics([...topics, newTopic]);
      setSuccessMessage('Topic added successfully');
      setFormData({ subject_uid: '', topic_name: '' });
    } catch (error) {
      console.error('Error adding topic:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>Topics</Typography>
      <Paper style={{ padding: '10px' }}>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Subject UID"
            name="subject_uid"
            value={formData.subject_uid}
            onChange={handleChange}
            error={!!errors.subject_uid}
            helperText={errors.subject_uid}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Topic Name"
            name="topic_name"
            value={formData.topic_name}
            onChange={handleChange}
            error={!!errors.topic_name}
            helperText={errors.topic_name}
            fullWidth
            margin="normal"
          />
          <Button variant="contained" color="primary" type="submit" disabled={loading}>
            {loading ? <CircularProgress size={24} /> : 'Add Topic'}
          </Button>
        </form>
      </Paper>
      {successMessage && <Typography variant="body1" style={{ color: 'green' }}>{successMessage}</Typography>}
      {loading ? (
        <CircularProgress style={{ margin: '20px auto', display: 'block' }} />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Subject UID</TableCell>
                <TableCell>Topic Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {topics.map((topic) => (
                <TableRow key={topic.id}>
                  <TableCell>{topic.id}</TableCell>
                  <TableCell>{topic.subject_uid}</TableCell>
                  <TableCell>{topic.topic_name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default Topics;

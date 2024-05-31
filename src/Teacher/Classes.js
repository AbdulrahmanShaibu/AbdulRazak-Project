// src/Classes.js
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
  Typography,
  Box
} from '@mui/material';
import axios from 'axios';

const Classes = () => {
  const [classes, setClasses] = useState([]);
  const [className, setClassName] = useState('');
  const [invitationLink, setInvitationLink] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch the initial data from fake API
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const response = await axios.get('/api/classes');
      setClasses(response.data);
    } catch (error) {
      console.error('Error fetching classes:', error);
    }
  };

  const addClass = async () => {
    if (!className || !invitationLink) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const newClass = { class_name: className, invitation_link: invitationLink };
      const response = await axios.post('/api/classes', newClass);
      setClasses([...classes, response.data]);
      setClassName('');
      setInvitationLink('');
      setError('');
    } catch (error) {
      console.error('Error adding class:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h3" component="h1" gutterBottom>
        Classes
      </Typography>
      <Paper elevation={2} sx={{ padding: 2 }}>
        <form noValidate autoComplete="off">
          <TextField
            label="Class Name"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            fullWidth
            variant="outlined"
            margin="normal"
          />
          <TextField
            label="Invitation Link"
            value={invitationLink}
            onChange={(e) => setInvitationLink(e.target.value)}
            fullWidth
            variant="outlined"
            margin="normal"
          />
          {error && (
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          )}
          <Box textAlign="right" mt={2}>
            <Button variant="contained" color="primary" onClick={addClass}>
              Add Class
            </Button>
          </Box>
        </form>
      </Paper>
      <TableContainer component={Paper} sx={{ marginTop: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Class Name</TableCell>
              <TableCell>Invitation Link</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {classes.map((cls) => (
              <TableRow key={cls.id}>
                <TableCell>{cls.id}</TableCell>
                <TableCell>{cls.class_name}</TableCell>
                <TableCell>{cls.invitation_link}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};
export default Classes;
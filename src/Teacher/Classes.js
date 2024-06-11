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
  Box,
  CircularProgress,
  IconButton, // Added for edit and delete icons
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit'; // Icon for edit
import DeleteIcon from '@mui/icons-material/Delete'; // Icon for delete
import axios from 'axios';

const Classes = () => {
  const [classes, setClasses] = useState([]);
  const [className, setClassName] = useState('');
  const [invitationLink, setInvitationLink] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [editingClassId, setEditingClassId] = useState(null); // State for editing

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/teacher/get_all_teacher_classes');
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

    setLoading(true);
    try {
      const newClass = { class_name: className, invetation_link: invitationLink };
      const response = await axios.post('http://127.0.0.1:8000/api/teacher/create_teacher_class', newClass);
      setClasses([...classes, response.data]);
      setClassName('');
      setInvitationLink('');
      setError('');
      setLoading(false);
    } catch (error) {
      console.error('Error adding class:', error);
      setError('Failed to add class. Please try again.');
      setLoading(false);
    }
  };

  const updateClass = async () => {
    if (!className || !invitationLink) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const updatedClass = { class_name: className, invetation_link: invitationLink };
      const response = await axios.put(`http://127.0.0.1:8000/api/teacher/update_teacher_class/${editingClassId}`, updatedClass);
      setClasses(classes.map(cls => (cls._id === editingClassId ? { ...cls, ...updatedClass } : cls)));
      setClassName('');
      setInvitationLink('');
      setEditingClassId(null);
      setError('');
      setLoading(false);
    } catch (error) {
      console.error('Error updating class:', error);
      setError('Failed to update class. Please try again.');
      setLoading(false);
    }
  };

  const deleteClass = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`http://127.0.0.1:8000/api/teacher/delete_teacher_class/${id}`);
      setClasses(classes.filter(cls => cls._id !== id));
      setLoading(false);
    } catch (error) {
      console.error('Error deleting class:', error);
      setError('Failed to delete class. Please try again.');
      setLoading(false);
    }
  };

  const startEditing = (cls) => {
    setClassName(cls.class_name);
    setInvitationLink(cls.invetation_link);
    setEditingClassId(cls._id);
  };

  const cancelEditing = () => {
    setClassName('');
    setInvitationLink('');
    setEditingClassId(null);
  };

  return (
    <Container>
      <Typography variant="h5" component="h1" gutterBottom>
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
            <Button
              variant="contained"
              color="primary"
              onClick={editingClassId ? updateClass : addClass}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : editingClassId ? 'Update Class' : 'Add Class'}
            </Button>
            {editingClassId && (
              <Button
                variant="outlined"
                color="secondary"
                onClick={cancelEditing}
                disabled={loading}
                sx={{ marginLeft: 2 }}
              >
                Cancel
              </Button>
            )}
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
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {classes.map((cls, index) => (
              <TableRow key={cls._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{cls.class_name}</TableCell>
                <TableCell>{cls.invetation_link}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => startEditing(cls)}
                    disabled={loading}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => deleteClass(cls._id)}
                    disabled={loading}
                  >
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

export default Classes;

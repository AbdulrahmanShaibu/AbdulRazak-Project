import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  Typography,
  Grid,
  IconButton,
  Tooltip,
  CircularProgress,
} from '@mui/material';
import { DeleteOutline as DeleteIcon, EditOutlined as EditIcon } from '@mui/icons-material';

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    student_uid: '',
    topic_uid: '',
    title: '',
    document: '',
  });

  useEffect(() => {
    // Fetch notes data from API
    // Replace this with your actual API call
    // Example: fetchNotes();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement form validation here
    if (!formData.title || !formData.document) {
      setError("Title and Document are required.");
      return;
    }

    setLoading(true);

    // Implement create note API call
    // .then(() => {
    //    setSuccess("Note created successfully.");
    //    setFormData({ student_uid: '', topic_uid: '', title: '', document: '' });
    //    fetchNotes();
    // })
    // .catch((error) => setError("Failed to create note: " + error.message))
    // .finally(() => setLoading(false));
  };

  const handleDelete = (id) => {
    // Implement delete note API call
    // .then(() => {
    //    setSuccess("Note deleted successfully.");
    //    fetchNotes();
    // })
    // .catch((error) => setError("Failed to delete note: " + error.message));
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Notes
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: '20px' }}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Student UID"
                    name="student_uid"
                    value={formData.student_uid}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Topic UID"
                    name="topic_uid"
                    value={formData.topic_uid}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Document"
                    name="document"
                    value={formData.document}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="primary">
                    Add Note
                  </Button>
                  {loading && <CircularProgress style={{ marginLeft: '10px' }} />}
                </Grid>
              </Grid>
            </form>
            {error && <Typography color="error">{error}</Typography>}
            {success && <Typography color="primary">{success}</Typography>}
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Student UID</TableCell>
                  <TableCell>Topic UID</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {notes.map((note) => (
                  <TableRow key={note.id}>
                    <TableCell>{note.title}</TableCell>
                    <TableCell>{note.student_uid}</TableCell>
                    <TableCell>{note.topic_uid}</TableCell>
                    <TableCell>
                      <Tooltip title="Edit">
                        <IconButton aria-label="edit">
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton aria-label="delete" onClick={() => handleDelete(note.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </div>
  );
};

export default Notes;

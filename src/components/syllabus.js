import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Snackbar,
  Alert,
  FormControl,
} from '@mui/material';
import '../css/forms.css';

const Syllabus = () => {
  const [syllabusItems, setSyllabusItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [levels, setLevels] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState({ id: null, sylubus_name: '', id: '', id: '', amount: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    fetchSyllabusItems();
    fetchCategories();
    fetchLevels();
  }, []);

  const fetchSyllabusItems = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/syllabus/all_syllabus');
      setSyllabusItems(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching syllabus items:', error);
      setError('Failed to fetch syllabus items');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/category/all_category');
      setCategories(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setError('Failed to fetch categories');
    }
  };

  const fetchLevels = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/level/all_levels');
      setLevels(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching levels:', error);
      setError('Failed to fetch levels');
    }
  };

  const handleClickOpen = () => {
    setCurrentItem({ id: null, sylubus_name: '', id: '', id: '', amount: '' });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async () => {
    if (!currentItem.sylubus_name || !currentItem.id || !currentItem.id || !currentItem.amount) {
      setError('All fields are required');
      return;
    }
    try {
      if (currentItem.id === null) {
        // Create new syllabus item
        const response = await axios.post('http://127.0.0.1:8000/api/syllabus/add_sylubus', currentItem);
        setSyllabusItems([...syllabusItems, response.data]);
        console.log('added responses:', response.data);
      } else {
        // Update existing syllabus item
        await axios.put(`http://127.0.0.1:8000/api/syllabus/update_sylubus/${currentItem.id}`, currentItem);
        setSyllabusItems(syllabusItems.map(item => item.id === currentItem.id ? currentItem : item));
      }
      setOpen(false);
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error updating syllabus item:', error.response.data);
      setError('Failed to update syllabus item');
    }
  };

  const handleEdit = (item) => {
    setCurrentItem(item);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/syllabus/delete_sylubus/${id}`);
      setSyllabusItems(syllabusItems.filter(item => item.id !== id));
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error deleting syllabus item:', error);
      setError('Failed to delete syllabus item');
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Manage Syllabus
      </Typography>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Add Syllabus Item
      </Button>
      {loading ? (
        <CircularProgress style={{ marginTop: '20px' }} />
      ) : (
        <TableContainer component={Paper} style={{ marginTop: '20px' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Syllabus Name</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Level</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {syllabusItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.sylubus_name}</TableCell>
                  <TableCell>{categories.find(cat => cat.id === item.id)?.category_name || 'Unknown'}</TableCell>
                  <TableCell>{levels.find(lvl => lvl.id === item.
                    id)?.name || 'Unknown'}</TableCell>
                  <TableCell>{item.amount}</TableCell>
                  <TableCell>
                    <Button color="primary" onClick={() => handleEdit(item)}>Edit</Button>
                    <Button color="secondary" onClick={() => handleDelete(item.id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {error && <Alert severity="error" onClose={() => setError(null)}>{error}</Alert>}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{currentItem.id === null ? 'Add Syllabus' : 'Edit Syllabus Item'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {currentItem.id === null ? 'Add a new item to the syllabus.' : 'Edit the existing syllabus item.'}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Syllabus Name"
            type="text"
            fullWidth
            value={currentItem.sylubus_name}
            onChange={(e) => setCurrentItem({ ...currentItem, sylubus_name: e.target.value })}
          />
          <div className="form-control">
            <label>Category</label>
            <select
              value={currentItem.id !== null ? currentItem.id : ''}
              onChange={(e) => setCurrentItem({ ...currentItem, id: e.target.value })}
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.category_name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-control">
            <label>Level</label>
            <select
              value={currentItem.id !== null ? currentItem.id : ''}
              onChange={(e) => setCurrentItem({ ...currentItem, id: e.target.value })}
            >
              {levels.map((level) => (
                <option key={level.id} value={level.id}>
                  {level.name}
                </option>
              ))}
            </select>
          </div>

          <TextField
            margin="dense"
            label="Amount"
            type="number"
            fullWidth
            value={currentItem.amount}
            onChange={(e) => setCurrentItem({ ...currentItem, amount: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="success">
          Operation successful!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Syllabus;

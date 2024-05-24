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
  Select,
  MenuItem
} from '@mui/material';

const Syllabus = () => {
  const [syllabusItems, setSyllabusItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [levels, setLevels] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState({ id: null, syllabus_name: '', category_id: '', level_id: '', amount: '' });

  useEffect(() => {
    fetchSyllabusItems();
    fetchCategories();
    fetchLevels();
  }, []);

  const fetchSyllabusItems = async () => {
    try {
      const response = await axios.get('/api/list/syllabus');
      setSyllabusItems(response.data);
    } catch (error) {
      console.error('Error fetching syllabus items:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/api/list/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchLevels = async () => {
    try {
      const response = await axios.get('/api/list/levels');
      setLevels(response.data);
    } catch (error) {
      console.error('Error fetching levels:', error);
    }
  };

  const handleClickOpen = () => {
    setCurrentItem({ id: null, syllabus_name: '', category_id: '', level_id: '', amount: '' });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async () => {
    try {
      if (currentItem.id === null) {
        // Create new syllabus item
        const response = await axios.post('/api/add/syllabus', currentItem);
        setSyllabusItems([...syllabusItems, response.data]);
      } else {
        // Update existing syllabus item
        await axios.put(`/api/update/syllabus/${currentItem.id}`, currentItem);
        setSyllabusItems(syllabusItems.map(item => item.id === currentItem.id ? currentItem : item));
      }
      setOpen(false);
    } catch (error) {
      console.error('Error saving syllabus item:', error);
    }
  };

  const handleEdit = (item) => {
    setCurrentItem(item);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/delete/syllabus/${id}`);
      setSyllabusItems(syllabusItems.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error deleting syllabus item:', error);
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Manage Syllabus
      </Typography>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Add Syllabus Item
      </Button>
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
                <TableCell>{item.syllabus_name}</TableCell>
                <TableCell>{categories.find(cat => cat.id === item.category_id)?.name || 'Unknown'}</TableCell>
                <TableCell>{levels.find(lvl => lvl.id === item.level_id)?.name || 'Unknown'}</TableCell>
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
            value={currentItem.syllabus_name}
            onChange={(e) => setCurrentItem({ ...currentItem, syllabus_name: e.target.value })}
          />
          <Select
            margin="dense"
            label="Category"
            fullWidth
            value={currentItem.category_id}
            onChange={(e) => setCurrentItem({ ...currentItem, category_id: e.target.value })}
          >
            {categories.map(category => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
          <Select
            margin="dense"
            label="Level"
            fullWidth
            value={currentItem.level_id}
            onChange={(e) => setCurrentItem({ ...currentItem, level_id: e.target.value })}
          >
            {levels.map(level => (
              <MenuItem key={level.id} value={level.id}>
                {level.name}
              </MenuItem>
            ))}
          </Select>
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
    </div>
  );
};

export default Syllabus;

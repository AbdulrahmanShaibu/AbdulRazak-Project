import React, { useState } from 'react';
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
  TextField
} from '@mui/material';

const Syllabus = () => {
  const [syllabusItems, setSyllabusItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState({ id: null, title: '', description: '' });

  const handleClickOpen = () => {
    setCurrentItem({ id: null, title: '', description: '' });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    if (currentItem.id === null) {
      setSyllabusItems([...syllabusItems, { ...currentItem, id: syllabusItems.length }]);
    } else {
      setSyllabusItems(syllabusItems.map(item => item.id === currentItem.id ? currentItem : item));
    }
    setOpen(false);
  };

  const handleEdit = (item) => {
    setCurrentItem(item);
    setOpen(true);
  };

  const handleDelete = (id) => {
    setSyllabusItems(syllabusItems.filter(item => item.id !== id));
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
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {syllabusItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.description}</TableCell>
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
        <DialogTitle>{currentItem.id === null ? 'Add Syllabus Item' : 'Edit Syllabus Item'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {currentItem.id === null ? 'Add a new item to the syllabus.' : 'Edit the existing syllabus item.'}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            type="text"
            fullWidth
            value={currentItem.title}
            onChange={(e) => setCurrentItem({ ...currentItem, title: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Description"
            type="text"
            fullWidth
            value={currentItem.description}
            onChange={(e) => setCurrentItem({ ...currentItem, description: e.target.value })}
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
}

export default Syllabus;

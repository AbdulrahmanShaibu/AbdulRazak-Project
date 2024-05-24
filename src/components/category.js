import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  AppBar, Toolbar, List, ListItem, ListItemText, Typography, TextField, Button, Box, CssBaseline, Container, Paper, IconButton, Snackbar, Alert
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [newCategoryDetails, setNewCategoryDetails] = useState('');
  const [newCategoryStatus, setNewCategoryStatus] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/api/list/category');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleAddCategory = async () => {
    if (newCategory.trim() !== '') {
      try {
        const response = await axios.post('/api/add/category', {
          category_name: newCategory,
          category_details: newCategoryDetails,
          category_status: newCategoryStatus
        });
        setCategories([...categories, response.data]);
        setSnackbarMessage('Category added successfully');
        setSnackbarOpen(true);
        setNewCategory('');
        setNewCategoryDetails('');
        setNewCategoryStatus('');
      } catch (error) {
        console.error('Error adding category:', error);
      }
    }
  };

  const handleEditCategory = (index) => {
    const category = categories[index];
    setEditIndex(index);
    setNewCategory(category.category_name);
    setNewCategoryDetails(category.category_details);
    setNewCategoryStatus(category.category_status);
  };

  const handleUpdateCategory = async () => {
    if (newCategory.trim() !== '' && editIndex !== null) {
      try {
        const response = await axios.put(`/api/update/category/${categories[editIndex].id}`, {
          category_name: newCategory,
          category_details: newCategoryDetails,
          category_status: newCategoryStatus
        });
        const updatedCategories = [...categories];
        updatedCategories[editIndex] = response.data;
        setCategories(updatedCategories);
        setSnackbarMessage('Category updated successfully');
        setSnackbarOpen(true);
        setNewCategory('');
        setNewCategoryDetails('');
        setNewCategoryStatus('');
        setEditIndex(null);
      } catch (error) {
        console.error('Error updating category:', error);
      }
    }
  };

  const handleDeleteCategory = async (index) => {
    try {
      await axios.delete(`/api/delete/category/${categories[index].id}`);
      const updatedCategories = [...categories];
      updatedCategories.splice(index, 1);
      setCategories(updatedCategories);
      setSnackbarMessage('Category deleted successfully');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <CssBaseline />
      <Container component="main" sx={{ flexGrow: 1, py: 4 }}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h4" gutterBottom>
            Manage Categories
          </Typography>
          <Box component="form" sx={{ display: 'flex', alignItems: 'center', mb: 3, flexDirection: 'column' }}>
            <TextField
              label="Category Name"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Category Details"
              value={newCategoryDetails}
              onChange={(e) => setNewCategoryDetails(e.target.value)}
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Category Status"
              value={newCategoryStatus}
              onChange={(e) => setNewCategoryStatus(e.target.value)}
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              {editIndex !== null ? (
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<EditIcon />}
                  onClick={handleUpdateCategory}
                >
                  Update
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AddIcon />}
                  onClick={handleAddCategory}
                >
                  Add
                </Button>
              )}
            </Box>
          </Box>
          <Typography paragraph>
            This section allows you to manage the categories of subjects for students. You can add, remove, and update categories as needed.
          </Typography>
          <List>
            {categories.map((category, index) => (
              <ListItem key={index} secondaryAction={
                <>
                  <IconButton color="primary" onClick={() => handleEditCategory(index)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDeleteCategory(index)}>
                    <DeleteIcon />
                  </IconButton>
                </>
              }>
                <ListItemText primary={category.category_name} />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Container>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Category;

import React, { useState } from 'react';
import {
  AppBar, Toolbar, List, ListItem, ListItemText, Typography, TextField, Button, Box, CssBaseline, Container, Paper, IconButton
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon, Menu as MenuIcon } from '@mui/icons-material';

const Category = () => {
  const [categories, setCategories] = useState(['Mathematics', 'Science', 'History']);
  const [newCategory, setNewCategory] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  const handleAddCategory = () => {
    if (newCategory.trim() !== '') {
      setCategories([...categories, newCategory]);
      setNewCategory('');
    }
  };

  const handleEditCategory = (index) => {
    setEditIndex(index);
    setNewCategory(categories[index]);
  };

  const handleUpdateCategory = () => {
    if (newCategory.trim() !== '') {
      const updatedCategories = [...categories];
      updatedCategories[editIndex] = newCategory;
      setCategories(updatedCategories);
      setNewCategory('');
      setEditIndex(null);
    }
  };

  const handleDeleteCategory = (index) => {
    const updatedCategories = [...categories];
    updatedCategories.splice(index, 1);
    setCategories(updatedCategories);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <CssBaseline />
      <Container component="main" sx={{ flexGrow: 1, py: 4 }}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h4" gutterBottom>
            Manage Categories
          </Typography>
          <Box component="form" sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <TextField
              label="New Category"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              variant="outlined"
              sx={{ mr: 2, flex: 1 }}
            />
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
          <Typography paragraph>
            This section allows you to manage the categories of subjects for students. You can add, remove, and update categories as needed.
          </Typography>
          <List>
            {categories.map((category, index) => (
              <ListItem key={index}>
                <ListItemText primary={category} />
                <IconButton color="primary" onClick={() => handleEditCategory(index)}>
                  <EditIcon />
                </IconButton>
                <IconButton color="error" onClick={() => handleDeleteCategory(index)}>
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
        </Paper>
      </Container>
    </Box>
  );
};

export default Category;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Stack, TextField, Button, Box, CssBaseline, Container, Paper,
  IconButton, Snackbar, Alert, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, TablePagination,
  Typography, Dialog, DialogActions, DialogContent,
  DialogContentText, DialogTitle
} from '@mui/material';
import {
  Add as AddIcon, Edit as EditIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [newCategoryDetails, setNewCategoryDetails] = useState('');
  const [newCategoryStatus, setNewCategoryStatus] = useState('');
  const [categoryImage, setCategoryImage] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/category/all_category');
      setCategories(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleAddCategory = async () => {
    if (!validateFields()) {
      setSnackbarMessage('Validation error');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    const formData = new FormData();
    formData.append('category_name', newCategory);
    formData.append('category_details', newCategoryDetails);
    formData.append('category_status', newCategoryStatus);
    if (categoryImage) {
      formData.append('category_image', categoryImage);
    }

    console.log('Sending category data:', formData);

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/category/add_category/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setCategories([...categories, response.data]);
      setSnackbarMessage('Category added successfully');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      setNewCategory('');
      setNewCategoryDetails('');
      setNewCategoryStatus('');
      setCategoryImage(null);
    } catch (error) {
      console.error('Error adding category:', error);

      if (error.response) {
        console.error('Error response data:', error.response.data);
        setSnackbarMessage(`Failed to add category: ${JSON.stringify(error.response.data.detail) || 'Unknown error'}`);
      } else {
        setSnackbarMessage('Failed to add category');
      }

      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const validateFields = () => {
    const newErrors = {};
    if (!newCategory.trim()) {
      newErrors.category_name = 'Category name is required';
    }
    if (!newCategoryDetails.trim()) {
      newErrors.category_details = 'Category details are required';
    }
    if (!newCategoryStatus.trim()) {
      newErrors.category_status = 'Category status is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEditCategory = (index) => {
    const category = categories[index];
    setEditIndex(index);
    setNewCategory(category.category_name);
    setNewCategoryDetails(category.category_details);
    setNewCategoryStatus(category.category_status);
    setErrors({});
  };

  const handleUpdateCategory = async () => {
    if (validateFields()) {
      const categoryId = categories[editIndex]._id;
      const categoryData = {
        category_name: newCategory,
        category_details: newCategoryDetails,
        category_status: newCategoryStatus
      };

      try {
        const response = await axios.put(`http://127.0.0.1:8000/api/category/update_category/${categoryId}`, categoryData);

        if (response.status === 200) {
          const updatedCategories = [...categories];
          updatedCategories[editIndex] = response.data;
          setCategories(updatedCategories);
          setSnackbarMessage('Category updated successfully');
          setSnackbarSeverity('success');
          setSnackbarOpen(true);
          setNewCategory('');
          setNewCategoryDetails('');
          setNewCategoryStatus('');
          setEditIndex(null);
        } else {
          throw new Error('Failed to update category');
        }
      } catch (error) {
        console.error('Error updating category:', error);
        setSnackbarMessage('Failed to update category');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      }
    } else {
      setSnackbarMessage('Please fix the validation errors');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };


  const handleDeleteCategory = async (index) => {
    if (index === null || index === undefined || index < 0 || index >= categories.length) {
      console.error('Invalid delete index:', index);
      return;
    }

    const categoryId = categories[index]?._id;

    if (!categoryId) {
      console.error('Invalid category ID:', categoryId);
      return;
    }

    console.log('Deleting category with ID:', categoryId);

    try {
      await axios.delete(`http://127.0.0.1:8000/api/category/delete_category/${categoryId}`);
      const updatedCategories = categories.filter((_, i) => i !== index);
      setCategories(updatedCategories);
      setSnackbarMessage('Category deleted successfully');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      setDeleteDialogOpen(false);
      setDeleteIndex(null);
    } catch (error) {
      console.error('Error deleting category:', error);
      setSnackbarMessage('Failed to delete category');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleDeleteClick = (index) => {
    setDeleteIndex(index);
    setDeleteDialogOpen(true);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setDeleteIndex(null);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <CssBaseline />
      <Container component="main" sx={{ flexGrow: 1, py: 1 }} style={{ marginLeft: '-25px' }}>
        <Typography variant="h7" gutterBottom sx={{ color: '#3f51b5' }}>
          Category Management
        </Typography>
        <Paper elevation={0} sx={{ p: 2 }}>
          <Box component="form" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
            <Stack spacing={2} direction="row" sx={{ mb: 2, width: '100%' }}>
              <TextField
                label="Category Name"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                variant="outlined"
                fullWidth
                error={!!errors.category_name}
                helperText={errors.category_name}
              />
              <TextField
                label="Category Details"
                value={newCategoryDetails}
                onChange={(e) => setNewCategoryDetails(e.target.value)}
                variant="outlined"
                fullWidth
                error={!!errors.category_details}
                helperText={errors.category_details}
              />
            </Stack>
            <Stack spacing={2} direction="row" sx={{ mb: 2, width: '100%' }}>
              <TextField
                label="Category Status"
                value={newCategoryStatus}
                onChange={(e) => setNewCategoryStatus(e.target.value)}
                variant="outlined"
                fullWidth
                error={!!errors.category_status}
                helperText={errors.category_status}
              />
              <TextField
                type="file"
                onChange={(e) => setCategoryImage(e.target.files[0])}
                variant="outlined"
                fullWidth
                inputProps={{ accept: 'image/*' }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                {editIndex !== null ? (
                  <Button
                    variant="contained"
                    color="success"
                    startIcon={<EditIcon />}
                    onClick={handleUpdateCategory}
                    fullWidth
                  >
                    Update
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={handleAddCategory}
                    fullWidth
                  >
                    Add Category
                  </Button>
                )}
              </Box>
            </Stack>
          </Box>
          <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Details</TableCell>
                  <TableCell>Image</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {categories.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((category, index) => (
                  <TableRow key={index} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' } }}>
                    <TableCell>{category.category_name}</TableCell>
                    <TableCell>{category.category_details}</TableCell>
                    <TableCell>
                      <img src={`uploads/category/${category.category_image}`} alt={category.category_name} style={{ maxWidth: '100px', maxHeight: '100px', objectFit: 'cover' }} />
                    </TableCell>
                    <TableCell>{category.category_status}</TableCell>
                    <TableCell>
                      <IconButton color="primary" onClick={() => handleEditCategory(index)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton color="error" onClick={() => handleDeleteClick(index)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={categories.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Container>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete this category?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">Cancel</Button>
          <Button onClick={() => handleDeleteCategory(deleteIndex)} color="error">Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Category;

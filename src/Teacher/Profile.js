import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar, Alert
} from '@mui/material';

const Profile = () => {
  const [profile, setProfile] = useState([]);
  const [open, setOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [profileData, setProfileData] = useState({
    id: null,
    auth_id: '',
    name: '',
    phone: '',
    email: '',
    country: '',
    address: '',
    description: '',
    cv: ''
  });


  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const response = await axios.get('http://127.0.0.1:8000/api/teacher/get_all_teachers');
    setProfile(response.data);
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setProfileData({ ...profileData, [name]: files[0] });
    } else {
      setProfileData({ ...profileData, [name]: value });
    }
  };


  const handleFileChange = (e) => {
    setProfileData({ ...profileData, cv: e.target.files[0] });
  };

  const validate = () => {
    let tempErrors = {};
    tempErrors.auth_id = profileData.auth_id ? "" : "This field is required.";
    tempErrors.name = profileData.name ? "" : "This field is required.";
    tempErrors.phone = profileData.phone ? (/^\d{10}$/.test(profileData.phone) ? "" : "Phone number is not valid.") : "This field is required.";
    tempErrors.email = profileData.email ? (/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(profileData.email) ? "" : "Email is not valid.") : "This field is required.";
    tempErrors.country = profileData.country ? "" : "This field is required.";
    tempErrors.address = profileData.address ? "" : "This field is required.";
    tempErrors.description = profileData.description ? "" : "This field is required.";
    tempErrors.cv = profileData.cv ? "" : "Cv is required.";

    setErrors(tempErrors);
    return Object.values(tempErrors).every(x => x === "");
  };


  const handleSubmit = async () => {
    if (validate()) {
      const formData = new FormData();
      formData.append('auth_id', profileData.auth_id);
      formData.append('name', profileData.name);
      formData.append('phone', profileData.phone);
      formData.append('email', profileData.email);
      formData.append('country', profileData.country);
      formData.append('address', profileData.address);
      formData.append('description', profileData.description);
      if (profileData.cv instanceof File) {
        formData.append('cv', profileData.cv);
      } else {
        formData.append('cv', profileData.cv); // Treat it as a string
      }

      try {
        if (profileData.id) {
          await axios.put(`http://127.0.0.1:8000/api/teacher/update_teacher/${profileData.id}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
        } else {
          await axios.post('http://127.0.0.1:8000/api/teacher/add_teacher/', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
        }
        fetchProfile();
        handleClose();
        setSnackbarMessage(profileData.id ? 'Profile updated successfully!' : 'Profile created successfully!');
        setSnackbarOpen(true);
      } catch (error) {
        console.error('There was an error!', error.response.data);
      }
    }
  };



  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/teacher/delete_teacher/${id}`);
      fetchProfile();
      setSnackbarMessage('Profile deleted successfully!');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('There was an error deleting the profile!', error);
    }
  };


  const handleOpen = (data = {}) => {
    setProfileData({ ...profileData, ...data }); // Merge existing profileData with passed data
    setErrors({});
    setOpen(true);
};


  const handleClose = () => {
    setOpen(false);
    setProfileData({
      // id: null,
      name: '',
      phone: '',
      email: '',
      country: '',
      address: '',
      description: '',
      cv: null
    });
    setErrors({});
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div style={{ padding: 20 }}>
      <Button variant="contained" color="primary" onClick={() => handleOpen()} style={{ marginBottom: 20 }}>
        Create Profile
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Country</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>CV</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {profile.map((prof) => (
              <TableRow key={prof.id}>
                <TableCell>{prof.name}</TableCell>
                <TableCell>{prof.phone}</TableCell>
                <TableCell>{prof.email}</TableCell>
                <TableCell>{prof.country}</TableCell>
                <TableCell>{prof.address}</TableCell>
                <TableCell>{prof.description}</TableCell>
                <TableCell>{prof.cv}</TableCell>
                <TableCell>
                  <Button color="primary" onClick={() => handleOpen(prof)}>Edit</Button>
                  <Button color="secondary" onClick={() => handleDelete(prof.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{profileData.id ? 'Edit Profile' : 'Create Profile'}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Auth ID"
            name="auth_id"
            value={profileData.auth_id}
            onChange={handleInputChange}
            fullWidth
            required
            error={!!errors.auth_id}
            helperText={errors.auth_id}
          />
          <TextField
            margin="dense"
            label="Name"
            name="name"
            value={profileData.name}
            onChange={handleInputChange}
            fullWidth
            required
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            margin="dense"
            label="Phone"
            name="phone"
            value={profileData.phone}
            onChange={handleInputChange}
            fullWidth
            required
            error={!!errors.phone}
            helperText={errors.phone}
          />
          <TextField
            margin="dense"
            label="Email"
            name="email"
            value={profileData.email}
            onChange={handleInputChange}
            fullWidth
            required
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            margin="dense"
            label="Country"
            name="country"
            value={profileData.country}
            onChange={handleInputChange}
            fullWidth
            required
            error={!!errors.country}
            helperText={errors.country}
          />
          <TextField
            margin="dense"
            label="Address"
            name="address"
            value={profileData.address}
            onChange={handleInputChange}
            fullWidth
            required
            error={!!errors.address}
            helperText={errors.address}
          />
          <TextField
            margin="dense"
            label="Description"
            name="description"
            value={profileData.description}
            onChange={handleInputChange}
            fullWidth
            required
            error={!!errors.description}
            helperText={errors.description}
          />
          <input
            type="file"
            name="cv"
            onChange={handleInputChange}
            required
            style={{ marginTop: 20 }}
          />
        </DialogContent>


        <DialogActions>
          <Button onClick={handleClose} color="primary">Cancel</Button>
          <Button onClick={handleSubmit} color="primary">{profileData.id ? 'Update' : 'Add'}</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Profile;

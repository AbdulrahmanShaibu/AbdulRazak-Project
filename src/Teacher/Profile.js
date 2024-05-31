// src/ClassManagement.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle
} from '@mui/material';

const Profile = () => {
  const [profile, setProfile] = useState([]);
  const [open, setOpen] = useState(false);
  const [profileData, setprofileData] = useState({
    id: null,
    name: '',
    phone: '',
    email: '',
    country: '',
    address: '',
    description: ''
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const response = await axios.get('http://localhost:3001/profile');
    setProfile(response.data);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setprofileData({ ...profileData, [name]: value });
  };

  const handleSubmit = async () => {
    if (profileData.id) {
      await axios.put(`http://localhost:3001/profile/${profileData.id}`, profileData);
    } else {
      await axios.post('http://localhost:3001/profile', profileData);
    }
    fetchProfile();
    handleClose();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3001/profile/${id}`);
    fetchProfile();
  };

  const handleOpen = (data = {}) => {
    setprofileData(data);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setprofileData({
      id: null,
      name: '',
      phone: '',
      email: '',
      country: '',
      address: '',
      description: ''
    });
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={() => handleOpen()}>
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
          <TextField margin="dense" label="Name" name="name" value={profileData.name} onChange={handleInputChange} fullWidth required />
          <TextField margin="dense" label="Phone" name="phone" value={profileData.phone} onChange={handleInputChange} fullWidth required />
          <TextField margin="dense" label="Email" name="email" value={profileData.email} onChange={handleInputChange} fullWidth required />
          <TextField margin="dense" label="Country" name="country" value={profileData.country} onChange={handleInputChange} fullWidth required />
          <TextField margin="dense" label="Address" name="address" value={profileData.address} onChange={handleInputChange} fullWidth required />
          <TextField margin="dense" label="Description" name="description" value={profileData.description} onChange={handleInputChange} fullWidth required />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">Cancel</Button>
          <Button onClick={handleSubmit} color="primary">{profileData.id ? 'Update' : 'Add'}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Profile;

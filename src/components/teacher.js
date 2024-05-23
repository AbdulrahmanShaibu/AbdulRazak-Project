import React, { useState } from 'react';
import {
    Typography, Container, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, Paper,
    Button, Dialog, DialogActions, DialogContent,
    DialogTitle, TextField, IconButton
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const initialTeachers = [
    { id: 1, name: 'John Doe', subject: 'Mathematics' },
    { id: 2, name: 'Jane Smith', subject: 'Science' },
];

const Teacher = () => {
    const [teachers, setTeachers] = useState(initialTeachers);
    const [open, setOpen] = useState(false);
    const [newTeacher, setNewTeacher] = useState({ name: '', subject: '' });

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewTeacher({ ...newTeacher, [name]: value });
    };

    const handleAddTeacher = () => {
        setTeachers([...teachers, { id: teachers.length + 1, ...newTeacher }]);
        setNewTeacher({ name: '', subject: '' });
        handleClose();
    };

    const handleDeleteTeacher = (id) => {
        setTeachers(teachers.filter(teacher => teacher.id !== id));
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Manage Teachers
            </Typography>
            <Button variant="contained" color="primary" onClick={handleOpen}>
                Add Teacher
            </Button>
            <TableContainer component={Paper} style={{ marginTop: '20px' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Subject</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {teachers.map((teacher) => (
                            <TableRow key={teacher.id}>
                                <TableCell>{teacher.id}</TableCell>
                                <TableCell>{teacher.name}</TableCell>
                                <TableCell>{teacher.subject}</TableCell>
                                <TableCell align="right">
                                    <IconButton color="primary">
                                        <Edit />
                                    </IconButton>
                                    <IconButton color="secondary" onClick={() => handleDeleteTeacher(teacher.id)}>
                                        <Delete />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add New Teacher</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="name"
                        label="Name"
                        type="text"
                        fullWidth
                        value={newTeacher.name}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="subject"
                        label="Subject"
                        type="text"
                        fullWidth
                        value={newTeacher.subject}
                        onChange={handleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleAddTeacher} color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default Teacher;

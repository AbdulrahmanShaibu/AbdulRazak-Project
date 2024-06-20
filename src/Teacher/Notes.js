import React, { useState, useEffect } from 'react';
import {
    TextField, Button, Table, TableBody, TableContainer,
    TableHead, TableCell, TableRow, Paper, Container, CircularProgress
} from '@mui/material';
import axios from 'axios';

const Notes = () => {
    const [notesData, setNotesData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newNote, setNewNote] = useState({
        student_id: '',
        teacher_id: '',
        title: '',
        description: '',
        link_url: '',
        file: '',
        status: '',
        marks: ''
    });
    const [updatedNote, setUpdatedNote] = useState({
        student_id: '',
        teacher_id: '',
        title: '',
        description: '',
        link_url: '',
        file: '',
        status: '',
        marks: ''
    });

    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = () => {
        axios.get('http://127.0.0.1:8000/api/teacher/all_notes')
            .then(response => {
                setNotesData(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError('Error fetching notes. Please try again later.');
                setLoading(false);
            });
    };

    const handleAddNotes = () => {
        axios.post('http://127.0.0.1:8000/api/teacher/add_notes', newNote)
            .then(response => {
                setNotesData([...notesData, response.data]);
                setNewNote({
                    student_id: '',
                    teacher_id: '',
                    title: '',
                    description: '',
                    link_url: '',
                    file: '',
                    status: '',
                    marks: ''
                });
            })
            .catch(error => {
                setError('Error adding notes. Please try again later.');
            });
    };

    const handleDeleteNotes = (uid) => {
        axios.delete(`http://127.0.0.1:8000/api/teacher/delete_notes/${uid}`)
            .then(response => {
                setNotesData(notesData.filter(note => note._id !== uid));
            })
            .catch(error => {
                setError('Error deleting notes. Please try again later.');
            });
    };

    const handleEditNotes = (uid, updatedNote) => {
        axios.put(`http://127.0.0.1:8000/api/teacher/edit_notes/${uid}`, updatedNote)
            .then(response => {
                const updatedNotes = notesData.map(note => {
                    if (note._id === uid) {
                        return { ...note, ...updatedNote };
                    }
                    return note;
                });
                setNotesData(updatedNotes);
            })
            .catch(error => {
                setError('Error updating notes. Please try again later.');
            });
    };

    return (
        <Container>
            <TextField
                label="Student Id"
                value={newNote.student_id}
                onChange={(e) => setNewNote({ ...newNote, student_id: e.target.value })}
            />
            {/* Add other fields similarly for teacher_id, title, etc. */}

            <Button variant="contained" onClick={handleAddNotes} style={{ marginBottom: '20px' }}>
                Add Notes
            </Button>

            {loading && <CircularProgress />} {/* Show loading indicator */}
            {error && <p>{error}</p>} {/* Show error message */}
            {!loading && !error && (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Student Id</TableCell>
                                <TableCell>Teacher Name</TableCell>
                                <TableCell>Notes Title</TableCell>
                                <TableCell>Teacher Description</TableCell>
                                <TableCell>View Link</TableCell>
                                <TableCell>View File</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Marks</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {notesData.map((note) => (
                                <TableRow key={note._id}>
                                    <TableCell>{note.student_id}</TableCell>
                                    <TableCell>{note.teacher_id}</TableCell>
                                    <TableCell>{note.title}</TableCell>
                                    <TableCell>{note.description}</TableCell>
                                    <TableCell>{note.link_url}</TableCell>
                                    <TableCell>{note.file}</TableCell>
                                    <TableCell>{note.status}</TableCell>
                                    <TableCell>{note.marks}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            onClick={() => {
                                                setUpdatedNote({
                                                    student_id: note.student_id,
                                                    teacher_id: note.teacher_id,
                                                    title: note.title,
                                                    description: note.description,
                                                    link_url: note.link_url,
                                                    file: note.file,
                                                    status: note.status,
                                                    marks: note.marks
                                                });
                                                handleEditNotes(note._id, updatedNote);
                                            }}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            color="secondary"
                                            onClick={() => handleDeleteNotes(note._id)}
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Container>
    );
};

export default Notes;

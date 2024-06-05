import React, { useState, useEffect } from 'react';
import {
    TextField, Button, Table, TableBody, TableContainer,
    TableHead, TableCell, TableRow, Paper, Container, CircularProgress
} from '@mui/material';
import axios from 'axios';

const StudentNotes = () => {
    const [notesData, setNotesData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = () => {
        axios.get('/api/v1/notes/list')
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
        // Validation can be added here if needed
        axios.post('/api/v1/notes/add', notesData)
            .then(response => {
                setNotesData([...notesData, response.data]);
            })
            .catch(error => {
                setError('Error adding notes. Please try again later.');
            });
    };


    return (
        <Container>
            <Button variant="contained" onClick={handleAddNotes} style={{ marginBottom: '20px' }}>
                View Notes
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
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {notesData.map((notes, index) => (
                                <TableRow key={index}>
                                    <TableCell>{notes.student_id}</TableCell>
                                    <TableCell>{notes.teacher_id}</TableCell>
                                    <TableCell>{notes.title}</TableCell>
                                    <TableCell>{notes.description}</TableCell>
                                    <TableCell>{notes.link_url}</TableCell>
                                    <TableCell>{notes.file}</TableCell>
                                    <TableCell>{notes.status}</TableCell>
                                    <TableCell>{notes.marks}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Container>
    );
};

export default StudentNotes;

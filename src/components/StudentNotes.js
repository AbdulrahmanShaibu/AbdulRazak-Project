import React, { useState, useEffect } from 'react';
import {
    TextField, Button, Table, TableBody, TableContainer,
    TableHead, TableCell, TableRow, Paper, Container
} from '@mui/material';
import axios from 'axios';

const StudentNotes = () => {
    const [notesData, setNotesData] = useState([]);

    useEffect(() => {
        // Fetch notes data from API
        axios.get('/api/v1/notes/list')
            .then(response => {
                setNotesData(response.data);
                console.log('notes list:', response.data);
            })
            .catch(error => {
                console.log('error listing notes:', error);
            });
    }, []);

    const handleAddNotes = () => {
        // Call API to add notes
        axios.post('/api/v1/notes/add', notesData)
            .then(response => {
                setNotesData([...notesData, response.data]);
                console.log('notes added:', response.data);
            })
            .catch(error => {
                console.log('error adding notes:', error);
            });
    };

    return (
        <Container>
            <Button variant="contained" onClick={handleAddNotes} style={{ marginBottom: '20px' }}>
                Add Notes
            </Button>
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
        </Container>
    );
};

export default StudentNotes;

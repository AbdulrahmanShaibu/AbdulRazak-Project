import React, { useState, useEffect } from 'react';
import {
    TextField, Button, Select, MenuItem, FormControl,
    InputLabel, List, ListItem, ListItemText, Paper, Typography, Grid, Snackbar
} from '@mui/material';

const StudentSelectedSubject = () => {
    const [teacherUid, setTeacherUid] = useState('');
    const [subjectUid, setSubjectUid] = useState('');
    const [subjects, setSubjects] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [selectedSubjects, setSelectedSubjects] = useState([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    useEffect(() => {
        // Fetch subjects and teachers data from API
        fetchSubjects();
        fetchTeachers();
    }, []);

    const fetchSubjects = async () => {
        // Call API to fetch subjects
        try {
            const response = await fetch('your_subjects_api_endpoint');
            const data = await response.json();
            setSubjects(data);
        } catch (error) {
            handleFetchError('subjects');
        }
    };

    const fetchTeachers = async () => {
        // Call API to fetch teachers
        try {
            const response = await fetch('your_teachers_api_endpoint');
            const data = await response.json();
            setTeachers(data);
        } catch (error) {
            handleFetchError('teachers');
        }
    };

    const handleFetchError = (type) => {
        setSnackbarMessage(`Error fetching ${type}. Please try again later.`);
        setSnackbarOpen(true);
    };

    const handleAddSubject = () => {
        // Add selected subject to the list of selected subjects
        if (teacherUid && subjectUid) {
            const selectedSubject = subjects.find(subject => subject.uid === subjectUid);
            setSelectedSubjects([...selectedSubjects, selectedSubject]);
        } else {
            setSnackbarMessage('Please select both teacher and subject.');
            setSnackbarOpen(true);
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <Grid container spacing={3} justifyContent="center">
            <Grid item xs={10} md={8} lg={6}>
            <Typography variant="h6" gutterBottom style={{textAlign:'center'}}>
                        Select Subject and Teacher
                    </Typography>
                <Paper elevation={3} sx={{ padding: 2 }}>
                    <FormControl fullWidth sx={{ marginBottom: 2 }}>
                        <InputLabel>Teacher</InputLabel>
                        <Select
                            value={teacherUid}
                            onChange={(e) => setTeacherUid(e.target.value)}
                        >
                            {teachers.map((teacher) => (
                                <MenuItem key={teacher.uid} value={teacher.uid}>
                                    {teacher.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth sx={{ marginBottom: 2 }}>
                        <InputLabel>Subject</InputLabel>
                        <Select
                            value={subjectUid}
                            onChange={(e) => setSubjectUid(e.target.value)}
                        >
                            {subjects.map((subject) => (
                                <MenuItem key={subject.uid} value={subject.uid}>
                                    {subject.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button variant="contained" onClick={handleAddSubject} fullWidth>
                        Send Request
                    </Button>
                    {/* Display list of selected subjects */}
                    <List sx={{ marginTop: 2 }}>
                        {selectedSubjects.map((subject, index) => (
                            <ListItem key={index}>
                                <ListItemText primary={subject.name} />
                            </ListItem>
                        ))}
                    </List>
                </Paper>
            </Grid>
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message={snackbarMessage}
            />
        </Grid>
    );
};

export default StudentSelectedSubject;

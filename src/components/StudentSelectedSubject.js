import React, { useState, useEffect } from 'react';
import {
    Button, FormControl,
    Typography, Grid, Snackbar, TablePagination
} from '@mui/material';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@mui/material';

const StudentSelectedSubject = () => {
    const [teacherUid, setTeacherUid] = useState('');
    const [subjectUid, setSubjectUid] = useState('');
    const [subjects, setSubjects] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [selectedSubjects, setSelectedSubjects] = useState([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        // Fetch subjects and teachers data from API
        fetchSubjects();
        fetchTeachers();
    }, []);

    const fetchSubjects = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/subject/all_subject');
            const data = await response.json();
            setSubjects(data);
        } catch (error) {
            handleFetchError('subjects');
        }
    };

    const fetchTeachers = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/teacher/get_all_teachers/');
            const data = await response.json();
            if (Array.isArray(data)) {
                setTeachers(data);
            } else {
                throw new Error('Invalid response format');
            }
        } catch (error) {
            handleFetchError('teachers');
        }
    };

    const handleFetchError = (type) => {
        setSnackbarMessage(`Error fetching ${type}. Please try again later.`);
        setSnackbarOpen(true);
    };

    const handleAddSubject = () => {
        if (teacherUid && subjectUid) {
            const selectedSubject = subjects.find(subject => subject.uid === subjectUid);
            const teacher = teachers.find(teacher => teacher.uid === teacherUid);
            setSelectedSubjects([...selectedSubjects, { ...selectedSubject, teacherName: teacher.name }]);
        } else {
            setSnackbarMessage('Please select both teacher and subject.');
            setSnackbarOpen(true);
        }
    };

    const handleCloseSnackbar = () => {
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
        <Grid container spacing={3} justifyContent="center">
            <Grid item xs={10} md={8} lg={6}>
                <Typography variant="h6" gutterBottom style={{ textAlign: 'center' }}>
                    Select Subject and Teacher
                </Typography>
                <Paper elevation={3} sx={{ padding: 2 }}>
                    <FormControl fullWidth sx={{ marginBottom: 2 }}>
                        <label>Teacher</label>
                        <select
                            value={teacherUid}
                            onChange={(e) => setTeacherUid(e.target.value)}
                            style={{ height: '50px' }}
                        >
                            {teachers.map((teacher) => (
                                <option key={teacher.uid} value={teacher.uid}>
                                    {teacher.name}
                                </option>
                            ))}
                        </select>
                    </FormControl>
                    <FormControl fullWidth sx={{ marginBottom: 2 }}>
                        <label>Subject</label>
                        <select
                            value={subjectUid}
                            onChange={(e) => setSubjectUid(e.target.value)}
                            style={{ height: '50px' }}
                        >
                            {subjects.map((subject) => (
                                <option key={subject.uid} value={subject.uid}>
                                    {subject.subject_name}
                                </option>
                            ))}
                        </select>
                    </FormControl>
                    <Button variant="contained" onClick={handleAddSubject} fullWidth>
                        Send Request
                    </Button>
                    {/* Display list of selected subjects */}
                    <TableContainer component={Paper} sx={{ marginTop: 2 }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>S/N</TableCell>
                                    <TableCell>Subject Name</TableCell>
                                    <TableCell>Teacher Name</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {selectedSubjects
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((subject, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{index + 1 + page * rowsPerPage}</TableCell>
                                            <TableCell>{subject.subject_name}</TableCell>
                                            <TableCell>{subject.teacherName}</TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                        <TablePagination
                            rowsPerPageOptions={[2, 10, 25]}
                            component="div"
                            count={selectedSubjects.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </TableContainer>
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

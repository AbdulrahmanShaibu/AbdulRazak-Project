import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
    Button, TextField, Select, MenuItem, FormControl, InputLabel, Container, Grid,
    CardContent, Typography, Card, CircularProgress, Snackbar, Alert, TablePagination
} from '@mui/material';

const Class = () => {
    const [classes, setClasses] = useState([]);
    const [categories, setCategories] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [levels, setLevels] = useState([]);
    const [syllabi, setSyllabi] = useState([]);
    const [formData, setFormData] = useState({
        auth_id: '',
        class_type: '',
        id: '',
        level_id: '',
        syllabus_id: '',
        amount: '',
        payment_type: '',
        provider: '',
        phone: '',
        duration: '',
        start_date: '',
        end_date: '',
        teacher_id: '',
    });
    const [isEdit, setIsEdit] = useState(false);
    const [editId, setEditId] = useState(null);
    const [step, setStep] = useState(0);
    const [loading, setLoading] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    // Pagination state
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [classData, categoryData, teacherData, levelData, syllabusData] = await Promise.all([
                    axios.get('http://127.0.0.1:8000/api/student/all_student_class_info'),
                    axios.get('http://127.0.0.1:8000/api/category/all_category'),
                    axios.get('http://127.0.0.1:8000/api/teacher/get_all_teacher_classes'),
                    axios.get('http://127.0.0.1:8000/api/level/all_levels'),
                    axios.get('http://127.0.0.1:8000/api/syllabus/all_syllabus')
                ]);

                setClasses(classData.data);
                setCategories(categoryData.data);
                setTeachers(teacherData.data);
                setLevels(levelData.data);
                setSyllabi(syllabusData.data);
            } catch (error) {
                console.error(error);
                setSnackbar({ open: true, message: 'Failed to fetch data', severity: 'error' });
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (isEdit) {
                await axios.put(`http://127.0.0.1:8000/api/all_student_class_info/${editId}`, formData);
                setIsEdit(false);
                setEditId(null);
            } else {
                await axios.post('http://127.0.0.1:8000/api/all_student_class_info', formData);
            }
            const classData = await axios.get('http://127.0.0.1:8000/api/all_student_class_info');
            setClasses(classData.data);
            setFormData({
                auth_id: '',
                class_type: '',
                id: '',
                level_id: '',
                syllabus_id: '',
                amount: '',
                payment_type: '',
                provider: '',
                phone: '',
                duration: '',
                start_date: '',
                end_date: '',
                teacher_id: '',
            });
            setStep(0);
            setSnackbar({ open: true, message: 'Class saved successfully', severity: 'success' });
        } catch (error) {
            console.error(error);
            setSnackbar({ open: true, message: 'Failed to save class', severity: 'error' });
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (cls) => {
        setFormData(cls);
        setIsEdit(true);
        setEditId(cls.id);
        setStep(0);
    };

    const handleDelete = async (id) => {
        setLoading(true);
        try {
            await axios.delete(`http://127.0.0.1:8000/api/all_student_class_info/${id}`);
            const classData = await axios.get('http://127.0.0.1:8000/api/all_student_class_info');
            setClasses(classData.data);
            setSnackbar({ open: true, message: 'Class deleted successfully', severity: 'success' });
        } catch (error) {
            console.error(error);
            setSnackbar({ open: true, message: 'Failed to delete class', severity: 'error' });
        } finally {
            setLoading(false);
        }
    };

    const nextStep = () => {
        setStep((prevStep) => Math.min(prevStep + 1, 3));
    };

    const prevStep = () => {
        setStep((prevStep) => Math.max(prevStep - 1, 0));
    };

    const validateForm = () => {
        const { auth_id, class_type, id, level_id, syllabus_id, amount, payment_type, provider, phone, duration, start_date, end_date, teacher_id } = formData;
        switch (step) {
            case 0:
                return auth_id && class_type && id && level_id;
            case 1:
                return syllabus_id && amount && payment_type && provider;
            case 2:
                return phone && duration && start_date && end_date;
            case 3:
                return teacher_id;
            default:
                return false;
        }
    };

    const renderStep = () => {
        switch (step) {
            case 0:
                return (
                    <>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Auth ID"
                                name="auth_id"
                                value={formData.auth_id}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Class Type"
                                name="class_type"
                                value={formData.class_type}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth margin="normal" required>
                                <label>Category</label>
                                <select
                                style={{height:'50px'}}
                                    name="category_name"
                                    value={formData.id}
                                    onChange={handleChange}
                                >
                                    {categories.map((category) => (
                                        <option key={category.id} value={category.id}>
                                            {category.category_name}
                                        </option>
                                    ))}
                                </select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth margin="normal" required>
                                <label>Level</label>
                                <select
                                 style={{height:'50px'}}
                                    name="level_id"
                                    value={formData.level_id}
                                    onChange={handleChange}
                                >
                                    {levels.map((level) => (
                                        <option key={level.id} value={level.id}>
                                            {level.name}
                                        </option>
                                    ))}
                                </select>
                            </FormControl>
                        </Grid>
                    </>
                );
            case 1:
                return (
                    <>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth margin="normal" required>
                                <label>Syllabus</label>
                                <select
                                 style={{height:'50px'}}
                                    name="syllabus_id"
                                    value={formData.syllabus_id}
                                    onChange={handleChange}
                                >
                                    {syllabi.map((syllabus) => (
                                        <option key={syllabus.id} value={syllabus.id}>
                                            {syllabus.sylubus_name}
                                        </option>
                                    ))}
                                </select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Amount"
                                name="amount"
                                value={formData.amount}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Payment Type"
                                name="payment_type"
                                value={formData.payment_type}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Provider"
                                name="provider"
                                value={formData.provider}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                                required
                            />
                        </Grid>
                    </>
                );
            case 2:
                return (
                    <>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Duration"
                                name="duration"
                                value={formData.duration}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Start Date"
                                name="start_date"
                                type="date"
                                value={formData.start_date}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                                InputLabelProps={{ shrink: true }}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="End Date"
                                name="end_date"
                                type="date"
                                value={formData.end_date}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                                InputLabelProps={{ shrink: true }}
                                required
                            />
                        </Grid>
                    </>
                );
            case 3:
                return (
                    <>
                        <Grid item xs={12}>
                            <FormControl fullWidth margin="normal" required>
                                <label>Teacher</label>
                                <select
                                 style={{height:'50px'}}
                                    name="teacher_id"
                                    value={formData.teacher_id}
                                    onChange={handleChange}
                                >
                                    {teachers.map((teacher) => (
                                        <option key={teacher.id} value={teacher.id}>
                                            {teacher.name}
                                        </option>
                                    ))}
                                </select>
                            </FormControl>
                        </Grid>
                    </>
                );
            default:
                return null;
        }
    };

    // Handle change for pagination
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Container>
            {loading && <CircularProgress />}
            <Card sx={{ maxWidth: 800, margin: 'auto', padding: 2 }}>
                <CardContent>
                    <Typography variant="h6"
                        sx={{
                            flexGrow: 1,
                            background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            fontWeight: 'bold',
                            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                            padding: '10px 0'
                        }}
                        component="div" gutterBottom>
                        {isEdit ? 'Edit Class' : 'Select New Class'}
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            {renderStep()}
                            <Grid item xs={12}>
                                {step > 0 && (
                                    <Button onClick={prevStep} variant="contained" color="primary" style={{ marginRight: '10px' }}>
                                        Previous
                                    </Button>
                                )}
                                {step < 3 && (
                                    <Button onClick={nextStep} variant="contained" color="primary" disabled={!validateForm()}>
                                        Next
                                    </Button>
                                )}
                                {step === 3 && (
                                    <Button type="submit" variant="contained" color="primary" disabled={!validateForm()}>
                                        {isEdit ? 'Update Class' : 'Add Class'}
                                    </Button>
                                )}
                            </Grid>
                        </Grid>
                    </form>
                </CardContent>
            </Card>
            <TableContainer component={Paper} style={{ marginTop: '20px' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>S/N</TableCell>
                            <TableCell>Class Type</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Level</TableCell>
                            <TableCell>Syllabus</TableCell>
                            <TableCell>Amount</TableCell>
                            <TableCell>Payment Type</TableCell>
                            <TableCell>Provider</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Duration</TableCell>
                            <TableCell>Start Date</TableCell>
                            <TableCell>End Date</TableCell>
                            <TableCell>Teacher</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {classes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((cls, index) => (
                            <TableRow key={cls.id}>
                                <TableCell>{index + 1 + page * rowsPerPage}</TableCell>
                                <TableCell>{cls.class_type}</TableCell>
                                <TableCell>{categories.find(category => category.id === cls.id)?.category_name}</TableCell>
                                <TableCell>{levels.find(level => level.id === cls.id)?.name}</TableCell>
                                <TableCell>{syllabi.find(syllabus => syllabus.id === cls.syllabus_id)?.sylubus_name}</TableCell>
                                <TableCell>{cls.amount}</TableCell>
                                <TableCell>{cls.payment_type}</TableCell>
                                <TableCell>{cls.provider}</TableCell>
                                <TableCell>{cls.phone}</TableCell>
                                <TableCell>{cls.duration}</TableCell>
                                <TableCell>{cls.start_date}</TableCell>
                                <TableCell>{cls.end_date}</TableCell>
                                <TableCell>{teachers.find(teacher => teacher.id === cls.auth_id)?.name}</TableCell>
                                <TableCell>
                                    <Button onClick={() => handleEdit(cls)}>Edit</Button>
                                    <Button onClick={() => handleDelete(cls.id)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TablePagination
                        rowsPerPageOptions={[3, 9, 27]}
                        component="div"
                        count={classes.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Table>
            </TableContainer>
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
            >
                <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default Class;

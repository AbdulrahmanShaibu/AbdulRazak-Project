import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
    Button, TextField, Select, MenuItem, FormControl, InputLabel, Container, Grid,
    CardContent, Typography, Card
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
        category_id: '',
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

    useEffect(() => {
        const fetchData = async () => {
            const [classData, categoryData, teacherData, levelData, syllabusData] = await Promise.all([
                axios.get('/api/classes'),
                axios.get('/api/categories'),
                axios.get('/api/teachers'),
                axios.get('/api/levels'),
                axios.get('/api/syllabi')
            ]);

            setClasses(classData.data);
            setCategories(categoryData.data);
            setTeachers(teacherData.data);
            setLevels(levelData.data);
            setSyllabi(syllabusData.data);
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
        if (isEdit) {
            await axios.put(`/api/classes/${editId}`, formData);
            setIsEdit(false);
            setEditId(null);
        } else {
            await axios.post('/api/classes', formData);
        }
        const classData = await axios.get('/api/classes');
        setClasses(classData.data);
        setFormData({
            auth_id: '',
            class_type: '',
            category_id: '',
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
    };

    const handleEdit = (cls) => {
        setFormData(cls);
        setIsEdit(true);
        setEditId(cls.id);
        setStep(0);
    };

    const handleDelete = async (id) => {
        await axios.delete(`/api/classes/${id}`);
        const classData = await axios.get('/api/classes');
        setClasses(classData.data);
    };

    const nextStep = () => {
        setStep((prevStep) => Math.min(prevStep + 1, 3));
    };

    const prevStep = () => {
        setStep((prevStep) => Math.max(prevStep - 1, 0));
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
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth margin="normal">
                                <InputLabel>Category</InputLabel>
                                <Select
                                    name="category_id"
                                    value={formData.category_id}
                                    onChange={handleChange}
                                >
                                    {categories.map((category) => (
                                        <MenuItem key={category.id} value={category.id}>
                                            {category.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth margin="normal">
                                <InputLabel>Level</InputLabel>
                                <Select
                                    name="level_id"
                                    value={formData.level_id}
                                    onChange={handleChange}
                                >
                                    {levels.map((level) => (
                                        <MenuItem key={level.id} value={level.id}>
                                            {level.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    </>
                );
            case 1:
                return (
                    <>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth margin="normal">
                                <InputLabel>Syllabus</InputLabel>
                                <Select
                                    name="syllabus_id"
                                    value={formData.syllabus_id}
                                    onChange={handleChange}
                                >
                                    {syllabi.map((syllabus) => (
                                        <MenuItem key={syllabus.id} value={syllabus.id}>
                                            {syllabus.name}
                                        </MenuItem>
                                    ))}
                                </Select>
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
                            />
                        </Grid>
                    </>
                );
            case 3:
                return (
                    <>
                        <Grid item xs={12}>
                            <FormControl fullWidth margin="normal">
                                <InputLabel>Teacher</InputLabel>
                                <Select
                                    name="teacher_id"
                                    value={formData.teacher_id}
                                    onChange={handleChange}
                                >
                                    {teachers.map((teacher) => (
                                        <MenuItem key={teacher.id} value={teacher.id}>
                                            {teacher.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <Container>
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
                                    <Button onClick={nextStep} variant="contained" color="primary">
                                        Next
                                    </Button>
                                )}
                                {step === 3 && (
                                    <Button type="submit" variant="contained" color="primary">
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
                            <TableCell>ID</TableCell>
                            <TableCell>Auth ID</TableCell>
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
                        {classes.map((cls) => (
                            <TableRow key={cls.id}>
                                <TableCell>{cls.id}</TableCell>
                                <TableCell>{cls.auth_id}</TableCell>
                                <TableCell>{cls.class_type}</TableCell>
                                <TableCell>{categories.find(category => category.id === cls.category_id)?.name}</TableCell>
                                <TableCell>{levels.find(level => level.id === cls.level_id)?.name}</TableCell>
                                <TableCell>{syllabi.find(syllabus => syllabus.id === cls.syllabus_id)?.name}</TableCell>
                                <TableCell>{cls.amount}</TableCell>
                                <TableCell>{cls.payment_type}</TableCell>
                                <TableCell>{cls.provider}</TableCell>
                                <TableCell>{cls.phone}</TableCell>
                                <TableCell>{cls.duration}</TableCell>
                                <TableCell>{cls.start_date}</TableCell>
                                <TableCell>{cls.end_date}</TableCell>
                                <TableCell>{teachers.find(teacher => teacher.id === cls.teacher_id)?.name}</TableCell>
                                <TableCell>
                                    <Button onClick={() => handleEdit(cls)}>Edit</Button>
                                    <Button onClick={() => handleDelete(cls.id)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default Class;

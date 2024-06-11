import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    Container,
    Typography,
    List,
    ListItem,
    ListItemText,
    TextField,
    Button,
    Box,
    Paper,
    IconButton,
    Stack,
    Divider,
    Snackbar,
    Alert,
    CssBaseline,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow
} from '@mui/material';

const Level = ({ categoryId }) => {
    const [levels, setLevels] = useState([]);
    const [newLevelName, setNewLevelName] = useState("");
    const [editingLevelId, setEditingLevelId] = useState(null);
    const [feedbackMessage, setFeedbackMessage] = useState("");
    const [feedbackSeverity, setFeedbackSeverity] = useState("success");

    useEffect(() => {
        fetchLevels();
    }, [categoryId]);

    const fetchLevels = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/level/all_levels`);
            setLevels(response.data);
        } catch (error) {
            handleFetchError(error);
        }
    };

    const handleFetchError = (error) => {
        setFeedbackMessage("Error fetching levels: " + error.message);
        setFeedbackSeverity("error");
        console.error("Error fetching levels:", error);
    };

    const handleAddLevel = async () => {
        if (!newLevelName.trim()) {
            setFeedbackMessage("Level name cannot be empty");
            setFeedbackSeverity("warning");
            return;
        }

        try {
            const newLevel = { name: newLevelName }; //{id: categoryId } Include category id if required by the server
            await axios.post("http://127.0.0.1:8000/api/level/add_level/", newLevel);
            fetchLevels();
            setNewLevelName("");
            setFeedbackMessage("Level added successfully");
            setFeedbackSeverity("success");
        } catch (error) {
            setFeedbackMessage("Error adding level: " + error.message);
            setFeedbackSeverity("error");
        }
    };

    const handleDeleteLevel = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/level/delete_level/${id}`);
            fetchLevels();
            setFeedbackMessage("Level deleted successfully");
            setFeedbackSeverity("success");
        } catch (error) {
            setFeedbackMessage("Error deleting level: " + error.message);
            setFeedbackSeverity("error");
        }
    };

    const handleEditLevel = async () => {
        if (!newLevelName.trim()) {
            setFeedbackMessage("Level name cannot be empty");
            setFeedbackSeverity("warning");
            return;
        }

        try {
            const updatedLevel = { name: newLevelName }; //{id: categoryId } Include category id if required by the server
            await axios.put(`http://127.0.0.1:8000/api/level/update_level/${editingLevelId}`, updatedLevel);
            fetchLevels();
            setNewLevelName("");
            setEditingLevelId(null);
            setFeedbackMessage("Level updated successfully");
            setFeedbackSeverity("success");
        } catch (error) {
            setFeedbackMessage("Error updating level: " + error.message);
            setFeedbackSeverity("error");
        }
    };

    const startEditing = (level) => {
        setEditingLevelId(level.id); // Use id from backend
        setNewLevelName(level.name);
    };

    const handleCloseSnackbar = () => {
        setFeedbackMessage("");
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <CssBaseline />
            <Container component="main" sx={{ p: 3, margin: 'auto' }}>
                <Paper sx={{ p: 3, mb: 3 }} >
                    <Typography variant="h5" gutterBottom>
                        {editingLevelId ? "Edit Level" : "Add New Level"}
                    </Typography>
                    <Box component="form" noValidate autoComplete="off">
                        <Stack spacing={2} direction="row" sx={{ mb: 2 }}>
                            <TextField
                                label="Level Name"
                                fullWidth
                                variant="outlined"
                                value={newLevelName}
                                onChange={(e) => setNewLevelName(e.target.value)}
                                error={!newLevelName.trim()}
                                helperText={!newLevelName.trim() ? "Level name cannot be empty" : ""}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                style={{ height: '50px' }}
                                onClick={editingLevelId ? handleEditLevel : handleAddLevel}
                            >
                                {editingLevelId ? "Update Level" : "Add"}
                            </Button>
                        </Stack>
                    </Box>
                </Paper>
                <Paper sx={{ p: 3, boxShadow: 3, borderRadius: 2, bgcolor: '#ffffff', margin: 'auto' }}>
                    <Typography variant="h6" gutterBottom>
                        Levels
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Level Name</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Edit Level</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Romove Level</TableCell>
                                    {/* <TableCell align="center" sx={{ fontWeight: 'bold' }}>Actions</TableCell> */}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {levels.map((level) => (
                                    <TableRow key={level.id} hover>
                                        <TableCell component="th" scope="row">
                                            {level.name}
                                        </TableCell>
                                        <TableCell>
                                            <IconButton
                                                aria-label="edit"
                                                onClick={() => startEditing(level)}
                                                sx={{ ml: 1, color: '#1976d2' }}
                                            >
                                                <EditIcon />
                                                <div style={{ fontSize: 'small' }}>Update</div>
                                            </IconButton>
                                        </TableCell>
                                        <TableCell>
                                            <IconButton
                                                aria-label="delete"
                                                onClick={() => handleDeleteLevel(level.id)}
                                                sx={{ ml: 1, color: '#f44336' }}
                                            >
                                                <DeleteIcon />
                                                <div style={{ fontSize: 'small' }}>Delete</div>
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>

                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Container>
            <Snackbar open={!!feedbackMessage} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert severity={feedbackSeverity} onClose={handleCloseSnackbar}>
                    {feedbackMessage}
                </Alert>
            </Snackbar>
        </Box>

    );
};

export default Level;

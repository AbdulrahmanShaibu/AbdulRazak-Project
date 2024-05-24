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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const Level = () => {
    const [levels, setLevels] = useState([]);
    const [newLevelName, setNewLevelName] = useState("");
    const [newLevelDescription, setNewLevelDescription] = useState("");
    const [editingLevelId, setEditingLevelId] = useState(null);

    useEffect(() => {
        fetchLevels();
    }, []);

    const fetchLevels = async () => {
        try {
            const response = await axios.get("/api/list/level");
            setLevels(response.data);
        } catch (error) {
            console.error("Error fetching levels:", error);
        }
    };

    const handleAddLevel = async () => {
        try {
            const newLevel = { level_name: newLevelName, description: newLevelDescription };
            await axios.post("/api/add/level", newLevel);
            fetchLevels();
            setNewLevelName("");
            setNewLevelDescription("");
        } catch (error) {
            console.error("Error adding level:", error);
        }
    };

    const handleDeleteLevel = async (id) => {
        try {
            await axios.delete(`/api/delete/level/${id}`);
            fetchLevels();
        } catch (error) {
            console.error("Error deleting level:", error);
        }
    };

    const handleEditLevel = async () => {
        try {
            const updatedLevel = { level_name: newLevelName, description: newLevelDescription };
            await axios.put(`/api/update/level/${editingLevelId}`, updatedLevel);
            fetchLevels();
            setNewLevelName("");
            setNewLevelDescription("");
            setEditingLevelId(null);
        } catch (error) {
            console.error("Error updating level:", error);
        }
    };

    const startEditing = (level) => {
        setEditingLevelId(level.id);
        setNewLevelName(level.level_name);
        setNewLevelDescription(level.description);
    };

    return (
        <Container>
            <Paper elevation={3} style={{ padding: 20, marginBottom: 20 }}>
                <Typography variant="h5" gutterBottom>
                    Levels
                </Typography>
                <List>
                    {levels.map((level) => (
                        <ListItem key={level.id} divider>
                            <ListItemText
                                primary={level.level_name}
                                secondary={level.description}
                            />
                            <IconButton edge="end" aria-label="edit" onClick={() => startEditing(level)}>
                                <EditIcon />
                            </IconButton>
                            <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteLevel(level.id)}>
                                <DeleteIcon />
                            </IconButton>
                        </ListItem>
                    ))}
                </List>
            </Paper>
            <Paper elevation={3} style={{ padding: 20 }}>
                <Typography variant="h5" gutterBottom>
                    {editingLevelId ? "Edit Level" : "Add New Level"}
                </Typography>
                <Box component="form" noValidate autoComplete="off">
                    <TextField
                        label="Level Name"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={newLevelName}
                        onChange={(e) => setNewLevelName(e.target.value)}
                    />
                    <TextField
                        label="Description"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        multiline
                        rows={4}
                        value={newLevelDescription}
                        onChange={(e) => setNewLevelDescription(e.target.value)}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={editingLevelId ? handleEditLevel : handleAddLevel}
                        style={{ marginTop: 20 }}
                    >
                        {editingLevelId ? "Update Level" : "Add Level"}
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default Level;

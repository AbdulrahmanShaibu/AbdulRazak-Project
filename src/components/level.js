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
    AppBar,
    Toolbar,
    CssBaseline,
    Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const Level = () => {
    const [levels, setLevels] = useState([]);
    const [newLevelName, setNewLevelName] = useState("");
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
            const newLevel = { level_name: newLevelName };
            await axios.post("/api/add/level", newLevel);
            fetchLevels();
            setNewLevelName("");
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
            const updatedLevel = { level_name: newLevelName };
            await axios.put(`/api/update/level/${editingLevelId}`, updatedLevel);
            fetchLevels();
            setNewLevelName("");
            setEditingLevelId(null);
        } catch (error) {
            console.error("Error updating level:", error);
        }
    };

    const startEditing = (level) => {
        setEditingLevelId(level.id);
        setNewLevelName(level.level_name);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography
                variant="h6"
                component="div"
                sx={{
                    flexGrow: 1,
                    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontWeight: 'bold',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                    padding: '10px 0'
                }}>
                Level Management
            </Typography>

            <Container component="main" style={{marginLeft:'-25px'}}>
                <Paper sx={{ p: 3, mb: 3 }}>
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
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={editingLevelId ? handleEditLevel : handleAddLevel}
                            >
                                {editingLevelId ? "Update Level" : "Add"}
                            </Button>
                        </Stack>
                    </Box>
                </Paper>
                <Paper sx={{ p: 3 }}>
                    <Typography variant="h5" gutterBottom>
                        Levels
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    <List>
                        {levels.map((level) => (
                            <ListItem key={level.id} divider secondaryAction={
                                <>
                                    <IconButton edge="end" aria-label="edit" onClick={() => startEditing(level)} sx={{ ml: 1 }}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteLevel(level.id)} sx={{ ml: 1 }}>
                                        <DeleteIcon />
                                    </IconButton>
                                </>
                            }>
                                <ListItemText primary={level.level_name} />
                            </ListItem>
                        ))}
                    </List>
                </Paper>
            </Container>
            {/* <Box component="footer" sx={{ p: 2, mt: 'auto', backgroundColor: 'primary.main', color: 'white' }}>
                <Container maxWidth="sm">
                    <Typography variant="body1" align="center">
                        Level Management System © 2024
                    </Typography>
                </Container>
            </Box> */}
        </Box>
    );
};

export default Level;

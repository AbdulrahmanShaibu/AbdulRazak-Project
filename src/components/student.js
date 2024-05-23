import React, { useState } from 'react';
import {
  Typography,
  Container,
  Paper,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const Student = () => {
  const [students, setStudents] = useState([
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
  ]);
  const [name, setName] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);

  const handleAddStudent = () => {
    setStudents([...students, { id: Date.now(), name }]);
    setName('');
  };

  const handleDeleteStudent = (id) => {
    setStudents(students.filter((student) => student.id !== id));
  };

  const handleEditStudent = (student) => {
    setEditMode(true);
    setCurrentStudent(student);
    setName(student.name);
  };

  const handleUpdateStudent = () => {
    setStudents(
      students.map((student) =>
        student.id === currentStudent.id ? { ...student, name } : student
      )
    );
    setEditMode(false);
    setCurrentStudent(null);
    setName('');
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Student Management
      </Typography>
      <Paper style={{ padding: 16 }}>
        <Typography variant="h6">Add Student</Typography>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
        />
        {editMode ? (
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpdateStudent}
          >
            Update Student
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddStudent}
          >
            Add Student
          </Button>
        )}
      </Paper>
      <List>
        {students.map((student) => (
          <ListItem key={student.id}>
            <ListItemText primary={student.name} />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="edit"
                onClick={() => handleEditStudent(student)}
              >
                <Edit />
              </IconButton>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleDeleteStudent(student.id)}
              >
                <Delete />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Student;

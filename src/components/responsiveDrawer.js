import React, { useState } from 'react';
import {
    Toolbar, Divider, List, ListItemButton,
    ListItemIcon, ListItemText, Typography,
    Tooltip, Collapse
} from "@mui/material";
import { Link } from "react-router-dom";
import {
    Help, Payment, Person2Outlined, Work, Edit, ExpandLess, ExpandMore
} from "@mui/icons-material";
import {
    Category as CategoryIcon, MenuBook as MenuBookIcon,
    School as SchoolIcon, Person as PersonIcon,
    Payment as PaymentIcon, Language as LanguageIcon,
    AccountCircle as AccountCircleIcon, ShoppingCart as ShoppingCartIcon
} from '@mui/icons-material';


const ResponsiveDrawer = () => {
    const [openManagement, setOpenManagement] = useState({
        system: false,
        student: false,
        teacher: false,
        payment: false,
        website: false,
        user: false
    });

    const handleToggle = (section) => {
        setOpenManagement(prevState => ({
            ...prevState,
            [section]: !prevState[section]
        }));
    };

    return (
        <div className="bg-gradient-dark" style={{ backgroundColor: "#1E2A38", height: "100%", padding: "5px 5px" }}>
            <Divider sx={{ backgroundColor: "#444" }} />
            <Typography
                sx={{
                    textAlign: "center",
                    pt: 4,
                    color: "#00C853",
                    fontSize: 24,
                    fontWeight: 'bold',
                }}
            >
                {/* <img
                    src='https://media.istockphoto.com/id/1154631974/photo/graduation-cap-and-diploma-on-table-with-books.jpg?s=2048x2048&w=is&k=20&c=1C9-6bc6uA6VslWhoJ3Rk358ThWeIpNJb1pVTpr4NDc='
                    alt="Graduation cap and diploma"
                    style={{ width: "100%", height: "auto", borderRadius: 10, marginTop: '-30px' }}
                /> */}
            </Typography>
            <List sx={{ backgroundColor: "#1E2A38", marginTop: "20px" }}>
                <Tooltip title="How to write" placement="right">
                    <ListItemButton component={Link} to="/how-to-write" sx={{ color: "white" }}>
                        <ListItemIcon sx={{ color: "white" }}>
                            <Help />
                        </ListItemIcon>
                        <ListItemText primary="How to write" />
                    </ListItemButton>
                </Tooltip>

                <ListItemButton onClick={() => handleToggle('system')} sx={{ color: "white" }}>
                    <ListItemIcon sx={{ color: "white" }}>
                        <CategoryIcon />
                    </ListItemIcon>
                    <ListItemText primary="System Management" />
                    {openManagement.system ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openManagement.system} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton component={Link} to="/category" sx={{ pl: 4, color: "white" }}>
                            <ListItemIcon sx={{ color: "white" }}>
                                <CategoryIcon />
                            </ListItemIcon>
                            <ListItemText primary="Category" />
                        </ListItemButton>
                        <ListItemButton component={Link} to="/syllabus" sx={{ pl: 4, color: "white" }}>
                            <ListItemIcon sx={{ color: "white" }}>
                                <MenuBookIcon />
                            </ListItemIcon>
                            <ListItemText primary="Syllabus" />
                        </ListItemButton>
                        <ListItemButton component={Link} to="/level" sx={{ pl: 4, color: "white" }}>
                            <ListItemIcon sx={{ color: "white" }}>
                                <MenuBookIcon />
                            </ListItemIcon>
                            <ListItemText primary="Level" />
                        </ListItemButton>
                    </List>
                </Collapse>

                {/* Repeat similar structure for other sections */}
                <ListItemButton onClick={() => handleToggle('student')} sx={{ color: "white" }}>
                    <ListItemIcon sx={{ color: "white" }}>
                        <PersonIcon />
                    </ListItemIcon>
                    <ListItemText primary="Student" />
                    {openManagement.student ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openManagement.student} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton component={Link} to="/student" sx={{ pl: 4, color: "white" }}>
                            <ListItemIcon sx={{ color: "white" }}>
                                <PersonIcon />
                            </ListItemIcon>
                            <ListItemText primary="Menu One" />
                        </ListItemButton>
                        <ListItemButton component={Link} to="/student" sx={{ pl: 4, color: "white" }}>
                            <ListItemIcon sx={{ color: "white" }}>
                                <SchoolIcon />
                            </ListItemIcon>
                            <ListItemText primary="Menu Two" />
                        </ListItemButton>
                    </List>
                </Collapse>

                <ListItemButton onClick={() => handleToggle('teacher')} sx={{ color: "white" }}>
                    <ListItemIcon sx={{ color: "white" }}>
                        <Person2Outlined />
                    </ListItemIcon>
                    <ListItemText primary="Teacher" />
                    {openManagement.teacher ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openManagement.teacher} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton component={Link} to="/teacher" sx={{ pl: 4, color: "white" }}>
                            <ListItemIcon sx={{ color: "white" }}>
                                <Person2Outlined />
                            </ListItemIcon>
                            <ListItemText primary="Menu One" />
                        </ListItemButton>
                        <ListItemButton component={Link} to="/teacher" sx={{ pl: 4, color: "white" }}>
                            <ListItemIcon sx={{ color: "white" }}>
                                <Person2Outlined />
                            </ListItemIcon>
                            <ListItemText primary="Menu Two" />
                        </ListItemButton>
                    </List>
                </Collapse>

                <ListItemButton onClick={() => handleToggle('payment')} sx={{ color: "white" }}>
                    <ListItemIcon sx={{ color: "white" }}>
                        <PaymentIcon />
                    </ListItemIcon>
                    <ListItemText primary="Payment" />
                    {openManagement.payment ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openManagement.payment} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton component={Link} to="/payment" sx={{ pl: 4, color: "white" }}>
                            <ListItemIcon sx={{ color: "white" }}>
                                <ShoppingCartIcon />
                            </ListItemIcon>
                            <ListItemText primary="Menu One" />
                        </ListItemButton>
                        <ListItemButton component={Link} to="/payment" sx={{ pl: 4, color: "white" }}>
                            <ListItemIcon sx={{ color: "white" }}>
                                <Payment />
                            </ListItemIcon>
                            <ListItemText primary="Menu Two" />
                        </ListItemButton>
                    </List>
                </Collapse>

                <ListItemButton onClick={() => handleToggle('website')} sx={{ color: "white" }}>
                    <ListItemIcon sx={{ color: "white" }}>
                        <LanguageIcon />
                    </ListItemIcon>
                    <ListItemText primary="Website" />
                    {openManagement.website ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openManagement.website} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton component={Link} to="/website" sx={{ pl: 4, color: "white" }}>
                            <ListItemIcon sx={{ color: "white" }}>
                                <LanguageIcon />
                            </ListItemIcon>
                            <ListItemText primary="Menu One" />
                        </ListItemButton>
                    </List>
                    <List component="div" disablePadding>
                        <ListItemButton component={Link} to="/website/view" sx={{ pl: 4, color: "white" }}>
                            <ListItemIcon sx={{ color: "white" }}>
                                <LanguageIcon />
                            </ListItemIcon>
                            <ListItemText primary="Menu One" />
                        </ListItemButton>
                    </List>
                </Collapse>

                <ListItemButton onClick={() => handleToggle('user')} sx={{ color: "white" }}>
                    <ListItemIcon sx={{ color: "white" }}>
                        <AccountCircleIcon />
                    </ListItemIcon>
                    <ListItemText primary="User" />
                    {openManagement.user ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openManagement.user} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton component={Link} to="/user" sx={{ pl: 4, color: "white" }}>
                            <ListItemIcon sx={{ color: "white" }}>
                                <AccountCircleIcon />
                            </ListItemIcon>
                            <ListItemText primary="Menu One" />
                        </ListItemButton>
                        <ListItemButton component={Link} to="/user" sx={{ pl: 4, color: "white" }}>
                            <ListItemIcon sx={{ color: "white" }}>
                                <PersonIcon />
                            </ListItemIcon>
                            <ListItemText primary="Menu Two" />
                        </ListItemButton>
                    </List>
                </Collapse>
            </List>
            <Divider sx={{ margin: "10px 0" }} />
            <List>
                <Tooltip title="Suggest" placement="right">
                    <ListItemButton component={Link} to="/suggest" sx={{ color: "white" }}>
                        <ListItemIcon sx={{ color: "white" }}>
                            <Edit />
                        </ListItemIcon>
                        <ListItemText primary="Suggest" />
                    </ListItemButton>
                </Tooltip>
                <Tooltip title="Work with us" placement="right">
                    <ListItemButton component={Link} to="/work-with-us" sx={{ color: "white" }}>
                        <ListItemIcon sx={{ color: "white" }}>
                            <Work />
                        </ListItemIcon>
                        <ListItemText primary="Work with us" />
                    </ListItemButton>
                </Tooltip>
            </List>
            <Typography
                component={Link}
                to="/sign-in"
                sx={{
                    display: 'block',
                    textAlign: "center",
                    backgroundColor: "#007BFF",
                    color: "white",
                    borderRadius: 5,
                    padding: 1,
                    margin: "20px auto",
                    textDecoration: 'none',
                    width: '80%',
                    fontSize: 16,
                    fontWeight: 'bold',
                    transition: 'background-color 0.3s',
                    '&:hover': {
                        backgroundColor: '#0056b3'
                    }
                }}
            >
                Sign In
            </Typography>
        </div>
    );
};

export default ResponsiveDrawer;

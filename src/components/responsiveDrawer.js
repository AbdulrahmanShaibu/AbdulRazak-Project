import React, { useState } from 'react';
import {
    Toolbar, Divider, List, ListItemButton,
    ListItemIcon, ListItemText, Typography,
    Tooltip, Collapse
} from "@mui/material";
import { Link } from "react-router-dom";
import {
    Category as CategoryIcon, MenuBook as MenuBookIcon,
    School as SchoolIcon, Person as PersonIcon,
    Payment as PaymentIcon, Language as LanguageIcon,
    AccountCircle as AccountCircleIcon, ShoppingCart as ShoppingCartIcon,
    Star as StarIcon, RateReview as RateReviewIcon,
    Receipt as ReceiptIcon, Class as ClassIcon,
    Edit as EditIcon, Work as WorkIcon, Menu as MenuIcon,
    ExpandLess, ExpandMore, Person2Outlined,
    Forum,
    Assignment,
    AppRegistration,
    Topic,
    VideoFile,
    VideoCall,
    VideoCameraBack
} from "@mui/icons-material";
import { CgProfile, CgUserList } from 'react-icons/cg';
import { BiRegistered, BiUserCircle } from 'react-icons/bi';
import { ClassNames } from '@emotion/react';
import { GiClassicalKnowledge } from 'react-icons/gi';
import { GrStatusInfo } from 'react-icons/gr';

const drawerWidth = 280;

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
        <div className="bg-gradient-dark" style={{ backgroundColor: "#20232a", height: "100%", padding: "10px 20px" }}>
            {/* <Typography
                variant="h6"
                sx={{
                    textAlign: "center",
                    pt: 4,
                    color: "#61dafb",
                    fontSize: 22,
                    fontWeight: 'bold',
                }}
            > */}
            <img src='https://images.pexels.com/photos/2781814/pexels-photo-2781814.jpeg?auto=compress&cs=tinysrgb&w=600'
                style={{ width: '100%', borderRadius: '5%' }}
            ></img>
            {/* </Typography> */}
            <List sx={{ backgroundColor: "#20232a", marginTop: "20px" }}>
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
                                <Assignment />
                            </ListItemIcon>
                            <ListItemText primary="Level" />
                        </ListItemButton>
                    </List>
                </Collapse>

                <ListItemButton onClick={() => handleToggle('student')} sx={{ color: "white" }}>
                    <ListItemIcon sx={{ color: "white" }}>
                        <SchoolIcon />
                    </ListItemIcon>
                    <ListItemText primary="Student Management" />
                    {openManagement.student ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openManagement.student} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton component={Link} to="/class" sx={{ pl: 4, color: "white" }}>
                            <ListItemIcon sx={{ color: "white" }}>
                                <SchoolIcon />
                            </ListItemIcon>
                            <ListItemText primary="My Class" />
                        </ListItemButton>
                        <ListItemButton component={Link} to="/view_teachers" sx={{ pl: 4, color: "white" }}>
                            <ListItemIcon sx={{ color: "white" }}>
                                <PersonIcon />
                            </ListItemIcon>
                            <ListItemText primary="Find Teachers" />
                        </ListItemButton>
                        <ListItemButton component={Link} to="/view_subjects" sx={{ pl: 4, color: "white" }}>
                            <ListItemIcon sx={{ color: "white" }}>
                                <MenuBookIcon />
                            </ListItemIcon>
                            <ListItemText primary="My Subjects" />
                        </ListItemButton>
                        <ListItemButton component={Link} to="/view_notes" sx={{ pl: 4, color: "white" }}>
                            <ListItemIcon sx={{ color: "white" }}>
                                <EditIcon />
                            </ListItemIcon>
                            <ListItemText primary="View Notes" />
                        </ListItemButton>
                        <ListItemButton component={Link} to="/view_payment" sx={{ pl: 4, color: "white" }}>
                            <ListItemIcon sx={{ color: "white" }}>
                                <PaymentIcon />
                            </ListItemIcon>
                            <ListItemText primary="Payment" />
                        </ListItemButton>
                    </List>
                </Collapse>

                <ListItemButton onClick={() => handleToggle('teacher')} sx={{ color: "white" }}>
                    <ListItemIcon sx={{ color: "white" }}>
                        <Person2Outlined />
                    </ListItemIcon>
                    <ListItemText primary="Teacher Management" />
                    {openManagement.teacher ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openManagement.teacher} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton component={Link} to="/teacher/profile" sx={{ pl: 4, color: "white" }}>
                            <ListItemIcon sx={{ color: "white" }}>
                                <CgProfile />
                            </ListItemIcon>
                            <ListItemText primary="Profile" />
                        </ListItemButton>
                        <ListItemButton component={Link} to="/teacher/class-registration" sx={{ pl: 4, color: "white" }}>
                            <ListItemIcon sx={{ color: "white" }}>
                                <AppRegistration />
                            </ListItemIcon>
                            <ListItemText primary="Class Registration" />
                        </ListItemButton>
                        <ListItemButton component={Link} to="/teacher/classes" sx={{ pl: 4, color: "white" }}>
                            <ListItemIcon sx={{ color: "white" }}>
                                <GiClassicalKnowledge />
                            </ListItemIcon>
                            <ListItemText primary="Class Invitation" />
                        </ListItemButton>
                        <ListItemButton component={Link} to="/teacher/class-status" sx={{ pl: 4, color: "white" }}>
                            <ListItemIcon sx={{ color: "white" }}>
                                <GrStatusInfo />
                            </ListItemIcon>
                            <ListItemText primary="Class Status" />
                        </ListItemButton>
                        <ListItemButton component={Link} to="/teacher/course-outline" sx={{ pl: 4, color: "white" }}>
                            <ListItemIcon sx={{ color: "white" }}>
                                <MenuBookIcon />
                            </ListItemIcon>
                            <ListItemText primary="Course Outline" />
                        </ListItemButton>
                        <ListItemButton component={Link} to="/teacher/notes" sx={{ pl: 4, color: "white" }}>
                            <ListItemIcon sx={{ color: "white" }}>
                                <EditIcon />
                            </ListItemIcon>
                            <ListItemText primary="Notes" />
                        </ListItemButton>
                        <ListItemButton component={Link} to="/teacher/topics" sx={{ pl: 4, color: "white" }}>
                            <ListItemIcon sx={{ color: "white" }}>
                                <Topic />
                            </ListItemIcon>
                            <ListItemText primary="Topics" />
                        </ListItemButton>
                        <ListItemButton component={Link} to="/teacher/videos" sx={{ pl: 4, color: "white" }}>
                            <ListItemIcon sx={{ color: "white" }}>
                                <VideoCameraBack />
                            </ListItemIcon>
                            <ListItemText primary="Videos" />
                        </ListItemButton>
                    </List>
                </Collapse>

                <ListItemButton onClick={() => handleToggle('payment')} sx={{ color: "white" }}>
                    <ListItemIcon sx={{ color: "white" }}>
                        <PaymentIcon />
                    </ListItemIcon>
                    <ListItemText primary="Payment Management" />
                    {openManagement.payment ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openManagement.payment} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton component={Link} to="/rate" sx={{ pl: 4, color: "white" }}>
                            <ListItemIcon sx={{ color: "white" }}>
                                <StarIcon />
                            </ListItemIcon>
                            <ListItemText primary="Rate" />
                        </ListItemButton>
                        <ListItemButton component={Link} to="/reviews" sx={{ pl: 4, color: "white" }}>
                            <ListItemIcon sx={{ color: "white" }}>
                                <RateReviewIcon />
                            </ListItemIcon>
                            <ListItemText primary="Reviews" />
                        </ListItemButton>
                        <ListItemButton component={Link} to="/payments" sx={{ pl: 4, color: "white" }}>
                            <ListItemIcon sx={{ color: "white" }}>
                                <PaymentIcon />
                            </ListItemIcon>
                            <ListItemText primary="Payments" />
                        </ListItemButton>
                        <ListItemButton component={Link} to="/payments-record" sx={{ pl: 4, color: "white" }}>
                            <ListItemIcon sx={{ color: "white" }}>
                                <ReceiptIcon />
                            </ListItemIcon>
                            <ListItemText primary="Payments Record" />
                        </ListItemButton>
                    </List>
                </Collapse>

                <ListItemButton onClick={() => handleToggle('website')} sx={{ color: "white" }}>
                    <ListItemIcon sx={{ color: "white" }}>
                        <ClassIcon />
                    </ListItemIcon>
                    <ListItemText primary="Website Management" />
                    {openManagement.website ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openManagement.website} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton component={Link} to="/azam-pesa" sx={{ pl: 4, color: "white" }}>
                            <ListItemIcon sx={{ color: "white" }}>
                                <ShoppingCartIcon />
                            </ListItemIcon>
                            <ListItemText primary="Azam Pesa" />
                        </ListItemButton>
                    </List>
                </Collapse>

                <ListItemButton onClick={() => handleToggle('user')} sx={{ color: "white" }}>
                    <ListItemIcon sx={{ color: "white" }}>
                        <AccountCircleIcon />
                    </ListItemIcon>
                    <ListItemText primary="User Management" />
                    {openManagement.user ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openManagement.user} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {/* <ListItemButton component={Link} to="/menu-one" sx={{ pl: 4, color: "white" }}>
                            <ListItemIcon sx={{ color: "white" }}>
                                <MenuIcon />
                            </ListItemIcon>
                            <ListItemText primary="Menu One" />
                        </ListItemButton>
                        <ListItemButton component={Link} to="/menu-two" sx={{ pl: 4, color: "white" }}>
                            <ListItemIcon sx={{ color: "white" }}>
                                <MenuIcon />
                            </ListItemIcon>
                            <ListItemText primary="Menu Two" />
                        </ListItemButton> */}
                        <ListItemButton component={Link} to="/user" sx={{ pl: 4, color: "white" }}>
                            <ListItemIcon sx={{ color: "white" }}>
                                <CgUserList />
                            </ListItemIcon>
                            <ListItemText primary="User" />
                        </ListItemButton>
                    </List>
                </Collapse>
            </List>

            <Divider sx={{ backgroundColor: "#444", margin: "20px 0" }} />
            <Typography
                component={Link}
                to="/sign-in"
                sx={{
                    display: 'block',
                    textAlign: "center",
                    backgroundColor: "#61dafb",
                    color: "#20232a",
                    borderRadius: 2,
                    padding: "10px 0",
                    margin: "20px auto",
                    textDecoration: 'none',
                    width: '80%',
                    fontSize: 16,
                    fontWeight: 'bold',
                    transition: 'background-color 0.3s',
                    '&:hover': {
                        backgroundColor: '#21a1f1'
                    }
                }}
            >
                Sign In
            </Typography>
        </div>
    );
};

export default ResponsiveDrawer;

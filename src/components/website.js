import React from 'react';
import { AppBar, Toolbar, Typography, Container, Box, Grid, Paper, Button } from '@mui/material';
import { styled } from '@mui/system';

const Header = () => (
    <AppBar position="static">
        <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Education Link
            </Typography>
            <Button color="inherit">Login</Button>
        </Toolbar>
    </AppBar>
);

const AdSection = styled(Paper)(({ theme }) => ({
    margin: theme.spacing(2, 0),
    padding: theme.spacing(2),
    backgroundColor: theme.palette.primary,
    color: theme.palette.primary,
    textAlign: 'center',
}));

const MainContent = () => (
    <Container>
        <Box my={4}>
            <Typography variant="h4" component="h1" gutterBottom>
                Welcome to Education Link
            </Typography>
            <Typography paragraph>
                Education Link connects various education systems including schools, centers, tuitions, and more.
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={4}>
                    <Paper elevation={3} sx={{ padding: 2, textAlign: 'center' }}>
                        <img src="https://via.placeholder.com/150" alt="Schools" style={{ width: '100%' }} />
                        <Typography variant="h6" component="h2">
                            Schools
                        </Typography>
                        <Typography paragraph>
                            Find the best schools in your area and connect with them seamlessly.
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Paper elevation={3} sx={{ padding: 2, textAlign: 'center' }}>
                        <img src="https://via.placeholder.com/150" alt="Tuition Centers" style={{ width: '100%' }} />
                        <Typography variant="h6" component="h2">
                            Tuition Centers
                        </Typography>
                        <Typography paragraph>
                            Access top tuition centers for additional support and learning.
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Paper elevation={3} sx={{ padding: 2, textAlign: 'center' }}>
                        <img src="https://via.placeholder.com/150" alt="Educational Resources" style={{ width: '100%' }} />
                        <Typography variant="h6" component="h2">
                            Educational Resources
                        </Typography>
                        <Typography paragraph>
                            Explore a wide range of educational resources to enhance your knowledge.
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
            <AdSection elevation={3}>
                <Typography variant="h6">Ad Space</Typography>
                <Typography variant="body1">
                    Place your advertisement here. Contact us for more details.
                </Typography>
            </AdSection>
        </Box>
    </Container>
);

const Footer = () => (
    <Box mt={4} py={2} bgcolor="text.secondary" color="white" textAlign="center">
        <Typography variant="body1">© 2024 Education Link. All rights reserved.</Typography>
    </Box>
);

const Website = () => (
    <div>
        <Header />
        <MainContent />
        <Footer />
    </div>
);

export default Website;

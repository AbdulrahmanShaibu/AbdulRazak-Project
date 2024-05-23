import React from 'react';
import { Card, CardHeader, CardContent, Typography, IconButton, Divider, List, ListItem, ListItemText, ListItemIcon, Tooltip } from '@mui/material';
import { Edit as EditIcon, Facebook as FacebookIcon, Twitter as TwitterIcon, Instagram as InstagramIcon } from '@mui/icons-material';

const User = () => {
  return (
    <Card variant="outlined">
      <CardHeader
        title={<Typography variant="h6">Profile Information</Typography>}
        action={
          <Tooltip title="Edit Profile">
            <IconButton>
              <EditIcon color="action" />
            </IconButton>
          </Tooltip>
        }
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary">
          Hi, I’m Alec Thompson, Decisions: If you can’t decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality).
        </Typography>
        <Divider sx={{ my: 2 }} />
        <List>
          <ListItem>
            <ListItemText primary="Full Name" secondary="Alec M. Thompson" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Mobile" secondary="(44) 123 1234 123" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Email" secondary="alecthompson@mail.com" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Location" secondary="USA" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Typography variant="body2" color="textSecondary">Social:</Typography>
            </ListItemIcon>
            <ListItemIcon>
              <IconButton href="javascript:;" color="primary">
                <FacebookIcon />
              </IconButton>
              <IconButton href="javascript:;" color="primary">
                <TwitterIcon />
              </IconButton>
              <IconButton href="javascript:;" color="primary">
                <InstagramIcon />
              </IconButton>
            </ListItemIcon>
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
};

export default User;

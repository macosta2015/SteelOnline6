import React, { useEffect, useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText, CircularProgress, Grid, Paper, IconButton, Snackbar, Alert } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function DisplayEmails({ emailRefreshTrigger }) {
  // Original code from your DisplayEmails component
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    const fetchEmails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('http://localhost:5001/emails.txt');
        if (!response.ok) {
          throw new Error('Failed to fetch emails');
        }
        const data = await response.text();
        const emailList = data.split('\n').filter(email => email.trim());
        setEmails(emailList);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchEmails();
  }, [emailRefreshTrigger]);

  const handleDelete = async (emailToDelete) => {
    try {
      const response = await fetch('http://localhost:5001/deleteEmail', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailToDelete }),
      });
      if (!response.ok) {
        throw new Error('Failed to delete email');
      }
      setEmails(emails.filter(email => email !== emailToDelete));
      setNotification({ open: true, message: 'Email deleted successfully', severity: 'success' });
    } catch (error) {
      console.error('Error deleting email:', error);
      setNotification({ open: true, message: 'Failed to delete email', severity: 'error' });
    }
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" sx={{ mt: 2, textAlign: 'center' }}>
        Error: {error}
      </Typography>
    );
  }

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item xs={12}>
        <Paper elevation={3} sx={{ p: 3, borderRadius: 2, backgroundColor: '#f9f9f9' }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', textAlign: 'center' }}>
            Emails from File
          </Typography>
          <List>
            {emails.length === 0 ? (
              <Typography sx={{ textAlign: 'center', mt: 2 }}>
                No emails available.
              </Typography>
            ) : (
              emails.map((email, index) => (
                <ListItem key={index} sx={{ backgroundColor: '#fff', mb: 1, borderRadius: 1, boxShadow: 1, '&:hover': { backgroundColor: '#f0f0f0' } }}>
                  <ListItemText primary={email} sx={{ wordBreak: 'break-all' }} />
                  <IconButton onClick={() => handleDelete(email)} color="primary" sx={{ ml: 2 }}>
                    <DeleteIcon />
                  </IconButton>
                </ListItem>
              ))
            )}
          </List>
        </Paper>
      </Grid>
      <Snackbar open={notification.open} autoHideDuration={6000} onClose={handleCloseNotification}>
        <Alert onClose={handleCloseNotification} severity={notification.severity} sx={{ width: '100%' }}>
          {notification.message}
        </Alert>
      </Snackbar>
    </Grid>
  );
}

export default DisplayEmails;

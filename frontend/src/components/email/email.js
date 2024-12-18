import React, { useState } from 'react';
import { Box, TextField, Button, Snackbar, Typography, Grid, Alert } from '@mui/material';

function EmailList({ onEmailAdded }) {
  // Original code from your EmailList component
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setError(null);
    try {
      const response = await fetch('http://localhost:5001/saveEmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (response.ok) {
        setOpenSnackbar(true);
        setEmail(''); // Clear the input
        onEmailAdded(); // Notify parent to refresh the email list
      } else {
        throw new Error('Error saving email');
      }
    } catch (error) {
      console.error(error);
      setError('Error saving email');
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item xs={12}>
        <Box sx={{ padding: 4, borderRadius: 2, boxShadow: 3, backgroundColor: '#f9f9f9' }}>
          <Typography variant="h5" align="center" gutterBottom>
            Add Email to List
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!error}
              helperText={error}
              variant="outlined"
              sx={{ mb: 2 }}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Add Email
            </Button>
          </form>
          <Snackbar
            open={openSnackbar}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          >
            <Alert onClose={handleCloseSnackbar} severity="success">
              Email added successfully!
            </Alert>
          </Snackbar>
        </Box>
      </Grid>
    </Grid>
  );
}

export default EmailList;



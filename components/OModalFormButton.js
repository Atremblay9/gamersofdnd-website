import { Modal, Box, Typography, Button, TextField, Select, MenuItem, Checkbox, FormControlLabel, FormHelperText } from '@mui/material';
import { useState } from 'react';

export default function ModalFormButton() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [checkboxError, setCheckboxError] = useState('');

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const days = Array.from(event.target.days).filter((checkbox) => checkbox.checked).map((checkbox) => checkbox.value);

    const formData = {
      name: event.target.name.value,
      format: event.target.format.value,
      days,
      experience: event.target.experience.value,
      email: event.target.email.value,
      discord: event.target.discord.value,
    };

    // Email validation: Check if the email ends with '@nait.ca'
    if (!formData.email.endsWith('@nait.ca')) {
      setEmailError('Please enter a valid NAIT email address.');
      return;
    } else {
      setEmailError('');
    }

    // Checkbox validation: Ensure at least one checkbox is selected
    if (formData.days.length === 0) {
      setCheckboxError('Please select at least one preferred day.');
      return;
    } else {
      setCheckboxError('');
    }

    // TODO: Replace with Prisma DB submission
    console.log('Form Data:', formData);

    // Close the modal after submission
    setModalOpen(false);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={() => setModalOpen(true)}>
        Request a Game
      </Button>
      <Modal open={isModalOpen} onClose={() => setModalOpen(false)} aria-labelledby="modal-title">
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            width: '400px',
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2" gutterBottom>
            Request a Game
          </Typography>
          <form onSubmit={handleFormSubmit}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              margin="normal"
              required
            />
            <Select
              fullWidth
              name="format"
              defaultValue=""
              margin="normal"
              required
              displayEmpty
            >
              <MenuItem value="" disabled>
                Select Desired Format
              </MenuItem>
              <MenuItem value="Online">Online</MenuItem>
              <MenuItem value="In-person">In-person</MenuItem>
              <MenuItem value="Hybrid">Hybrid</MenuItem>
            </Select>
            <Typography variant="subtitle1" gutterBottom>
              Preferred Days
            </Typography>
            <FormControlLabel
              control={<Checkbox name="days" value="Wednesday" />}
              label="Wednesday"
            />
            <FormControlLabel
              control={<Checkbox name="days" value="Friday" />}
              label="Friday"
            />
            {checkboxError && <FormHelperText error>{checkboxError}</FormHelperText>}
            <TextField
              fullWidth
              label="Experience"
              name="experience"
              multiline
              rows={4}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="NAIT Email"
              name="email"
              type="email"
              margin="normal"
              required
              error={!!emailError}
              helperText={emailError}
            />
            <TextField
              fullWidth
              label="Discord Username"
              name="discord"
              margin="normal"
              required
            />
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
              Submit
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

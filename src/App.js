import React from 'react';
import {
  Container, Typography, TextField, Button, FormControl, FormLabel,
  RadioGroup, FormControlLabel, Radio, FormGroup, Checkbox, Select, MenuItem, Box
} from '@mui/material';
import './App.css';

const FormRow = ({ label, children }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 2 }}>
    <FormLabel sx={labelStyle}>{label}</FormLabel>
    {children}
  </Box>
);

const inputStyle = {
  flex: 1,
  minWidth: 160,
  backgroundColor: '#f0f0f0',
  borderRadius: 1
};

const labelStyle = {
  width: 160,
  flexShrink: 0,
  fontWeight: 600
};

const submitButtonStyle = {
  backgroundColor: '#000000',
  color: '#ffffff',
  p: 1.5,
  fontSize: 16,
  borderRadius: 1,
  mt: 2,
  '&:hover': {
    backgroundColor: '#333333'
  }
};

function App() {
  return (
    <Container>
      <form className="container">
        <Typography variant="h4" gutterBottom>Patient Registration Form</Typography>
        <Typography variant="body1" gutterBottom>
          Thank you for applying to our practice. Please complete this patient registration form with your information, and a doctor will contact you shortly.
        </Typography>
        <hr />

        <FormRow label="Patient's Name*">
          <TextField label="First" name="first" required sx={inputStyle} />
          <TextField label="Last" name="last" required sx={inputStyle} />
        </FormRow>

        <FormRow label="Gender">
          <RadioGroup row name="gender">
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="female" control={<Radio />} label="Female" />
          </RadioGroup>
        </FormRow>

        <FormRow label="Phone*">
          <TextField label="### ### ###" name="phone" required sx={inputStyle} />
        </FormRow>

        <FormRow label="Date of Birth*">
          <TextField type="date" name="dob" required sx={inputStyle} InputLabelProps={{ shrink: true }} />
        </FormRow>

        <FormRow label="Marital Status*">
          <RadioGroup row name="MStatus">
            <FormControlLabel value="Single" control={<Radio />} label="Single" />
            <FormControlLabel value="Married" control={<Radio />} label="Married" />
            <FormControlLabel value="Divorced" control={<Radio />} label="Divorced" />
            <FormControlLabel value="Widow" control={<Radio />} label="Widow" />
          </RadioGroup>
        </FormRow>


        <FormRow label="Address*">
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1 }}>
            <TextField label="Street" name="street_address" required fullWidth sx={inputStyle} />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField label="City" name="city" required sx={inputStyle} />
              <TextField label="State" name="state" required sx={inputStyle} />
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField label="Postal/Zip Code" name="zip" required sx={inputStyle} />
              <TextField
                label="Country"
                name="country"
                select
                required
                sx={inputStyle}
              >
                <MenuItem value="us">United States</MenuItem>
                <MenuItem value="ca">Canada</MenuItem>
                <MenuItem value="uk">United Kingdom</MenuItem>
                <MenuItem value="au">Australia</MenuItem>
                <MenuItem value="in">India</MenuItem>
                <MenuItem value="de">Germany</MenuItem>
                <MenuItem value="fr">France</MenuItem>
                <MenuItem value="jp">Japan</MenuItem>
                <MenuItem value="cn">China</MenuItem>
              </TextField>
            </Box>
          </Box>
        </FormRow>

        <FormRow label="Insurance Name*">
          <TextField name="insurance_name" required sx={inputStyle} />
        </FormRow>

        <Box sx={{ display: 'flex', mb: 2, gap: 2 }}>
          <FormLabel sx={labelStyle}>Past Medical History*</FormLabel>
          <FormGroup sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {['Anemia', 'Asthma', 'Bronchitis', 'Chickenpox', 'Diabetes', 'Pneumonia', 'Thyroid Disease', 'Ulcer', 'Other'].map(item => (
              <FormControlLabel control={<Checkbox />} label={item} key={item} />
            ))}
          </FormGroup>
        </Box>

        <Typography variant="h6" gutterBottom>Patient/Guardian Signature*</Typography>
        <Typography variant="body1" gutterBottom>
          According to our privacy policy and federal law, your information within this patient registration form will remain private at all times.
        </Typography>

        <Button type="submit" variant="contained" fullWidth sx={submitButtonStyle}>
          REGISTER
        </Button>
      </form>
    </Container>
  );
}

export default App;

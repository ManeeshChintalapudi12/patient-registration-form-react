import React, { useState } from 'react';
import {
  Container, Typography, TextField, Button, FormControlLabel, Radio, RadioGroup,
  FormGroup, Checkbox, MenuItem, Box, FormLabel
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
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [maritalStatus, setMaritalStatus] = useState('');
  const [insurance, setInsurance] = useState('');
  const [phone, setPhone] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [country, setCountry] = useState('');
  const [medicalHistory, setMedicalHistory] = useState([]);

  const handleMedicalHistoryChange = (event) => {
    const value = event.target.value;
    setMedicalHistory((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const registerPatient = async (e) => {
    e.preventDefault();

    const patient = {
      firstName,
      lastName,
      gender,
      dateOfBirth,
      maritalStatus,
      insurance,
      phone,
      streetAddress,
      city,
      state,
      zipCode,
      country,
      medicalHistory
    };

    try {
      const response = await fetch('http://mc-patient-registration-service.azurewebsites.net/api/Patient/Register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(patient)
      });

      const data = await response.json();
      console.log('Patient registered:', data);
  
    }catch (error) {
      console.error('Error registering patient:', error);
      alert('Error registering patient!');
    }
  };

  return (
    <Container>
      <form className="container" onSubmit={registerPatient}>
        <Typography variant="h4" gutterBottom>Patient Registration Form</Typography>
        <Typography variant="body1" gutterBottom>
          Thank you for applying to our practice. Please complete this patient registration form with your information.
        </Typography>
        <hr />

        <FormRow label="Patient's Name*">
          <TextField label="First" required value={firstName} onChange={(e) => setFirstName(e.target.value)} sx={inputStyle} />
          <TextField label="Last" required value={lastName} onChange={(e) => setLastName(e.target.value)} sx={inputStyle} />
        </FormRow>

        <FormRow label="Gender">
          <RadioGroup row value={gender} onChange={(e) => {setGender(e.target.value)}}>
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="female" control={<Radio />} label="Female" />
          </RadioGroup>
        </FormRow>

        <FormRow label="Phone*">
          <TextField label="Phone" required value={phone} onChange={(e) => setPhone(e.target.value)} sx={inputStyle} />
        </FormRow>

        <FormRow label="Date of Birth*">
          <TextField type="date" required value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} sx={inputStyle} InputLabelProps={{ shrink: true }} />
        </FormRow>

        <FormRow label="Marital Status*">
          <RadioGroup row value={maritalStatus} onChange={(e) => setMaritalStatus(e.target.value)}>
            <FormControlLabel value="Single" control={<Radio />} label="Single" />
            <FormControlLabel value="Married" control={<Radio />} label="Married" />
            <FormControlLabel value="Divorced" control={<Radio />} label="Divorced" />
            <FormControlLabel value="Widow" control={<Radio />} label="Widow" />
          </RadioGroup>
        </FormRow>

        <FormRow label="Address*">
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1 }}>
            <TextField label="Street" required value={streetAddress} onChange={(e) => setStreetAddress(e.target.value)} fullWidth sx={inputStyle} />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField label="City" required value={city} onChange={(e) => setCity(e.target.value)} sx={inputStyle} />
              <TextField label="State" required value={state} onChange={(e) => setState(e.target.value)} sx={inputStyle} />
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField label="Postal/Zip Code" required value={zipCode} onChange={(e) => setZipCode(e.target.value)} sx={inputStyle} />
              <TextField
                label="Country"
                select
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                sx={inputStyle}
              >
                {['us', 'ca', 'uk', 'au', 'in', 'de', 'fr', 'jp', 'cn'].map((code) => (
                  <MenuItem key={code} value={code}>{code.toUpperCase()}</MenuItem>
                ))}
              </TextField>
            </Box>
          </Box>
        </FormRow>

        <FormRow label="Insurance Name*">
          <TextField required value={insurance} onChange={(e) => setInsurance(e.target.value)} sx={inputStyle} />
        </FormRow>

        <Box sx={{ display: 'flex', mb: 2, gap: 2 }}>
          <FormLabel sx={labelStyle}>Past Medical History*</FormLabel>
          <FormGroup sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {['Anemia', 'Asthma', 'Bronchitis', 'Chickenpox', 'Diabetes', 'Pneumonia', 'Thyroid Disease', 'Ulcer', 'Other'].map(item => (
              <FormControlLabel
                key={item}
                control={
                  <Checkbox value={item} checked={medicalHistory.includes(item)} onChange={handleMedicalHistoryChange} />
                }
                label={item}
              />
            ))}
          </FormGroup>
        </Box>

        <Typography variant="h6" gutterBottom>Patient/Guardian Signature*</Typography>
        <Typography variant="body1" gutterBottom>
          According to our privacy policy and federal law, your information within this patient registration form will remain private at all times.
        </Typography>
{}
        <Button type="submit" onClick={registerPatient} variant="contained" fullWidth sx={submitButtonStyle}>
          REGISTER
        </Button>
      </form>
    </Container>
  );
}

export default App;

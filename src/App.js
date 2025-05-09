import React from 'react';
import {
  Container, Paper, Typography, TextField, Button, FormControl, FormLabel,
  RadioGroup, FormControlLabel, Radio, FormGroup, Checkbox, Select, MenuItem
} from '@mui/material';
import './App.css';

function App() {
  return (
    <Container maxWidth="md">
      <Paper elevation={3} className="mui-form-container">
        <Typography variant="h4" gutterBottom>Patient Registration Form</Typography>
        <Typography variant="body1" gutterBottom>
          Thank you for applying to our practice. Please complete this patient registration form with your information, and a doctor will contact you shortly.
        </Typography>
        <hr />

        <form noValidate autoComplete="off">

          <div className="form-row-inline">
            <FormLabel className="form-label">Patient's Name*</FormLabel>
            <TextField label="First" name="first" required className="form-input" />
            <TextField label="Last" name="last" required className="form-input" />
          </div>


          <div className="form-row-inline">
            <FormLabel className="form-label">Gender</FormLabel>
            <RadioGroup row name="gender">
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel value="female" control={<Radio />} label="Female" />
            </RadioGroup>
          </div>


          <div className="form-row-inline">
            <FormLabel className="form-label">Phone*</FormLabel>
            <TextField label="### ### ###" name="phone" required className="form-phone" />
          </div>

          <div className="form-row-inline">
            <FormLabel className="form-label">Date of Birth*</FormLabel>
            <TextField  type="date"  name="dob" required className="form-gender" />
          </div>

          <div className="form-row-inline">
            <FormLabel className="form-label">Marital Status*</FormLabel>
            <RadioGroup row name="MStatus">
              <FormControlLabel value="Single" control={<Radio />} label="Single" />
              <FormControlLabel value="Married" control={<Radio />} label="Married" />
              <FormControlLabel value="Divorced" control={<Radio />} label="Divorced" />
              <FormControlLabel value="Widow" control={<Radio />} label="Widow" />
            </RadioGroup>
          </div>

          <div className="form-row-inline">
            <FormLabel className="form-label">Street Address*</FormLabel>
            <TextField label="Street" name="street_address" required fullWidth className="form-input" />
          </div>

          <div className="form-row-inline">
            <FormLabel className="form-label">City/State*</FormLabel>
            <TextField label="City" name="city" required className="form-input" />
            <TextField label="State" name="state" required className="form-input" />
          </div>

          <div className="form-row-inline">
            <FormLabel className="form-label">Zip/Country*</FormLabel>
            <TextField label="Postal/Zip Code" name="zip" required className="form-input" />
            <FormControl label="Country" required className="form-input">
              <Select defaultValue="">
                <MenuItem value="us">United States</MenuItem>
                <MenuItem value="ca">Canada</MenuItem>
                <MenuItem value="uk">United Kingdom</MenuItem>
                <MenuItem value="au">Australia</MenuItem>
                <MenuItem value="in">India</MenuItem>
                <MenuItem value="de">Germany</MenuItem>
                <MenuItem value="fr">France</MenuItem>
                <MenuItem value="jp">Japan</MenuItem>
                <MenuItem value="cn">China</MenuItem>
              </Select>
            </FormControl>
          </div>


          <div className="form-row-inline">
            <FormLabel className="form-label">Insurance Name*</FormLabel>
            <TextField name="insurance_name" required className="form-insurance" />
          </div>

          <div className="form-row-inline medical-history-row">
            <FormLabel className="form-label">Past Medical History*</FormLabel>
            <FormGroup className="medical-checkbox-group">
              {['Anemia', 'Asthma', 'Bronchitis', 'Chickenpox', 'Diabetes', 'Pneumonia', 'Thyroid Disease', 'Ulcer', 'Other'].map(item => (
                <FormControlLabel control={<Checkbox />} label={item} key={item} />
              ))}
            </FormGroup>
          </div>

          <Typography variant="h6" gutterBottom>Patient/Guardian Signature*</Typography>
          <Typography variant="body1" gutterBottom>
            According to our privacy policy and federal law, your information within this patient registration form will remain private at all times.
          </Typography>

          <Button type="submit" variant="contained" fullWidth className="mui-submit-button">
            REGISTER
          </Button>

        </form>
      </Paper>
    </Container>
  );
}

export default App;

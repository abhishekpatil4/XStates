import { useState, useEffect } from 'react'
import { Box, Typography, typographyClasses } from '@mui/material'
import { Container } from '@mui/material'
import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';

// import './App.css'

function App() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    const getCountries = async () => {
      const countriesURL = "https://crio-location-selector.onrender.com/countries";
      try {
        const data = await axios.get(countriesURL);
        setCountries(data.data);
      } catch (error) {
        console.log(error);
      }
    }
    getCountries();
  }, [])

  useEffect(() => {
    const getStates = async (country) => {
      const statesURL = `https://crio-location-selector.onrender.com/country=${country}/states`
      try {
        const data = await axios.get(statesURL);
        setStates(data.data);
      } catch (error) {
        console.log(error);
      }
    }
    if (selectedCountry != "") {
      getStates(selectedCountry);
    }
  }, [selectedCountry])

  useEffect(() => {
    const getCities = async (country, state) => {
      const citiesURL = `https://crio-location-selector.onrender.com/country=${country}/state=${state}/cities`
      try {
        const data = await axios.get(citiesURL);
        setCities(data.data);
      } catch (error) {
        console.log(error);
      }
    }
    if (selectedCountry != "" && selectedState != "") {
      getCities(selectedCountry, selectedState);
    }
  }, [selectedState])

  return <Container>
    <Typography variant='h4' sx={{ textAlign: 'center', margin: '2rem 0rem' }}>Select Location</Typography>
    <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: "row", gap: 5, margin: '3rem 0rem' }}>
      <div>
        <select style={{ minHeight: '2rem', minWidth: '20rem' }} value={selectedCountry} onChange={(event) => setSelectedCountry(event.target.value)}>
          <option value="" disabled selected>Select Country</option>
          {
            countries?.map((country, idx) =>
              <option key={idx} value={country}>{country}</option>
            )
          }
        </select>
      </div>
      <div>
        <select style={{ minHeight: '2rem', minWidth: '20rem' }} value={selectedState} onChange={(event) => setSelectedState(event.target.value)}>
          <option value="" disabled selected>Select State</option>
          {
            states?.map((state, idx) =>
              <option key={idx} value={state}>{state}</option>
            )
          }
        </select>
      </div>
      <div>
        <select style={{ minHeight: '2rem', minWidth: '20rem' }} value={selectedCity} onChange={(event) => setSelectedCity(event.target.value)}>
          <option value="" disabled selected>Select City</option>
          {
            cities?.map((city, idx) =>
              <option key={idx} value={city}>{city}</option>
            )
          }
        </select>
      </div>
    </Box>
    {
      selectedCity !== "" && <p style={{ textAlign: 'center' }}>You selected {selectedCity}, {selectedState}, {selectedCountry}</p>
    }
    {/* <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      {
        selectedCountry !== "" && <Typography variant='h6' sx={{ margin: '0px 2px' }}>You selected </Typography>
      }
      {
        selectedCountry !== "" && <Typography variant='h5' sx={{ margin: '0px 2px', fontWeight: 600 }}>{selectedCountry}, </Typography>
      }
      <Typography variant='h6' color="gray" sx={{ margin: '0px 2px' }}>{selectedState}, </Typography>
      <Typography variant='h6' color="gray" sx={{ margin: '0px 2px' }}>{selectedCity}</Typography>
    </Box> */}
  </Container>
}

export default App

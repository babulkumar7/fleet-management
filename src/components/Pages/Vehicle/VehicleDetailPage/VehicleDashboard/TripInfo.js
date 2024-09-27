import React from 'react';
import { Card } from 'react-bootstrap';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { FaCalendarAlt, FaClock, FaGasPump, FaRoad, FaTachometerAlt, FaUser } from 'react-icons/fa';
import Grid from '@mui/material/Grid';


// Define the map container style and options
const mapContainerStyle = {
  height: '200px',
  width: '100%',
};

const center = {
  lat: 37.7749, // Example latitude
  lng: -122.4194, // Example longitude
};
const tripDetails = {
  startDate: 'May 14 / 2:35 AM',
  endDate: 'May 14 / 12:40 PM',
  distance: '501.4 mi',
  duration: '10h 5min',
};

const mapPosition = {
  lat: 37.7749, // Example latitude
  lng: -122.4194, // Example longitude
};
const TripInfo = () => {
  return (
    <Card className="h-100 shadow-sm">
      <Card.Body>
        <h5 className="mb-4">Trip Info</h5>
        <Grid>
          <Grid item xs={6} md={6}>
            {/* Fuel Consumption */}
            <div className="trip-detail-item">
              <FaCalendarAlt className="trip-icon" />
              <div>
                <span className="label">Start Date</span>
                <p className="value">{tripDetails.startDate}</p>
              </div>
            </div>
          </Grid>
          <Grid item xs={6} md={6}>
            {/* Fuel Consumption */}
            <div className="trip-detail-item">
              <FaCalendarAlt className="trip-icon" />
              <div>
                <span className="label">End Date</span>
                <p className="value">{tripDetails.endDate}</p>
              </div>
            </div>
          </Grid>
          <Grid item xs={6} md={6}>
            {/* Fuel Consumption */}
            <div className="trip-detail-item">
              <FaRoad className="trip-icon" />
              <div>
                <span className="label">Distance Covered</span>
                <p className="value">{tripDetails.distance}</p>
              </div>
            </div>
          </Grid>
          <Grid item xs={6} md={6}>
            {/* Fuel Consumption */}
            <div className="trip-detail-item">
              <FaClock className="trip-icon" />
              <div>
                <span className="label">Duration</span>
                <p className="value">{tripDetails.duration}</p>
              </div>
            </div>
          </Grid>
        </Grid>
        <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY}> {/* Replace with your Google Maps API key */}
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={mapPosition}
            zoom={10}
          >
            <Marker position={mapPosition} />
          </GoogleMap>
        </LoadScript>
      </Card.Body>
    </Card>
  );
};

export default TripInfo;

import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
} from '@react-google-maps/api';
import car from '../../../../Images/vehicle.png'; // Adjust the path based on your project setup

const defaultCenter = { lat: 37.7749, lng: -122.4194 }; // Default center (San Francisco)
//const defaultMarkerUrl = 'https://maps.google.com/mapfiles/ms/icons/red-dot.png'; // Default marker URL

const Tracker = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
    libraries: ['places'],
  });

  const [deviceDetails, setDeviceDetails] = useState({
    batteryLevel: '',
    distance: '',
    totalDistance: '',
    speed: '',
  });

  const [map, setMap] = useState(null);
  const [deviceLocation, setDeviceLocation] = useState(defaultCenter);
  const [zoom, setZoom] = useState(20); // Default zoom level
  const mapRef = useRef();

  useEffect(() => {
    const fetchTraccarData = async () => {
      try {
        const response = await axios.get('http://demo.traccar.org/api/positions', {
          headers: {
            Authorization: `Bearer RzBFAiEAsuXJVLehyiS3_hXd4DJQ2Qhva6Nl21JkA_oKEtg5icMCICVCXanbuI9ykIm5XSPlJzXO9i-GJ1vuh6SQiF8tDvsLeyJ1Ijo2MDA3OSwiZSI6IjIwMjUtMDItMDVUMTg6MzA6MDAuMDAwKzAwOjAwIn0`, // Access token from .env file
          },
          auth: {
            username: 'babulkumar0607@gmail.com', 
             password: 'babul007',
          },
        });

        if (response.data && response.data.length > 0) {
          const position = response.data[0]; // Assuming you track only one device
          const newLocation = { lat: position.latitude, lng: position.longitude };
          setDeviceLocation(newLocation);
          setDeviceDetails({
            batteryLevel: position.attributes.batteryLevel,
            distance: position.attributes.distance,
            totalDistance: position.attributes.totalDistance,
            speed: position.speed,
          });

          if (map) {
            // Smoothly move the map to the new location
            map.panTo(newLocation);
          }
        } else {
          console.log('No device data available');
        }
      } catch (error) {
        console.error('Error fetching Traccar data:', error);
      }
    };

    // Fetch data every 5 seconds
    const intervalId = setInterval(fetchTraccarData, 5000);

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, [map]);

  if (!isLoaded) {
    return <div>Loading Maps...</div>;
  }

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <GoogleMap
        center={deviceLocation}
        zoom={zoom}
        mapContainerStyle={{ width: '100%', height: '100%' }}
        onLoad={(mapInstance) => {
          setMap(mapInstance);
          mapRef.current = mapInstance; // Reference map instance
        }}
      >
        <Marker
          position={deviceLocation}
          icon={{
            url: car, // Use a default marker URL for testing
            scaledSize: new window.google.maps.Size(50, 50), // Adjust size as needed
            anchor: new window.google.maps.Point(25, 50), // Adjust anchor point to fit the icon
          }}
        />
      </GoogleMap>
    </div>
  );
};

export default Tracker;

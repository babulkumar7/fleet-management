import React, { useEffect, useState, useRef } from 'react';
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
} from '@react-google-maps/api';
import car from '../../../../Images/vehicle.png'; // Adjust the path based on your project setup

const defaultCenter = { lat: 37.7749, lng: -122.4194 }; // Default center (San Francisco)

const Tracker = ({ deviceLocation }) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
    libraries: ['places'],
  });

  const [map, setMap] = useState(null);
  const mapRef = useRef();

  if (!isLoaded) {
    return <div>Loading Maps...</div>;
  }

  return (
    <div style={{ display: 'flex', height: '80vh' }}>
      <GoogleMap
        center={deviceLocation}
        zoom={20}
        mapContainerStyle={{ width: '100%', height: '100%' }}
        onLoad={(mapInstance) => {
          setMap(mapInstance);
          mapRef.current = mapInstance; // Reference map instance
        }}
      >
        <Marker
          position={deviceLocation}
          icon={{
            url: car, // Use a custom car icon
            scaledSize: new window.google.maps.Size(50, 50), // Adjust size as needed
            anchor: new window.google.maps.Point(25, 50), // Adjust anchor point to fit the icon
          }}
        />
      </GoogleMap>
    </div>
  );
};

export default Tracker;

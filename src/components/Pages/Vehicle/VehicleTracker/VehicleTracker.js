import React, { useEffect, useRef, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase';
import VehicleTable from '../VehicleTable/VehicleTable';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Tracker from '../../Dashboard/Tracker';
import { useJsApiLoader } from '@react-google-maps/api';
import axios from 'axios';
import DetailsPanel from '../DetailsPanel/DetailsPanel';

const defaultCenter = { lat: 37.7749, lng: -122.4194 };

const VehicleTracker = () => {
  const [value, setValue] = useState('1');
  const [vehicleData, setVehicleData] = useState(null);
  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [vehicleCounts, setVehicleCounts] = useState({
    all: 0,
    stopped: 0,
    running: 0,
    idle: 0,
    offline: 0,
  });
  const [selectedVehicleIndex, setSelectedVehicleIndex] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [deviceDetails, setDeviceDetails] = useState({
    batteryLevel: '',
    distance: '',
    totalDistance: '',
    speed: '',
  });
  const [deviceLocation, setDeviceLocation] = useState(defaultCenter);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
    libraries: ['places'],
  });

  const mapRef = useRef();

  useEffect(() => {
    const fetchVehicles = async () => {
      const vehiclesCollection = collection(db, 'vehicle'); // Adjust the collection name
      const vehicleSnapshot = await getDocs(vehiclesCollection);
      const vehicleList = vehicleSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setVehicles(vehicleList);

      const allCount = vehicleList.length;
      const stoppedCount = vehicleList.filter((vehicle) => vehicle.status === 'Stopped').length;
      const runningCount = vehicleList.filter((vehicle) => vehicle.status === 'Running').length;
      const idleCount = vehicleList.filter((vehicle) => vehicle.status === 'Idle').length;
      const offlineCount = vehicleList.filter((vehicle) => vehicle.status === 'Offline').length;

      setVehicleCounts({
        all: allCount,
        stopped: stoppedCount,
        running: runningCount,
        idle: idleCount,
        offline: offlineCount,
      });

      setFilteredVehicles(vehicleList); // Initially show all vehicles
    };

    fetchVehicles();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);

    switch (newValue) {
      case '1':
        setFilteredVehicles(vehicles);
        break;
      case '2':
        setFilteredVehicles(vehicles.filter((vehicle) => vehicle.status === 'Stopped'));
        break;
      case '3':
        setFilteredVehicles(vehicles.filter((vehicle) => vehicle.status === 'Running'));
        break;
      case '4':
        setFilteredVehicles(vehicles.filter((vehicle) => vehicle.status === 'Idle'));
        break;
      case '5':
        setFilteredVehicles(vehicles.filter((vehicle) => vehicle.status === 'Offline'));
        break;
      default:
        setFilteredVehicles(vehicles);
    }
  };

  const toggleSidebar = (index, vehicle) => {
    setSelectedVehicle(vehicle);
    setSelectedVehicleIndex(index);
  };

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
        console.log('response',JSON.stringify(response));

        if (response.data && response.data.length > 0) {
            setVehicleData(response.data[0]);
          const position = response.data[0]; // Assuming you track only one device
          const newLocation = { lat: position.latitude, lng: position.longitude };
          setDeviceLocation(newLocation);
          setDeviceDetails({
            batteryLevel: position.attributes.batteryLevel,
            distance: position.attributes.distance,
            totalDistance: position.attributes.totalDistance,
            speed: position.speed,
          });
        } else {
          console.log('No device data available');
        }
      } catch (error) {
        console.error('Error fetching Traccar data:', error);
      }
    };

    const intervalId = setInterval(fetchTraccarData, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="app-containers">
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={6} md={5}>
            <Box sx={{ p: 2, bgcolor: '#e9eff4', height: '599px', borderRadius: 3, typography: 'body1' }}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <TabList onChange={handleChange} aria-label="vehicle status tabs">
                    <Tab label={`All Vehicles (${vehicleCounts.all})`} value="1" />
                    <Tab label={`Stopped (${vehicleCounts.stopped})`} value="2" />
                    <Tab label={`Running (${vehicleCounts.running})`} value="3" />
                    <Tab label={`Idle (${vehicleCounts.idle})`} value="4" />
                    <Tab label={`Offline (${vehicleCounts.offline})`} value="5" />
                  </TabList>
                </Box>
                <TabPanel value="1">
                  <VehicleTable handleVehicleSelect={toggleSidebar} selectedVehicleIndex={selectedVehicleIndex} vehicles={filteredVehicles} />
                </TabPanel>
                <TabPanel value="2">
                  <VehicleTable handleVehicleSelect={toggleSidebar} selectedVehicleIndex={selectedVehicleIndex} vehicles={filteredVehicles} />
                </TabPanel>
                <TabPanel value="3">
                  <VehicleTable handleVehicleSelect={toggleSidebar} selectedVehicleIndex={selectedVehicleIndex} vehicles={filteredVehicles} />
                </TabPanel>
                <TabPanel value="4">
                  <VehicleTable handleVehicleSelect={toggleSidebar} selectedVehicleIndex={selectedVehicleIndex} vehicles={filteredVehicles} />
                </TabPanel>
                <TabPanel value="5">
                  <VehicleTable handleVehicleSelect={toggleSidebar} selectedVehicleIndex={selectedVehicleIndex} vehicles={filteredVehicles} />
                </TabPanel>
              </TabContext>
            </Box>
          </Grid>
          <Grid item xs={6} md={7}>
            <Tracker deviceLocation={deviceLocation} />
          </Grid>
          <Grid item xs={12} md={12}>
        <DetailsPanel selectedVehicle={selectedVehicle} vehicleData={vehicleData} /> 
        </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default VehicleTracker;

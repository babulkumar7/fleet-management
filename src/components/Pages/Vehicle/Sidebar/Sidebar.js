import React, { useEffect, useState } from 'react';
import "./Sidebar.css";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase';
import VehicleTable from '../VehicleTable/VehicleTable';

const Sidebar = () => {
   // const [selectedVehicle, setSelectedVehicle] = useState(null);

    const [value, setValue] = useState('1');
    const [vehicles, setVehicles] = useState([]);
    const [filteredVehicles, setFilteredVehicles] = useState([]);
    const [vehicleCounts, setVehicleCounts] = useState({
        all: 0,
        stopped: 0,
        running: 0,
        idle: 0,
        offline: 0
    });
    const [selectedVehicle, setSelectedVehicle] = useState(null);

    const handleSelectedVehicle = (vehicle) => {
        console.log('Selected vehicle:', vehicle);
        setSelectedVehicle(vehicle);
    };
    // Fetch vehicle data from Firestore once
    useEffect(() => {
        const fetchVehicles = async () => {
            const vehiclesCollection = collection(db, 'vehicle'); // Adjust the collection name
            const vehicleSnapshot = await getDocs(vehiclesCollection);
            const vehicleList = vehicleSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));

            setVehicles(vehicleList);

            // Count vehicles based on their status
            const allCount = vehicleList.length;
            const stoppedCount = vehicleList.filter(vehicle => vehicle.status === 'Stopped').length;
            const runningCount = vehicleList.filter(vehicle => vehicle.status === 'Running').length;
            const idleCount = vehicleList.filter(vehicle => vehicle.status === 'Idle').length;
            const offlineCount = vehicleList.filter(vehicle => vehicle.status === 'Offline').length;

            setVehicleCounts({
                all: allCount,
                stopped: stoppedCount,
                running: runningCount,
                idle: idleCount,
                offline: offlineCount
            });

            setFilteredVehicles(vehicleList); // Initially show all vehicles
        };

        fetchVehicles();
    }, []);
    const [selectedVehicleIndex, setSelectedVehicleIndex] = useState(null);

    const handleChange = (event, newValue) => {
        setValue(newValue);

        switch (newValue) {
            case '1':
                setFilteredVehicles(vehicles);
                break;
            case '2':
                setFilteredVehicles(vehicles.filter(vehicle => vehicle.status === 'Stopped'));
                break;
            case '3':
                setFilteredVehicles(vehicles.filter(vehicle => vehicle.status === 'Running'));
                break;
            case '4':
                setFilteredVehicles(vehicles.filter(vehicle => vehicle.status === 'Idle'));
                break;
            case '5':
                setFilteredVehicles(vehicles.filter(vehicle => vehicle.status === 'Offline'));
                break;
            default:
                setFilteredVehicles(vehicles);
        }
    };
    console.log('data:::',setSelectedVehicle)
    const toggleSidebar = (index, vehicle) => {
    console.log('data:::',vehicle)
    setSelectedVehicleIndex(index);
    
      };

    return (
        <Box sx={{ p: 0, bgcolor: '#e9eff4', borderRadius: 3, typography: 'body1' }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="vehicle status tabs">
                        <Tab label={`All Vehicle (${vehicleCounts.all})`} value="1" />
                        <Tab label={`Stopped (${vehicleCounts.stopped})`} value="2" />
                        <Tab label={`Running (${vehicleCounts.running})`} value="3" />
                        <Tab label={`Idle (${vehicleCounts.idle})`} value="4" />
                        <Tab label={`Offline (${vehicleCounts.offline})`} value="5" />
                    </TabList>
                </Box>
                <TabPanel value="1"><VehicleTable handleVehicleSelect={toggleSidebar} selectedVehicleIndex={selectedVehicleIndex} vehicles={filteredVehicles} /></TabPanel>
                <TabPanel value="2"><VehicleTable  handleVehicleSelect={toggleSidebar} selectedVehicleIndex={selectedVehicleIndex} vehicles={filteredVehicles} /></TabPanel>
                <TabPanel value="3"><VehicleTable  handleVehicleSelect={toggleSidebar} selectedVehicleIndex={selectedVehicleIndex} vehicles={filteredVehicles} /></TabPanel>
                <TabPanel value="4"><VehicleTable  handleVehicleSelect={toggleSidebar} selectedVehicleIndex={selectedVehicleIndex} vehicles={filteredVehicles} /></TabPanel>
                <TabPanel value="5"><VehicleTable  handleVehicleSelect={toggleSidebar} selectedVehicleIndex={selectedVehicleIndex} vehicles={filteredVehicles} /></TabPanel>
            </TabContext>
        </Box>
    );
};

export default Sidebar;

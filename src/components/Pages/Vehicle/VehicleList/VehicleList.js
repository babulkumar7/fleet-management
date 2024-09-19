import React, { useEffect, useState } from 'react';
import "./VehicleList.css";
import { db } from '../../../firebase'; // assuming you have Firebase set up
import { collection, getDocs } from 'firebase/firestore';
import FastForwardSharpIcon from '@mui/icons-material/FastForwardSharp';
import FastRewindSharpIcon from '@mui/icons-material/FastRewindSharp';
import Trucks from '../../../../Images/Trucks.jpg'
import car from '../../../../Images/car.png'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import RemoveRedEyeSharpIcon from '@mui/icons-material/RemoveRedEyeSharp';
import ShareSharpIcon from '@mui/icons-material/ShareSharp';
import NearMeSharpIcon from '@mui/icons-material/NearMeSharp';
import GroupAddSharpIcon from '@mui/icons-material/GroupAddSharp';
import { BsFillFlagFill } from "react-icons/bs";
import Tracker from '../../Dashboard/Tracker';

export default function VehicleList() {
    const [showFleet, setShowFleet] = useState(true);
    const [showDetails, setShowDetails] = useState(true);
    const [vehicles, setVehicles] = useState([]);
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [selectedVehicleIndex, setSelectedVehicleIndex] = useState(0);

    
    const toggleFleet = () => setShowFleet(!showFleet);
    const toggleDetails = () => setShowDetails(!showDetails);
       // Fetch vehicle data from Firestore
       useEffect(() => {
        const fetchVehicles = async () => {
            const vehiclesCollection = collection(db, 'vehicle'); // Adjust the collection name
            const vehicleSnapshot = await getDocs(vehiclesCollection);
            const vehicleList = vehicleSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setSelectedVehicle(vehicleList[0])
            setVehicles(vehicleList);
        };
        fetchVehicles();
    }, []);
      // Handle vehicle selection
      const handleVehicleSelect = (vehicle,index) => {
        setSelectedVehicle(vehicle);
        setSelectedVehicleIndex(index);
    };
    // const vehicles = [
    //     {
    //         name: 'Diesel Tanker MH.12 JF 7',
    //         date: '21-07-2022',
    //         time: '01:02:55 PM',
    //         status: 'Running',
    //         gps: true,
    //         signal: true,
    //         alert: false,
    //     },
    //     {
    //         name: 'Diesel Tanker MH.14 DM...',
    //         date: '22-07-2022',
    //         time: '01:02:55 PM',
    //         status: 'Idle',
    //         gps: true,
    //         signal: false,
    //         alert: true,
    //     },
    //     {
    //         name: 'MH 12 LT 5550',
    //         date: '22-07-2022',
    //         time: '09:02:55 PM',
    //         status: 'Stopped',
    //         gps: false,
    //         signal: true,
    //         alert: false,
    //     },
    //     {
    //         name: 'Mobi GPS 6972',
    //         date: '22-07-2022',
    //         time: '01:02:55 PM',
    //         status: 'Inactive',
    //         gps: false,
    //         signal: false,
    //         alert: true,
    //     },
    //     // Add more vehicle data as needed
    // ];

    // Calculate counts for different statuses
    const runningCount = vehicles.filter(vehicle => vehicle.status === 'Running').length;
    const idleCount = vehicles.filter(vehicle => vehicle.status === 'Idle').length;
    const inactiveCount = vehicles.filter(vehicle => vehicle.status === 'Inactive').length;
    const stoppedCount = vehicles.filter(vehicle => vehicle.status === 'Stopped').length;
    const totalCount = vehicles.length;
    return (
        <>
            <div className="app">
                {/* Map Section */}
                <div className="map-container">
                    <Tracker/>
                </div>

                {/* Fleet Status Section */}
                {showFleet ?
                    <div className="fleet">
                            <div style={{ float: 'right' }}>
                            <FastRewindSharpIcon onClick={toggleFleet} />
                        </div>
                        <div className="fleet-status">
                            <div className="container mt-4">

                                <div className="status-boxes-container">
                                    <div style={{background:'#7fb4e2'}} className="status-box">
                                        <span className="status-count">{runningCount}</span>
                                        <span className="status-label">Running</span>
                                    </div>

                                    <div style={{background:'#f1ca83'}}  className="status-box">
                                        <span className="status-count">{idleCount}</span>
                                        <span className="status-label">Idle</span>
                                    </div>
                                    <div style={{background:'#f29494'}} className="status-box">
                                        <span className="status-count">{stoppedCount}</span>
                                        <span className="status-label">Stopped</span>
                                    </div>
                                    <div style={{background:'#8585dd'}} className="status-box">
                                        <span className="status-count">{inactiveCount}</span>
                                        <span className="status-label">Inactive</span>
                                    </div>
                                    <div style={{background:'#3d3030'}}  className="status-box text-white">
                                        <span className="status-count">{totalCount}</span>
                                        <span className="status-label">Total</span>
                                    </div>
                                </div>
                    
                                <div className="card">
                                    <div className="card-header">
                                        <strong>Your Company</strong>
                                    </div>
                                    <table className="table table-hover">
                                        <thead>
                                            <tr>
                                                <th>Select</th>
                                                <th>Vehicle</th>
                                                <th>Status</th>
                                                <th>GPS</th>
                                                <th>Signal</th>
                                                <th>Alert</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {vehicles.map((vehicle, index) => (
                                                <tr key={index}>
                                                    <td>
                                                        <input
                                                           checked={selectedVehicleIndex === index}
                                                            type="checkbox"
                                                            onChange={() => handleVehicleSelect(vehicle,index)}
                                                        />
                                                    </td>
                                                    <td>{vehicle.name}</td>
                                                    <td>
                                                        <span className={`badge bg-${vehicle.status === 'Running' ? 'success' : vehicle.status === 'Idle' ? 'warning' : 'danger'}`}>
                                                            {vehicle.status}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        {vehicle.gps ? <i className="fa fa-map-marker text-success"></i> : <i className="fa fa-map-marker text-danger"></i>}
                                                    </td>
                                                    <td>
                                                        {vehicle.signal ? <i className="fa fa-wifi text-success"></i> : <i className="fa fa-wifi text-danger"></i>}
                                                    </td>
                                                    <td>
                                                        {vehicle.alert ? <i className="fa fa-exclamation-triangle text-danger"></i> : <i className="fa fa-check-circle text-success"></i>}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <div className="button-fleet-status">
                        <FastForwardSharpIcon onClick={toggleFleet} />
                    </div>
                }

                {/* Vehicle Details Section */}
                {showDetails && selectedVehicle  ?
                    <div className="details">
                        <div style={{ float: 'right' }}>
                            <FastForwardSharpIcon onClick={toggleDetails} />
                        </div>

                        {/* First Section: Vehicle Info */}
                        <div className="vehicle-info ">
                        <h2>{selectedVehicle.name}</h2>
                            <img width='100%' src={selectedVehicle.imageUrl || Trucks} alt="vehicle" />
                            <div className='vehicle-status vehicle-section'>
                                <p> {selectedVehicle.status}</p>
                                <p><strong>16 Mins</strong> </p>

                            </div>
                            <div className='vehicle-section'>
                                <p> Current Trip</p>
                                <p><strong>450.65 km</strong>  </p>
                            </div>
                            <div className='counter-box'>
                                <span>0</span>
                                <span>8</span>
                                <span>:</span>
                                <span>4</span>
                                <span>3</span>
                            </div>
                            <div className='worked-hours'>
                                <p> Worked Hours</p>
                                <p><strong> 8 hrs</strong>  </p>
                            </div>
                            <div className='vehicle-section'>
                                <p> Driver</p>
                                <p><strong> John Doe</strong>  </p>
                            </div>
                            <div className='vehicle-section'>
                                <p> Phone</p>
                                <p><strong> +918456789</strong>  </p>
                            </div>
                            <div className='button-box'>
                                <span><RemoveRedEyeSharpIcon /></span>
                                <span><ShareSharpIcon /></span>
                                <span><NearMeSharpIcon /></span>
                                <span><GroupAddSharpIcon /></span>
                            </div>

                        </div>

                        {/* Second Section: Location */}
                        <div className="vehicle-location">
                            <h2>Location</h2>
                            <p>1600 Amphitheatre Parkway, Mountain View, CA 94043, USA</p>
                            <p>37.4220, -122.0841</p>
                        </div>

                        {/* Third Section: Today's Activities */}
                        <div className="vehicle-activities">
                            <h2>Today's Activities</h2>
                            <BsFillFlagFill size={23} color='green' /> _ _ _ _ <span>45 kms</span>  _ _ _ _ _
                            <img width={35} src={car} alt="car"></img>


                            <div className='vehicle-section'>
                                <p> Running</p>
                                <p style={{ color: 'green' }}><strong> 09:16 hrs</strong>  </p>
                            </div>
                            {/* <p><strong>Total Kms:</strong> 450 km</p> */}
                            <div className='vehicle-section'>
                                <p> Stop Hours:</p>
                                <p style={{ color: 'red' }}><strong> 2 hrs</strong>  </p>
                            </div>
                            <div className='vehicle-section'>
                                <p> Idle Hours</p>
                                <p style={{ color: 'orange' }}><strong> 1 hrs</strong>  </p>
                            </div>
                            <div className='vehicle-section'>
                                <p>Inactive</p>
                                <p style={{ color: '#3b73da' }}><strong> 3 hrs</strong>  </p>
                            </div>
                            <div className="button-container">

                                <button className="view-log-btn">View Log</button>
                            </div>
                        </div>

                    </div>
                    :
                    <div className="button-vehicle-details">
                        <FastRewindSharpIcon onClick={toggleDetails} />
                    </div>

                }
            </div>
        </>
    );
}

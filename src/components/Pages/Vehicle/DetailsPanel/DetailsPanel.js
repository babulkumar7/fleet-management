import React, { useState } from 'react';
import "./DetailsPanel.css";
import Trucks from '../../../../Images/Trucks.jpg'
import car from '../../../../Images/car.png'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import RemoveRedEyeSharpIcon from '@mui/icons-material/RemoveRedEyeSharp';
import ShareSharpIcon from '@mui/icons-material/ShareSharp';
import NearMeSharpIcon from '@mui/icons-material/NearMeSharp';
import GroupAddSharpIcon from '@mui/icons-material/GroupAddSharp';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { BsFillFlagFill } from "react-icons/bs";
import { FaCalendarAlt, FaClock, FaRoad,FaBus , FaUser, FaGasPump, FaTachometerAlt } from 'react-icons/fa';

import Item from 'antd/es/list/Item';
import VehicleStats from '../VehicleStats/VehicleStats';
const DetailsPanel = ({ selectedVehicle ,vehicleData}) => {
    const [key, setKey] = useState('data');

    if (!selectedVehicle) {
        return <div className=""></div>;
    }
    return (
        <>
  <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3"
    >
      <Tab eventKey="data" title="Data">
        <VehicleStats vehicleData={vehicleData}/>
      </Tab>
      <Tab eventKey="trips" title="Trip Details">
      <Box sx={{ flexGrow: 1, p: 2, bgcolor: '#e9eff4', borderRadius: 3, typography: 'body1' }} >
                <Grid container spacing={2}>
                    <Grid item xs={6} md={6}>
                    <div className="trip-details">
            <div className="row mb-4">
                {/* Start Date */}
                <div className="col-md-6">
                    <div className="trip-detail-item">
                        <FaCalendarAlt className="trip-icon" />
                        <div>
                            <span className="label">Start Date</span>
                            <p className="value">May 14 / 10:35 AM</p>
                        </div>
                    </div>
                </div>

                {/* Duration */}
                <div className="col-md-6">
                    <div className="trip-detail-item">
                        <FaClock className="trip-icon" />
                        <div>
                            <span className="label">Duration</span>
                            <p className="value">15h</p>
                        </div>
                    </div>
                </div>

             
            </div>

            {/* Bottom section */}
            <div className="row">
                {/* Fuel Consumption */}
                <div className="col-md-6">
                    <div className="trip-detail-item">
                    <FaBus  className="trip-icon" />
                        <div>
                            <span className="label">Status</span>
                            <p className="value">DRIVING</p>
                        </div>
                    </div>
                </div>

                {/* Average Speed */}
                <div className="col-md-6">
                    <div className="trip-detail-item">
                        <FaTachometerAlt className="trip-icon" />
                        <div>
                            <span className="label">Trip Id</span>
                            <p className="value">3VWDX7AJ5BM006256</p>
                        </div>
                    </div>
                </div>
                  
            </div>
        </div>
                
                    </Grid>
                    <Grid item xs={6} md={6}>
                    <div className="trip-details">
                    <div className="row">
                {/* Fuel Consumption */}
                <div className="col-md-6">
                    <div className="trip-detail-item">
                        <FaGasPump className="trip-icon" />
                        <div>
                            <span className="label">Fuel Consumption</span>
                            <p className="value">6.03 MPG</p>
                        </div>
                    </div>
                </div>

                {/* Average Speed */}
                <div className="col-md-6">
                    <div className="trip-detail-item">
                        <FaTachometerAlt className="trip-icon" />
                        <div>
                            <span className="label">Average Speed</span>
                            <p className="value">62.5 MPH</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="trip-detail-item">
                        <FaRoad className="trip-icon" />
                        <div>
                            <span className="label">Distance Covered</span>
                            <p className="value">750mi</p>
                        </div>
                    </div>
                </div>

                {/* Driver */}
                <div className="col-md-6">
                    <div className="trip-detail-item">
                        <FaUser className="trip-icon" />
                        <div>
                            <span className="label">Driver</span>
                            <p className="value">Alex Anderson</p>
                        </div>
                    </div>
                </div>
            </div>
                        </div>
                    </Grid>
                  
                  
                </Grid>
            </Box>
      </Tab>
      <Tab eventKey="details" title="Vehicle Details" >
      <Box sx={{ flexGrow: 1, p: 2, bgcolor: '#e9eff4', borderRadius: 3, typography: 'body1' }} >
                <Grid container spacing={2}>
                    <Grid item xs={6} md={4}>
                        <h2>{selectedVehicle.name}</h2>
                        <img style={{  borderRadius: '10px',marginBottom: '10px'}} width='100%' src={selectedVehicle.imageUrl || Trucks} alt="vehicle" />
                        <div style={{  borderRadius: '10px'}} className='vehicle-status vehicle-section'>
                            <p> {selectedVehicle.status}</p>
                            <p><strong>16 Mins</strong> </p>
                        </div>
                    </Grid>
                    <Grid item xs={6} md={4}>
                        <div className='vehicle-section'>
                            <p> Current Trip</p>
                            <p><strong>450.65 km</strong>  </p>
                        </div>

                        <div className="vehicle-location">
                            <h2>Location</h2>
                            <p>1600 Amphitheatre Parkway, Mountain View, CA 94043, USA</p>
                            <p>37.4220, -122.0841</p>
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
                    </Grid>
                    <Grid item xs={6} md={4}>
                        <div className='counter-box'>
                            <span>0</span>
                            <span>8</span>
                            <span>:</span>
                            <span>4</span>
                            <span>3</span>
                        </div>
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
                    </Grid>
                  
                </Grid>
            </Box>
      </Tab>
    </Tabs>



  {/* <Grid item xs={6} md={4}>
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
        </Grid>
        <Grid item xs={6} md={4}>
        <div className="vehicle-location">
                            <h2>Location</h2>
                            <p>1600 Amphitheatre Parkway, Mountain View, CA 94043, USA</p>
                            <p>37.4220, -122.0841</p>
                        </div>
        </Grid>
        <Grid item xs={6} md={4}>
        <div className="vehicle-activities">
                            <h2>Today's Activities</h2>
                            <BsFillFlagFill size={23} color='green' /> _ _ _ _ <span>45 kms</span>  _ _ _ _ _
                            <img width={35} src={car} alt="car"></img>


                            <div className='vehicle-section'>
                                <p> Running</p>
                                <p style={{ color: 'green' }}><strong> 09:16 hrs</strong>  </p>
                            </div>
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
        </Grid> */}


            {/* <div className="details-panel">
     <div className="details">
                        First Section: Vehicle Info 
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

                         Second Section: Location 
                        <div className="vehicle-location">
                            <h2>Location</h2>
                            <p>1600 Amphitheatre Parkway, Mountain View, CA 94043, USA</p>
                            <p>37.4220, -122.0841</p>
                        </div>

                    Third Section: Today's Activities 
                        <div className="vehicle-activities">
                            <h2>Today's Activities</h2>
                            <BsFillFlagFill size={23} color='green' /> _ _ _ _ <span>45 kms</span>  _ _ _ _ _
                            <img width={35} src={car} alt="car"></img>


                            <div className='vehicle-section'>
                                <p> Running</p>
                                <p style={{ color: 'green' }}><strong> 09:16 hrs</strong>  </p>
                            </div>
                         <p><strong>Total Kms:</strong> 450 km</p>
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
    </div> */}
        </>

    );
};

export default DetailsPanel;

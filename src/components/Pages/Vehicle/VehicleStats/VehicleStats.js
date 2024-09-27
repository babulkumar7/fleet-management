import React from 'react';
import './VehicleStats.css';

const VehicleStats = ({vehicleData}) => {
    if (!vehicleData) {
        return <p>No vehicle data available</p>;
    }
    const {
        latitude,
        longitude,
        speed,
        address,
        attributes: {
            odometer,
            distance,
            fuelConsumption,
            batteryLevel,
            motion,
            angle,
            altitude,
        } = {},
        deviceTime,
        serverTime,
    } = vehicleData;

    return (
        <div className="vehicle-stats-container">
            <div className="vehicle-stats">
                <div className="stats-item">
                    <i className="fa fa-tachometer-alt"></i>
                    <div>
                        <p>Odometer</p>
                        <h4>{(odometer / 1000).toFixed(2)} km</h4>
                    </div>
                </div>
                <div className="stats-item">
                    <i className="fa fa-info-circle"></i>
                    <div>
                        <p>Status</p>
                        <h4>{motion ? 'Moving' : 'Stopped'}</h4>
                    </div>
                </div>
                <div className="stats-item">
                    <i className="fa fa-map-marker-alt"></i>
                    <div>
                        <p>Address</p>
                        <h4>{address}</h4>
                    </div>
                </div>
                <div className="stats-item">
                    <i className="fa fa-mountain"></i>
                    <div>
                        <p>Altitude</p>
                        <h4>{altitude} m</h4>
                    </div>
                </div>
                <div className="stats-item">
                    <i className="fa fa-arrow-up"></i>
                    <div>
                        <p>Angle</p>
                        <h4>{angle}°</h4>
                    </div>
                </div>
                <div className="stats-item">
                    <i className="fa fa-location-arrow"></i>
                    <div>
                        <p>Position</p>
                        <h4>{latitude}, {longitude}</h4>
                    </div>
                </div>
            </div>

            <div className="speed-time-container">
                <div className="stats-item">
                    <i className="fa fa-tachometer-alt"></i>
                    <div>
                        <p>Speed</p>
                        <h4>{(speed * 1.60934).toFixed(2)} kph</h4>
                    </div>
                </div>
                <div className="time-info">
                    <div className="stats-item">
                        <i className="fa fa-clock"></i>
                        <div>
                            <p>Time (position)</p>
                            <h4>{new Date(deviceTime).toLocaleString()}</h4>
                        </div>
                    </div>
                    <div className="stats-item">
                        <i className="fa fa-server"></i>
                        <div>
                            <p>Time (server)</p>
                            <h4>{new Date(serverTime).toLocaleString()}</h4>
                        </div>
                    </div>
                </div>
            </div>

            <div className="daily-stats-container">
                <h4>Daily statistics</h4>
                <div className="daily-stats">
                    <div className="stats-item">
                        <p>Distance covered</p>
                        <h4>{(distance / 1000).toFixed(2)} km</h4>
                    </div>
                    <div className="stats-item">
                        <p>Fuel Consumption</p>
                        <h4>{fuelConsumption ? `${fuelConsumption.toFixed(2)} MPG` : 'N/A'}</h4>
                    </div>
                    <div className="stats-item">
                        <p>Battery Level</p>
                        <h4>{batteryLevel}%</h4>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VehicleStats;

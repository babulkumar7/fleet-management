import React, { useState, useEffect } from 'react';
import { Button, Table, Badge, ProgressBar, Nav, Form, InputGroup } from 'react-bootstrap';
import { db } from '../../../firebase'; // Import your Firebase configuration
import { collection, getDocs } from 'firebase/firestore'; // Firestore functions
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const ViewExistingVehicle = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const [selectedTab, setSelectedTab] = useState('All Statuses');
  const [filters, setFilters] = useState({
    vehicleType: 'All Vehicles',
    vehicleStatus: 'All Types',
    errors: 'All Errors',
  });
  const [vehicles, setVehicles] = useState([]); // State for vehicles

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const vehiclesCollection = collection(db, 'vehicle'); // Reference to your vehicles collection
        const vehicleSnapshot = await getDocs(vehiclesCollection);
        const vehicleList = vehicleSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setVehicles(vehicleList);
      } catch (error) {
        console.error("Error fetching vehicles: ", error);
      }
    };

    fetchVehicles();
  }, []); // Empty dependency array to run once on mount

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Available':
        return <Badge bg="success">Available</Badge>;
      case 'En Route':
        return <Badge bg="info">En Route</Badge>;
      case 'Out of Service':
        return <Badge bg="danger">Out of Service</Badge>;
      default:
        return <Badge bg="secondary">Unknown</Badge>;
    }
  };

  const handleTabSelect = (tab) => {
    setSelectedTab(tab);
  };

  const handleFilterChange = (field, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [field]: value,
    }));
  };
  const handleViewClick = (vehicleId) => {
    // Redirect to VehicleDashboard with the vehicle ID
    navigate(`/vehicle-dashboard/${vehicleId}`);
  };
  const handleNewVehicle= () => {
    // Redirect to VehicleDashboard with the vehicle ID
    navigate('/add-vehicle');
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Vehicles</h2>
        <Button variant="success" onClick={handleNewVehicle}>+ Add Vehicle</Button>
      </div>
      {/* Filters */}
      <div className="d-flex justify-content-between align-items-center my-3">
        <div className="d-flex">
          <InputGroup className="me-2">
            <Form.Select
              value={filters.vehicleType}
              onChange={(e) => handleFilterChange('vehicleType', e.target.value)}
            >
              <option>All Vehicles</option>
              <option>Truck</option>
              <option>Van</option>
              <option>Car</option>
            </Form.Select>
          </InputGroup>

          <InputGroup className="me-2">
            <Form.Select
              value={filters.vehicleStatus}
              onChange={(e) => handleFilterChange('vehicleStatus', e.target.value)}
            >
              <option>All Types</option>
              <option>Available</option>
              <option>En Route</option>
              <option>Out of Service</option>
            </Form.Select>
          </InputGroup>

        </div>
        <Button variant="outline-secondary">CLEAR</Button>
      </div>

      {/* Vehicles Table */}
      <Table hover bordered>
        <thead>
          <tr>
            <th>Vehicle</th>
            <th>Type</th>
            <th>Status</th>
            <th>Health Rate</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((vehicle, index) => (
            <tr key={index}>
              <td>
                {vehicle.name} <br />
                <small>{vehicle.vin}</small>
              </td>
              <td>{vehicle.type}</td>
              <td>{getStatusBadge(vehicle.status)}</td>
              <td>
                <ProgressBar
                  now={vehicle.condition}
                  label={`${vehicle.condition}%`}
                  variant={
                    vehicle.condition > 70
                      ? 'success'
                      : vehicle.condition > 40
                      ? 'warning'
                      : 'danger'
                  }
                />
              </td>
              <td>
                <Button variant="primary" size="sm" onClick={() => handleViewClick(vehicle.id)}>
                  View
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ViewExistingVehicle;

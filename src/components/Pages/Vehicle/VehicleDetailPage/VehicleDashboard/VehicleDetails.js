import React, { useState } from 'react';
import { Card, Table, Button, Form } from 'react-bootstrap';

export default function VehicleDetails({ details, onSave }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(details);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = () => {
    onSave(formData); // Call the parent save function
    setIsEditing(false); // Exit edit mode
  };

  return (
    <Card className="h-100 shadow-sm">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="mb-4">Vehicle Details</h5>
          <Button variant="primary" onClick={handleEditToggle}>
            {isEditing ? 'Cancel' : 'Edit'}
          </Button>
        </div>
        <Table hover>
          <tbody>
            <tr>
              <td>Name</td>
              <td>
                {isEditing ? (
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                ) : (
                  formData.name
                )}
              </td>
            </tr>
            <tr>
              <td>Type</td>
              <td>
                {isEditing ? (
                  <Form.Control
                    type="text"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                  />
                ) : (
                  formData.type
                )}
              </td>
            </tr>
         
            <tr>
              <td>VIN</td>
              <td>
                {isEditing ? (
                  <Form.Control
                    type="text"
                    name="vin"
                    value={formData.vin}
                    onChange={handleChange}
                  />
                ) : (
                  formData.vin
                )}
              </td>
            </tr>
            <tr>
              <td>License Plate</td>
              <td>
                {isEditing ? (
                  <Form.Control
                    type="text"
                    name="licensePlate"
                    value={formData.licensePlate}
                    onChange={handleChange}
                  />
                ) : (
                  formData.licensePlate
                )}
              </td>
            </tr>
            <tr>
              <td>Status</td>
              <td>
                {isEditing ? (
                  <Form.Control
                    type="text"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  />
                ) : (
                  formData.status
                )}
              </td>
            </tr>
            <tr>
              <td>Fuel Consumption</td>
              <td>
                {isEditing ? (
                  <Form.Control
                    type="text"
                    name="fuelConsumption"
                    value={formData.fuelConsumption}
                    onChange={handleChange}
                  />
                ) : (
                  formData.fuelConsumption
                )}
              </td>
            </tr>
            <tr>
              <td>Average Speed</td>
              <td>
                {isEditing ? (
                  <Form.Control
                    type="text"
                    name="averageSpeed"
                    value={formData.averageSpeed}
                    onChange={handleChange}
                  />
                ) : (
                  formData.averageSpeed
                )}
              </td>
            </tr>
            <tr>
              <td>Domain</td>
              <td>
                {isEditing ? (
                  <Form.Control
                    type="text"
                    name="domain"
                    value={formData.domain}
                    onChange={handleChange}
                  />
                ) : (
                  formData.domain
                )}
              </td>
            </tr>
            <tr>
              <td>Driver</td>
              <td>
                {isEditing ? (
                  <Form.Control
                    type="text"
                    name="driver"
                    value={formData.driver}
                    onChange={handleChange}
                  />
                ) : (
                  formData.driver
                )}
              </td>
            </tr>
            <tr>
              <td>Image URL</td>
              <td>
                {isEditing ? (
                  <Form.Control
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                  />
                ) : (
                  <img src={formData.image} alt="Vehicle" style={{ width: '100px', height: 'auto' }} />
                )}
              </td>
            </tr>
            <tr>
              <td>Condition</td>
              <td>
                {isEditing ? (
                  <Form.Control
                    type="number"
                    name="condition"
                    value={formData.condition}
                    onChange={handleChange}
                  />
                ) : (
                  formData.condition
                )}
              </td>
            </tr>
            <tr>
              <td>Engine</td>
              <td>
                {isEditing ? (
                  <Form.Control
                    type="text"
                    name="engine"
                    value={formData.engine}
                    onChange={handleChange}
                  />
                ) : (
                  formData.engine
                )}
              </td>
            </tr>
            <tr>
              <td>Battery</td>
              <td>
                {isEditing ? (
                  <Form.Control
                    type="text"
                    name="battery"
                    value={formData.battery}
                    onChange={handleChange}
                  />
                ) : (
                  formData.battery
                )}
              </td>
            </tr>
            <tr>
              <td>Oil</td>
              <td>
                {isEditing ? (
                  <Form.Control
                    type="text"
                    name="oil"
                    value={formData.oil}
                    onChange={handleChange}
                  />
                ) : (
                  formData.oil
                )}
              </td>
            </tr>
            <tr>
              <td>Gas</td>
              <td>
                {isEditing ? (
                  <Form.Control
                    type="text"
                    name="gas"
                    value={formData.gas}
                    onChange={handleChange}
                  />
                ) : (
                  formData.gas
                )}
              </td>
            </tr>
            <tr>
              <td>Year</td>
              <td>
                {isEditing ? (
                  <Form.Control
                    type="number"
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                  />
                ) : (
                  formData.year
                )}
              </td>
            </tr>
            <tr>
              <td>Model</td>
              <td>
                {isEditing ? (
                  <Form.Control
                    type="text"
                    name="model"
                    value={formData.model}
                    onChange={handleChange}
                  />
                ) : (
                  formData.model
                )}
              </td>
            </tr>
            <tr>
              <td>Odometer</td>
              <td>
                {isEditing ? (
                  <Form.Control
                    type="text"
                    name="odometer"
                    value={formData.odometer}
                    onChange={handleChange}
                  />
                ) : (
                  formData.odometer
                )}
              </td>
            </tr>
            <tr>
              <td>Color</td>
              <td>
                {isEditing ? (
                  <Form.Control
                    type="text"
                    name="color"
                    value={formData.color}
                    onChange={handleChange}
                  />
                ) : (
                  formData.color
                )}
              </td>
            </tr>
          </tbody>
        </Table>
        {isEditing && (
          <div className="d-flex justify-content-end mt-3">
            <Button variant="success" onClick={handleSave}>
              Save
            </Button>
          </div>
        )}
      </Card.Body>
    </Card>
  );
}

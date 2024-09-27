import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import './Maintenance.css'; // Import the custom CSS file

export default function Maintenance({  }) {
  const maintenanceData = {
    overdue: 5, // Number of overdue maintenance items
    dueSoon: 3, // Number of maintenance items due soon
    issues: [
    
      {
        type: 'Oil Change',
        details: 'Due in 5 days',
        status: 'warning',
      },
      {
        type: 'Tire Rotation',
        details: 'Due in 2 weeks',
        status: 'warning',
      },
      {
        type: 'Battery Check',
        details: '3 months overdue',
        status: 'danger',
      },
      
    ],
  };
  
  return (
    <Card className="maintenance-card h-100 shadow-sm">
      <Card.Body>
        <h5 className="mb-4">Maintenance</h5>
        <Row className="mb-3">
          <Col xs={6} className="text-center">
            <div className="maintenance-count">
              <h3 className="overdue-count">{maintenanceData.overdue}</h3>
              <p className="text-muted">Overdue</p>
            </div>
          </Col>
          <Col xs={6} className="text-center">
            <div className="maintenance-count">
              <h3 className="due-soon-count">{maintenanceData.dueSoon}</h3>
              <p className="text-muted">Due Soon</p>
            </div>
          </Col>
        </Row>
        <div className="maintenance-list">
          {maintenanceData.issues.map((issue, index) => (
            <div key={index} className="maintenance-item d-flex align-items-center mb-3">
              <div className="icon-wrapper">
                <i className='fa fa-exclamation-triangle text-warning'></i>
              </div>
              <div className="maintenance-details ms-3">
                <h6 className="mb-1">{issue.type}</h6>
                <p className="text-muted mb-0">{issue.details}</p>
              </div>
            </div>
          ))}
        </div>
      </Card.Body>
    </Card>
  );
}

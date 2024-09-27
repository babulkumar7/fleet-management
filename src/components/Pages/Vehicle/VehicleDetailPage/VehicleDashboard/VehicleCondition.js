import React from 'react';
import { Card } from 'react-bootstrap';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
export default function VehicleCondition({ condition }) {
  return (
    <Card className="h-100 shadow-sm text-center">
      <Card.Body>
        <h5 className="mb-4">Vehicle Condition</h5>

        <div style={{ width: 200, height: 200, margin: 'auto' }}>

          <CircularProgressbar value={condition} text={`${condition}%`} />;
        </div>
      </Card.Body>
    </Card>
  );
}

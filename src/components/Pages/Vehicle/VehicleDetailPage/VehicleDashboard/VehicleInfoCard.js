import Grid from '@mui/material/Grid';
import React from 'react';
import { Card } from 'react-bootstrap';

export default function VehicleInfoCard({ data }) {
  return (
    <Card className="h-100 shadow-sm">
      <Card.Body>
        <div className="d-flex align-items-center" style={{gap: '7%'}}>
          <img
            src={data.image}
            alt=''
            style={{ width: '100px', height: '100px' }}
            className='rounded-circle'
          />
          <div className="ml-5">
            <h5 className="mb-0">{data.name}</h5>
            <p className="text-muted mb-0">Vin: {data.vin}</p>
            <p className="text-muted mb-0">Licence Plate: {data.licensePlate}</p>
          </div>
        </div>
        <Grid container spacing={2}>
          <Grid item xs={6} md={6}>
            <div className="trip-detail-item">
              <div>
                <span className="label">Status</span>
                <p className="value">{data.status}</p>
              </div>
            </div>
          </Grid>
          <Grid item xs={6} md={6}>
            <div className="trip-detail-item">
              <div>
                <span className="label">Driver</span>
                <p className="value">{data.driver}</p>
              </div>
            </div>
          </Grid>
          <Grid item xs={6} md={6}>
            <div className="trip-detail-item">
              <div>
                <span className="label">Fuel Consumption</span>
                <p className="value">{data.fuelConsumption}</p>
              </div>
            </div>
          </Grid>
          <Grid item xs={6} md={6}>
            <div className="trip-detail-item">
              <div>
                <span className="label">Average Speed</span>
                <p className="value">{data.averageSpeed}</p>
              </div>
            </div>
          </Grid>
        </Grid>

      </Card.Body>
    </Card>
  );
}

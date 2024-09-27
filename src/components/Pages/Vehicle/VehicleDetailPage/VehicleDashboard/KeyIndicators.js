import React from 'react';
import { Card } from 'react-bootstrap';
import "./KeyIndicators.css";
import { FaOilCan , FaRoad,FaBus , FaUser, FaGasPump, FaTachometerAlt } from 'react-icons/fa';

import { PiEngineThin } from "react-icons/pi";
import { IoBatteryCharging } from "react-icons/io5";

export default function KeyIndicators({ indicators }) {
  return (
    <Card className="h-100 shadow-sm">
      <Card.Body>
        <h5 className="mb-4">Key Indicators</h5>
        <div className="">
          <div className="row mb-4">
                {/* Engine */}
                <div className="col-md-6">
                    <div style={{background:'#defcff'}} className="trip-detail-item">
                        <PiEngineThin className="trip-icon" />
                        <div>
                        <p className="mb-1">Engine</p>
            <span className={`badge badge-${indicators.engine === 'Ok' ? 'success' : 'danger'}`}>
              {indicators.engine}
            </span>
                        </div>
                    </div>
                </div>

                {/* Battery */}
                <div className="col-md-6">
                    <div style={{background:'#defcff'}}  className="trip-detail-item">
                        <IoBatteryCharging className="trip-icon" />
                        <div>
                        <p className="mb-1">Battery</p>
            <span className={`badge badge-${indicators.battery === 'Ok' ? 'success' : 'danger'}`}>
              {indicators.battery}
            </span>
                        </div>
                    </div>
                </div>

             
            </div>
            <div className="row mb-4">
                {/* Oil */}
                <div className="col-md-6">
                    <div style={{background:'#defcff'}}  className="trip-detail-item">
                        <FaOilCan className="trip-icon" />
                        <div>
                        <p className="mb-1">Oil</p>
                        <span className="badge badge-warning">{indicators.oil}</span>
                        </div>
                    </div>
                </div>

                {/* Gas */}
                <div className="col-md-6">
                    <div style={{background:'#defcff'}}  className="trip-detail-item">
                        <FaGasPump  className="trip-icon" />
                        <div>
                        <p className="mb-1">Gas</p>
                        <span className="badge badge-danger">{indicators.gas}</span>
                        </div>
                    </div>
                </div>

             
            </div>

        </div>
      </Card.Body>
    </Card>
  );
}

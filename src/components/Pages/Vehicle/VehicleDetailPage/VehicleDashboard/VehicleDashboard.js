import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import VehicleInfoCard from './VehicleInfoCard';
import VehicleCondition from './VehicleCondition';
import KeyIndicators from './KeyIndicators';
import VehicleDetails from './VehicleDetails';
import Maintenance from './Maintenance';
import TripInfo from './TripInfo';
import './VehicleDashboard.css';
import { db } from '../../../../firebase'; // Import your Firebase configuration
import { doc, getDoc,updateDoc } from 'firebase/firestore'; // Firestore functions
export default function VehicleDashboard() {
  // Mock data for demonstration purposes
  // const vehicleData = {
  //   name: 'Vehicle Name',
  //   vin: 'JTDKBRFU9J3059307',
  //   licensePlate: '232456',
  //   status: 'En Route',
  //   type: 'TRUCK',
  //   fuelConsumption: '5.99 MPG',
  //   averageSpeed: '62.5 MPH',
  //   domain: 'RETAIL',
  //   driver: 'JOHN DOE',
  //   condition: 70,
  //   indicators: {
  //     engine: 'Ok',
  //     battery: 'Ok',
  //     oil: '35%',
  //     gas: '1G'
  //   },
  //   details: {
  //     year: 2015,
  //     model: 'Crafter',
  //     odometer: '20,999 mi',
  //     color: 'Silver'
  //   },
  //   maintenance: {
  //     overdue: 5,
  //     dueSoon: 3,
  //     tasks: [
  //       { title: 'Brakes Repair', overdue: '2 month overdue' },
  //       { title: 'Filter Replacement', overdue: '1 month overdue' }
  //     ]
  //   },
  //   trip: {
  //     startDate: 'May 14 / 2:35 AM',
  //     endDate: 'May 14 / 12:40 PM',
  //     distance: '501.4 mi',
  //     duration: '10h 5min',
  //     mapUrl: '' // You can embed a Google Maps URL here
  //   }
  // };
  const { id } = useParams(); // Get the vehicle ID from the URL
  const [vehicleData, setVehicleData] = useState(null); // State for vehicle data

  useEffect(() => {
    const fetchVehicleData = async () => {
      try {
        const vehicleDoc = doc(db, 'vehicle', id); // Reference to the specific vehicle document
        const vehicleSnapshot = await getDoc(vehicleDoc);
        if (vehicleSnapshot.exists()) {
          setVehicleData({ id: vehicleSnapshot.id, ...vehicleSnapshot.data() });
        } else {
          console.error('No such vehicle found!');
        }
      } catch (error) {
        console.error('Error fetching vehicle data: ', error);
      }
    };

    fetchVehicleData();
  }, [id]); // Fetch vehicle data when ID changes
  const handleSave = async (updatedData) => {
    try {
      const vehicleDoc = doc(db, 'vehicle', id); // Reference to the specific vehicle document
      await updateDoc(vehicleDoc, updatedData); // Update vehicle data in Firestore
      setVehicleData({ ...vehicleData, ...updatedData }); // Update local state
    } catch (error) {
      console.error('Error updating vehicle data: ', error);
    }
  };
  if (!vehicleData) {
    return <div>Loading...</div>; // Loading state while fetching data
  }
  return (
    <div className="container">
      <div className="row">
        {/* Vehicle Info Card */}
        <div className="col-lg-4 col-md-6 mb-3">
          <VehicleInfoCard data={vehicleData} />
        </div>
        {/* Vehicle Condition */}
        <div className="col-lg-4 col-md-6 mb-3">
          <VehicleCondition condition={vehicleData.condition} />
        </div>
        {/* Key Indicators */}
        <div className="col-lg-4 col-md-12 mb-3">
          <KeyIndicators indicators={vehicleData} />
        </div>
      </div>
      <div className="row">
        {/* Vehicle Details */}
        <div className="col-lg-6 col-md-12 mb-3">
          <VehicleDetails details={vehicleData} onSave={handleSave}/>
        </div>
        {/* Maintenance */}
        <div className="col-lg-3 col-md-6 mb-3">
          <Maintenance maintenance={vehicleData.maintenance} />
        </div>
        {/* Trip Info */}
        <div className="col-lg-3 col-md-6 mb-3">
          <TripInfo trip={vehicleData.trip} />
        </div>
      </div>
    </div>
  );
}

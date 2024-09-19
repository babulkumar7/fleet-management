import React, { useState, useEffect } from "react";
import { db } from '../../../firebase'; // Firebase instance
import { collection, addDoc, getDocs } from "firebase/firestore";
import { toast } from "react-toastify"; // For notifications
import MetaData from "../../../MetaData";
import ClipLoader from "react-spinners/ClipLoader";

const AddMaintenance = () => {
  const [loading, setLoading] = useState(false);
  const [cost, setCost] = useState("");
  const [description, setDescription] = useState("");
  const [maintenanceDate, setMaintenanceDate] = useState("");
  const [nextDueDate, setNextDueDate] = useState("");
  const [odometerReading, setOdometerReading] = useState("");
  const [vehicleId, setVehicleId] = useState("");
  const [vehicles, setVehicles] = useState([]); // Store list of vehicles

  // Fetch all vehicles to display in a dropdown
  useEffect(() => {
    const fetchVehicles = async () => {
      const vehiclesSnapshot = await getDocs(collection(db, "vehicle")); // Adjust collection name if needed
      const vehicleList = vehiclesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setVehicles(vehicleList);
    };
    fetchVehicles();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!vehicleId) {
      toast.error("Please select a vehicle.", { position: "top-center" });
      setLoading(false);
      return;
    }
    try {
      const maintenanceData = {
        cost: Number(cost),
        description,
        maintenance_date: new Date(maintenanceDate),
        next_due_date: new Date(nextDueDate),
        odometer_reading: Number(odometerReading),
        vehicle_id: vehicleId,
      };

      await addDoc(collection(db, "Maintenances"), maintenanceData);
      toast.success("Maintenance record added successfully!");
      // Clear form fields
      setCost("");
      setDescription("");
      setMaintenanceDate("");
      setNextDueDate("");
      setOdometerReading("");
      setVehicleId("");
    } catch (error) {
      console.error("Error adding document: ", error);
      toast.error("Failed to add maintenance record.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <MetaData title='Add Maintenance' />
      <div className="container">
        <h2>Add Maintenance</h2>
        {loading ? (
          <div className="spinner-container">
            <ClipLoader color={"#36D7B7"} loading={loading} size={50} />
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label htmlFor="cost" className="form-label">Cost</label>
                <input
                  type="number"
                  className="form-control"
                  id="cost"
                  value={cost}
                  onChange={(e) => setCost(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="vehicleId" className="form-label">Vehicle ID <span style={{color: 'red'}}>*</span></label>
                <select
                  className="form-control"
                  id="vehicleId"
                  value={vehicleId}
                  onChange={(e) => setVehicleId(e.target.value)}
                  required
                >
                  <option value="">Select Vehicle</option>
                  {vehicles.map((vehicle) => (
                    <option key={vehicle.id} value={vehicle.id}>
                      {vehicle.name} ({vehicle.id})
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-6">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea
                  className="form-control"
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="maintenanceDate" className="form-label">Maintenance Date</label>
                <input
                  type="date"
                  className="form-control"
                  id="maintenanceDate"
                  value={maintenanceDate}
                  onChange={(e) => setMaintenanceDate(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="nextDueDate" className="form-label">Next Due Date</label>
                <input
                  type="date"
                  className="form-control"
                  id="nextDueDate"
                  value={nextDueDate}
                  onChange={(e) => setNextDueDate(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="odometerReading" className="form-label">Odometer Reading</label>
                <input
                  type="number"
                  className="form-control"
                  id="odometerReading"
                  value={odometerReading}
                  onChange={(e) => setOdometerReading(e.target.value)}
                  required
                />
              </div>
              <div className="col-12">
                <button type="submit" className="btn btn-primary">Add Maintenance</button>
              </div>
            </div>
          </form>
        )}
      </div>
    </>
  );
};

export default AddMaintenance;

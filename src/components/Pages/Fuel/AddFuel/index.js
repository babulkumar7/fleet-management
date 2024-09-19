import { useState, useEffect } from "react";
import { db } from '../../../firebase'; // Import db instance
import { doc, setDoc, collection, getDocs } from 'firebase/firestore'; // Import Firestore functions
import { toast } from "react-toastify";
import MetaData from "../../../MetaData";
import ClipLoader from "react-spinners/ClipLoader";

const AddFuel = () => {
  const [loading, setLoading] = useState(false); 
  const [date, setDate] = useState("");
  const [fuel_quantity, setFuelQuantity] = useState("");
  const [fuel_cost, setFuelCost] = useState(0);
  const [fuel_station, setFuelStation] = useState("");
  const [odometer_reading, setOdometerReading] = useState("");
  const [receipt_number, setReceiptNumber] = useState("");
  const [vehicle_id, setVehicleId] = useState("");
  const [vehicles, setVehicles] = useState([]); // Store list of vehicles

  // Fetch all vehicles to display in a dropdown
  useEffect(() => {
    const fetchVehicles = async () => {
      const vehiclesSnapshot = await getDocs(collection(db, "vehicle"));
      const vehicleList = vehiclesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setVehicles(vehicleList);
      console.log('vehicleList::',vehicleList)
    };
    fetchVehicles();
  }, []);

  // Push Function
  const savedata = async (e) => {
    e.preventDefault();
    setLoading(true);
   if (!receipt_number) {
    toast.error("Receipt Number is mandatory.", {
      position: "top-center",
    });
    return;
  }

  if (!vehicle_id) {
    toast.error("Please select a vehicle.", {
      position: "top-center",
    });
    return;
  }
  
    const data = { 
      date, 
      fuel_cost, 
      fuel_quantity, 
      fuel_station, 
      odometer_reading, 
      receipt_number, 
     vehicle_id: doc(db, "vehicle", vehicle_id) // Store vehicle reference properly
    };

    try {
      // Create a document reference with a unique ID (using receipt_number as the ID)
      const fuelDocRef = doc(db, "Fuel", receipt_number); // Using receipt_number as the ID
      await setDoc(fuelDocRef, data); // Set data to the document reference
      // Clear input fields after submission
      setDate('');
      setFuelQuantity('');
      setFuelCost(0);
      setFuelStation('');
      setOdometerReading('');
      setReceiptNumber('');
      setVehicleId('');

      toast.success("Fuel added successfully", {
        position: "top-center",
      });
      console.log("Fuel added successfully");
    } catch (error) {
      console.error("Error adding document: ", error);
    }finally {
        setLoading(false);
      }
  };

  return (
    <>
      <MetaData title='Add Fuel' />

      <div>
        <h2>Add Fuel</h2>
        {loading ? (
        <div className="spinner-container">
          <ClipLoader color={"#36D7B7"} loading={loading} size={50} />
        </div>
      ) : (
        <div className="row g-3">
        <div className="col-md-6">
            <label htmlFor="receiptNumber" className="form-label">Receipt Number <span style={{color: 'red'}}>*</span></label>
            <input type="text" className="form-control" id="receiptNumber" value={receipt_number} onChange={(e) => setReceiptNumber(e.target.value)} required />
          </div>

          <div className="col-md-6">
            <label htmlFor="vehicleId" className="form-label">Vehicle ID <span style={{color: 'red'}}>*</span></label>
            <select className="form-control" id="vehicleId" value={vehicle_id} onChange={(e) => setVehicleId(e.target.value)} required>
              <option value="">Select Vehicle</option>
              {vehicles.map((vehicle) => (
                <option key={vehicle.id} value={vehicle.id}>
                  {vehicle.name} ({vehicle.id})
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-6">
            <label htmlFor="inputDate" className="form-label">Fuel Date</label>
            <input type="date" className="form-control" id="inputDate" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>

          <div className="col-md-6">
            <label htmlFor="fuelCost" className="form-label">Fuel Cost</label>
            <input type="number" className="form-control" id="fuelCost" value={fuel_cost} onChange={(e) => setFuelCost(e.target.value)} />
          </div>

          <div className="col-md-6">
            <label htmlFor="fuelQuantity" className="form-label">Fuel Quantity</label>
            <input type="text" className="form-control" id="fuelQuantity" value={fuel_quantity} onChange={(e) => setFuelQuantity(e.target.value)} />
          </div>

          <div className="col-md-6">
            <label htmlFor="fuelStation" className="form-label">Fuel Station</label>
            <input type="text" className="form-control" id="fuelStation" value={fuel_station} onChange={(e) => setFuelStation(e.target.value)} />
          </div>

          <div className="col-md-6">
            <label htmlFor="odometerReading" className="form-label">Odometer Reading</label>
            <input type="text" className="form-control" id="odometerReading" value={odometer_reading} onChange={(e) => setOdometerReading(e.target.value)} />
          </div>

         

          <div className="col-12">
            <button type="submit" className="btn btn-primary" onClick={savedata}>Save</button>
          </div>
        </div>
      )}
      </div>
    </>
  );
};

export default AddFuel;

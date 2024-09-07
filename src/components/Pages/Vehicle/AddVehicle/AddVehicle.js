import { useState } from "react";
import { db } from '../../../firebase'; // Import db instance
import { doc, setDoc } from 'firebase/firestore'; // Import correct Firestore functions
import { toast } from "react-toastify";
const AddVehicle = ({ userDetails }) => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");

  // Push Function
  const savedata = async (e) => {
    e.preventDefault();
    const data = { name: name, type: type, email: userDetails?.email };

    try {
      // Create a document reference with a unique ID
      const vehicleDocRef = doc(db, "vehicle", name); // Using name as the ID for simplicity
      await setDoc(vehicleDocRef, data); // Set data to the document reference
      setName('');
      setType('');
      toast.success("Vehicle added Successfully", {
        position: "top-center",
      });
      console.log("Vehicle added successfully");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <>
      <div>
      <h2>New Vehicle</h2>
      <div class="row g-3">
        <div class="col-md-6">
          <label for="inputEmail4" class="form-label">Vehicle Name</label>
          <input type="text" class="form-control" id="inputEmail4" placeholder="Name or model of the vehicle" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div class="col-md-6">
          <label for="inputPassword4" class="form-label">Vehicle Type</label>
          <input type="text" class="form-control" id="inputPassword4" placeholder="e.g., Sedan, SUV, Truck" value={type} onChange={(e) => setType(e.target.value)} />
        </div>
        <div class="col-md-6">
          <label for="inputAddress" class="form-label">License Plate Number</label>
          <input type="text" class="form-control" id="inputAddress" placeholder="License plate number" />
        </div>
        <div class="col-md-6">
          <label for="inputAddress2" class="form-label">OwnerID</label>
          <input type="text" class="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor" />
        </div>
        <div class="col-md-6">
          <label for="inputCity" class="form-label">Manufacturer</label>
          <input type="text" class="form-control" placeholder="Vehicle manufacturer" id="inputCity" />
        </div>
        <div class="col-md-6">
          <label for="inputYear" class="form-label">Year of manufacture</label>
          <input type="number" class="form-control" id="inputYear" placeholder="Year of manufacture" />
        </div>
        <div class="col-md-6">
          <label for="inputMileage" class="form-label">Mileage</label>
          <input type="number" class="form-control" id="inputMileage" />

        </div>
        <div class="col-md-6">
          <label for="inputStatus" class="form-label">Status</label>
          <select id="inputStatus" class="form-select">
            <option selected>Choose Status...</option>
            <option>Active</option>
            <option>Inactive</option>
            <option>Maintenance</option>
          </select>
        </div>
        <div class="col-md-6">
          <label for="inputLastServiceDate" class="form-label">Last Service Date</label>
          <input type="date" class="form-control" id="inputLastServiceDate" />

        </div>  <div class="col-md-6">
          <label for="inputInsuranceExpiryDate" class="form-label">Insurance Expiry Date</label>
          <input type="date" class="form-control" id="inputInsuranceExpiryDate" />
        </div>

        <div class="col-12">
          <button type="submit" class="btn btn-primary" onClick={savedata}>Save</button>
        </div>
      </div>
      </div>
    </>
  )
}
export default AddVehicle
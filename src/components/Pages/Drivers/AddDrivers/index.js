import React, { useState } from "react";
import { db } from '../../../firebase'; // Firebase instance
import { collection, addDoc } from "firebase/firestore";
import { toast } from "react-toastify"; // For notifications
import MetaData from "../../../MetaData";
import ClipLoader from "react-spinners/ClipLoader";

const AddDriver = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [licenseExpiryDate, setLicenseExpiryDate] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [status, setStatus] = useState("Active");
  const [loading, setLoading] = useState(false); // Loading state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, "Drivers"), {
        first_name: firstName,
        last_name: lastName,
        email,
        contact_number: contactNumber,
        license_number: licenseNumber,
        license_expiry_date: new Date(licenseExpiryDate),
        date_of_birth: new Date(dateOfBirth),
        status
      });
      toast.success("Driver added successfully!");
      // Clear form fields
      setFirstName("");
      setLastName("");
      setEmail("");
      setContactNumber("");
      setLicenseNumber("");
      setLicenseExpiryDate("");
      setDateOfBirth("");
      setStatus("Active");
    } catch (error) {
      console.error("Error adding document: ", error);
      toast.error("Failed to add driver.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <MetaData title='Add Driver' />
      <h2>Add Driver</h2>
      {loading ? (
        <div className="spinner-container">
          <ClipLoader color={"#36D7B7"} loading={loading} size={50} />
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">First Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Last Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Contact Number</label>
              <input
                type="text"
                className="form-control"
                placeholder="Contact number"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">License Number</label>
              <input
                type="text"
                className="form-control"
                placeholder="License number"
                value={licenseNumber}
                onChange={(e) => setLicenseNumber(e.target.value)}
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">License Expiry Date</label>
              <input
                type="date"
                className="form-control"
                value={licenseExpiryDate}
                onChange={(e) => setLicenseExpiryDate(e.target.value)}
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Date of Birth</label>
              <input
                type="date"
                className="form-control"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Status</label>
              <select
                className="form-select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <div className="col-12">
              <button type="submit" className="btn btn-primary">
                Add Driver
              </button>
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default AddDriver;

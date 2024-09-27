import React, { useState } from "react";
import { db, storage } from '../../../firebase'; // Import Firebase db and storage
import { collection, addDoc } from 'firebase/firestore'; // Firestore functions for db
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'; // Firebase storage functions
import { toast } from "react-toastify";
import MetaData from "../../../MetaData";
import ClipLoader from "react-spinners/ClipLoader";
import {
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  CircularProgress,
} from '@mui/material';

const AddVehicle = ({ userDetails }) => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  // Additional fields
  const [vin, setVin] = useState("");
  const [licensePlate, setLicensePlate] = useState("");
  const [status, setStatus] = useState("En Route");
  const [fuelConsumption, setFuelConsumption] = useState("");
  const [averageSpeed, setAverageSpeed] = useState("");
  const [domain, setDomain] = useState("");
  const [driver, setDriver] = useState("");
  const [condition, setCondition] = useState(0);
  const [engine, setEngine] = useState("Ok");
  const [battery, setBattery] = useState("Ok");
  const [oil, setOil] = useState("");
  const [gas, setGas] = useState("");
  const [year, setYear] = useState(0);
  const [model, setModel] = useState("");
  const [odometer, setOdometer] = useState("");
  const [color, setColor] = useState("");

  // Function to handle image upload
  const handleImageUpload = async (file) => {
    if (!file) return;

    setLoading(true);
    const storageRef = ref(storage, `vehicleImages/${file.name}`); // Reference to Firebase storage

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Can show upload progress if needed
      },
      (error) => {
        console.error("Image upload error: ", error);
        toast.error("Error uploading image", { position: "top-center" });
      },
      async () => {
        const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
        setImageUrl(downloadUrl); // Store the image URL for database
        setLoading(false);
      }
    );
  };

  // Function to save vehicle data
  const savedata = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      name,
      type,
      vin,
      licensePlate,
      status,
      fuelConsumption,
      averageSpeed,
      domain,
      driver,
      image: imageUrl, // Save the uploaded image URL
      condition,
      engine,
      battery,
      oil,
      gas,
      year,
      model,
      odometer,
      color,
      email: userDetails?.email,
    };

    try {
      const vehicleCollectionRef = collection(db, "vehicle"); // Reference to "vehicle" collection
      await addDoc(vehicleCollectionRef, data);

      // Resetting fields after submission
      setName('');
      setType('');
      setVin('');
      setLicensePlate('');
      setStatus('En Route');
      setFuelConsumption('');
      setAverageSpeed('');
      setDomain('');
      setDriver('');
      setCondition(0);
      setEngine('Ok');
      setBattery('Ok');
      setOil('');
      setGas('');
      setYear(0);
      setModel('');
      setOdometer('');
      setColor('');
      setImage(null);
      toast.success("Vehicle added successfully", { position: "top-center" });
      console.log("Vehicle added successfully");
    } catch (error) {
      console.error("Error adding document: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <MetaData title="Add Vehicle" />
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          New Vehicle
        </Typography>
        {loading ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : (
          <form onSubmit={savedata}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Vehicle Name"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <TextField
                  label="Vehicle Type"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  required
                />
                <TextField
                  label="VIN"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={vin}
                  onChange={(e) => setVin(e.target.value)}
                  required
                />
                <TextField
                  label="License Plate"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={licensePlate}
                  onChange={(e) => setLicensePlate(e.target.value)}
                  required
                />
                <TextField
                  label="Fuel Consumption"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={fuelConsumption}
                  onChange={(e) => setFuelConsumption(e.target.value)}
                  required
                />
                <TextField
                  label="Average Speed"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={averageSpeed}
                  onChange={(e) => setAverageSpeed(e.target.value)}
                  required
                />
                  <TextField
                  label="Model"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  required
                />
                <TextField
                  label="Odometer"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={odometer}
                  onChange={(e) => setOdometer(e.target.value)}
                  required
                />
                <TextField
                  label="Color"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Domain"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  required
                />
                <TextField
                  label="Driver"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={driver}
                  onChange={(e) => setDriver(e.target.value)}
                  required
                />
                <TextField
                  label="Condition"
                  variant="outlined"
                  type="number"
                  fullWidth
                  margin="normal"
                  value={condition}
                  onChange={(e) => setCondition(Number(e.target.value))}
                  required
                />
                <TextField
                  label="Engine Status"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={engine}
                  onChange={(e) => setEngine(e.target.value)}
                  required
                />
                <TextField
                  label="Battery Status"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={battery}
                  onChange={(e) => setBattery(e.target.value)}
                  required
                />
                <TextField
                  label="Oil Level"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={oil}
                  onChange={(e) => setOil(e.target.value)}
                  required
                />
                <TextField
                  label="Gas Level"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={gas}
                  onChange={(e) => setGas(e.target.value)}
                  required
                />
                <TextField
                  label="Year"
                  variant="outlined"
                  type="number"
                  fullWidth
                  margin="normal"
                  value={year}
                  onChange={(e) => setYear(Number(e.target.value))}
                  required
                />
              
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    setImage(e.target.files[0]);
                    handleImageUpload(e.target.files[0]); // Trigger image upload
                  }}
                />
              </Grid>
            </Grid>
            <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2 }}>
              Add Vehicle
            </Button>
          </form>
        )}
      </Box>
    </>
  );
};

export default AddVehicle;

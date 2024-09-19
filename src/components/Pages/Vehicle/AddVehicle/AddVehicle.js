import { useState } from "react";
import { db, storage } from '../../../firebase'; // Import Firebase db and storage
import { collection, addDoc } from 'firebase/firestore'; // Firestore functions for db
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'; // Firebase storage functions
import { toast } from "react-toastify";
import MetaData from "../../../MetaData";
import ClipLoader from "react-spinners/ClipLoader";

const AddVehicle = ({ userDetails }) => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false); 

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
      name: name,
      type: type,
      imageUrl: imageUrl, // Save the uploaded image URL
      email: userDetails?.email,
    };

    try {
      const vehicleCollectionRef = collection(db, "vehicle"); // Reference to "vehicle" collection
      await addDoc(vehicleCollectionRef, data);

      setName('');
      setType('');
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
      <div>
        <h2>New Vehicle</h2>
        {loading ? (
          <div className="spinner-container">
            <ClipLoader color={"#36D7B7"} loading={loading} size={50} />
          </div>
        ) : (
          <form className="row g-3" onSubmit={savedata}>
            <div className="col-md-6">
              <label htmlFor="vehicleName" className="form-label">Vehicle Name</label>
              <input
                type="text"
                className="form-control"
                id="vehicleName"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="vehicleType" className="form-label">Vehicle Type</label>
              <input
                type="text"
                className="form-control"
                id="vehicleType"
                value={type}
                onChange={(e) => setType(e.target.value)}
                required
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="vehicleImage" className="form-label">Vehicle Image</label>
              <input
                type="file"
                className="form-control"
                id="vehicleImage"
                accept="image/*"
                onChange={(e) => {
                  setImage(e.target.files[0]);
                  handleImageUpload(e.target.files[0]); // Trigger image upload
                }}
              />
            </div>
            <div className="col-md-12 mt-3">
              <button type="submit" className="btn btn-primary">
                Add Vehicle
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
};

export default AddVehicle;

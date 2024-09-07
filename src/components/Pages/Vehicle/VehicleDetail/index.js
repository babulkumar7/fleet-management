import { useState, useEffect } from "react";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { useParams, useNavigate } from "react-router-dom";
import { db } from '../../../firebase';
import { toast } from "react-toastify";
import { Modal, Button, Form } from 'react-bootstrap';

const VehicleDetail = () => {
    const { id } = useParams(); // Get the vehicle ID from the URL
    const [vehicleData, setVehicleData] = useState({ name: "", type: "" });
    const [isEditing, setIsEditing] = useState(false); // State to toggle edit mode
    const [showModal, setShowModal] = useState(false); // State to control modal visibility
    const [modalData, setModalData] = useState({ name: "", type: "" }); // Data for modal
    const navigate = useNavigate();

    // Fetch vehicle data when the component mounts
    useEffect(() => {
        const fetchVehicleData = async () => {
            const docRef = doc(db, "vehicle", id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setVehicleData(docSnap.data());
            } else {
                console.log("No such document!");
            }
        };
        fetchVehicleData();
    }, [id]);

    // Save updated data and switch back to read-only mode
    const handleSave = async () => {
        try {
            const docRef = doc(db, "vehicle", id);
            await updateDoc(docRef, vehicleData);
            toast.success("Vehicle updated successfully", {
                position: "top-center",
            });
            setIsEditing(false); // Switch back to read-only mode after saving
        } catch (error) {
            console.error("Error updating document: ", error);
            toast.error("Error updating vehicle", {
                position: "top-center",
            });
        }
    };

    // Delete function
    const handleDelete = async () => {
        try {
            await deleteDoc(doc(db, "vehicle", id));
            toast.success("Vehicle deleted successfully", {
                position: "top-center",
            });
            navigate("/"); // Redirect to the vehicle list page after deletion
        } catch (error) {
            console.error("Error deleting document: ", error);
            toast.error("Error deleting vehicle", {
                position: "top-center",
            });
        }
    };

    // Go back to the previous page
    const handleBack = () => {
        navigate(-1); // Navigate back to the previous page
    };

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setVehicleData((prevData) => ({ ...prevData, [name]: value }));
    };

    // Show modal and set modal data
    const handleEditClick = () => {
        setModalData(vehicleData);
        setShowModal(true);
    };

    // Handle modal input changes
    const handleModalChange = (e) => {
        const { name, value } = e.target;
        setModalData((prevData) => ({ ...prevData, [name]: value }));
    };

    // Save data from modal
    const handleModalSave = async () => {
        try {
            const docRef = doc(db, "vehicle", id);
            await updateDoc(docRef, modalData);
            toast.success("Vehicle updated successfully", {
                position: "top-center",
            });
            setShowModal(false);

            // Fetch and update the vehicle data
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setVehicleData(docSnap.data());
            }
        } catch (error) {
            console.error("Error updating document: ", error);
            toast.error("Error updating vehicle", {
                position: "top-center",
            });
        }
    };

    return (
        <div>
            <h2>Vehicle Details</h2>

            <div className="row g-3">
                <div className="col-md-6">
                    <label htmlFor="inputName" className="form-label">Vehicle Name</label>
                    <input
                        type="text"
                        name="name"
                        value={vehicleData.name}
                        onChange={handleChange}
                        readOnly={!isEditing}
                        className="form-control"
                        id="inputName"
                        placeholder="Name or model of the vehicle"
                    />
                </div>
                <div className="col-md-6">
                    <label htmlFor="inputType" className="form-label">Vehicle Type</label>
                    <input
                        type="text"
                        name="type"
                        value={vehicleData.type}
                        onChange={handleChange}
                        readOnly={!isEditing}
                        className="form-control"
                        id="inputType"
                        placeholder="e.g., Sedan, SUV, Truck"
                    />
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

                {/* Other fields as needed */}
                {/* ... */}
                <div className="col-12">
                    {isEditing ? (
                        <>
                            <button onClick={handleSave} className="btn btn-primary">
                                Save
                            </button>
                            <button onClick={() => setIsEditing(false)} className="btn btn-secondary" style={{ marginLeft: "10px" }}>
                                Cancel
                            </button>
                        </>
                    ) : (
                        <>
                            <button onClick={handleEditClick} className="btn btn-primary">
                                Edit
                            </button>
                            <button onClick={handleBack} className="btn btn-secondary" style={{ marginLeft: "10px" }}>
                                Back
                            </button>
                            <button
                                className="btn btn-danger"
                                onClick={handleDelete}
                                style={{ marginLeft: "10px" }}
                            >
                                Delete
                            </button>
                        </>
                    )}
                </div>
            </div>
            {/* Modal for editing */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Vehicle</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Vehicle Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={modalData.name}
                                onChange={handleModalChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Vehicle Type</Form.Label>
                            <Form.Control
                                type="text"
                                name="type"
                                value={modalData.type}
                                onChange={handleModalChange}
                            />
                        </Form.Group>
                        {/* Other fields as needed */}
                        {/* ... */}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleModalSave}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default VehicleDetail;

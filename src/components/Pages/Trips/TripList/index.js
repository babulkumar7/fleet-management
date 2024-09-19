import { useState, useEffect, useCallback } from "react";
import { db } from '../../../firebase'; // Firebase instance
import { collection, query, getDocs, doc, getDoc } from "firebase/firestore";
import ClipLoader from "react-spinners/ClipLoader";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Import for routing
import MetaData from "../../../MetaData";

const ViewTripsList = () => {
    const [tableData, setTableData] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state for the spinner
    const [currentPage, setCurrentPage] = useState(1); // For pagination
    const [rowsPerPage] = useState(6); // Set number of rows to 8 per page
    const [searchTerm, setSearchTerm] = useState(""); // For searching trip records

    const navigate = useNavigate();

    // Fetch vehicle name using vehicle_id (which is a unique document ID)
    const fetchVehicleName = async (vehicleId) => {
        try {
            const vehicleDocRef = doc(db, "vehicle", vehicleId); // Use vehicleId
            const vehicleDoc = await getDoc(vehicleDocRef);

            // Return vehicle name if the document exists, otherwise "Unknown Vehicle"
            return vehicleDoc.exists() ? vehicleDoc.data().name : "Unknown Vehicle";
        } catch (error) {
            console.error("Error fetching vehicle name:", error);
            return "Unknown Vehicle";
        }
    };

    // Fetch driver name using driver_id (which is a unique document ID)
    const fetchDriverName = async (driverId) => {
        try {
            const driverDocRef = doc(db, "Drivers", driverId); // Use driverId
            const driverDoc = await getDoc(driverDocRef);

            // Return driver name if the document exists, otherwise "Unknown Driver"
            return driverDoc.exists() ? driverDoc.data().first_name + ' ' + driverDoc.data().last_name : "Unknown Driver";
        } catch (error) {
            console.error("Error fetching driver name:", error);
            return "Unknown Driver";
        }
    };

    // Memoize fetchData to avoid unnecessary re-renders
    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const tripsCollection = collection(db, "trips"); // Fetch trip records
           // const q = query(tripsCollection); // Query to get all trip records
            const querySnapshot = await getDocs(tripsCollection);

            // For each trip record, fetch vehicle and driver names
            const tripsDataWithDetails = await Promise.all(
                querySnapshot.docs.map(async (doc) => {
                    const tripData = doc.data();
                    console.log(" fuelData!",JSON.stringify(tripData));


                    const vehicleName = await fetchVehicleName(tripData.vehicle_id); // Fetch vehicle name
                    const driverName = await fetchDriverName(tripData.driver_id); // Fetch driver name
                    return {
                        id: doc.id,
                        ...tripData,
                        vehicle_name: vehicleName, // Add vehicle name to the trip data
                        driver_name: driverName,   // Add driver name to the trip data
                    };
                })
            );
            setTableData(tripsDataWithDetails);
        } catch (error) {
            console.error("Error fetching documents: ", error);
        } finally {
            setLoading(false);
        }
    }, []);

    const handleEdit = (id) => {
        //navigate(`/trips/${id}`); // Redirect to the detail page with trip ID
    };

    // Pagination: Get current page data
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = tableData
        .filter((trip) =>
            trip.vehicle_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            trip.start_location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            trip.end_location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            trip.distance?.toString().includes(searchTerm.toLowerCase()) ||
            trip.duration?.toString().includes(searchTerm.toLowerCase()) ||
            trip.driver_name?.toLowerCase().includes(searchTerm.toLowerCase()) // Search by all relevant fields
        )
        .slice(indexOfFirstRow, indexOfLastRow);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Fetch data when the component mounts
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <>
            <MetaData title='View Trips List' />

            <div>
                <h2>Trips List</h2>
                <input
                    type="text"
                    placeholder="Search by Vehicle Name, Start Location, End Location, Distance, Duration, or Driver Name"
                    className="form-control mb-3"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {loading ? (
                <div className="spinner-container">
                    <ClipLoader color={"#36D7B7"} loading={loading} size={50} />
                </div>
            ) : (
                <>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Vehicle Name</th>
                                <th>Start Location</th>
                                <th>End Location</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Distance</th>
                                <th>Duration</th>
                                <th>Driver Name</th>
                                <th>View</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentRows.length > 0 ? (
                                currentRows.map((trip, rowIndex) => (
                                    <tr key={`trip-${rowIndex}`}>
                                        <td>{trip.vehicle_name}</td>
                                        <td>{trip.start_location}</td>
                                        <td>{trip.end_location}</td>
                                        <td>{new Date(trip.start_time).toLocaleString()}</td> {/* Format as needed */}
<td>{new Date(trip.end_time).toLocaleString()}</td> {/* Format as needed */}

                                        <td>{trip.distance_traveled}</td>
                                        <td>{trip.duration}</td>
                                        <td>{trip.driver_name}</td>
                                        <td>
                                            <FaEye
                                                style={{ cursor: 'pointer' }}
                                                color="blue"
                                                onClick={() => handleEdit(trip.id)}
                                            />
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="9">No trips found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    {/* Pagination */}
                    <nav>
                        <ul className="pagination">
                            {Array.from(
                                { length: Math.ceil(tableData.length / rowsPerPage) },
                                (_, i) => (
                                    <li key={i} className={`page-item ${i + 1 === currentPage ? 'active' : ''}`}>
                                        <button onClick={() => paginate(i + 1)} className="page-link">
                                            {i + 1}
                                        </button>
                                    </li>
                                )
                            )}
                        </ul>
                    </nav>
                </>
            )}
        </>
    );
};

export default ViewTripsList;

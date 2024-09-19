import { useState, useEffect, useCallback } from "react";
import { db } from '../../../firebase'; // Firebase instance
import { collection, query, getDocs, doc, getDoc } from "firebase/firestore";
import ClipLoader from "react-spinners/ClipLoader";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Import for routing
import MetaData from "../../../MetaData";

const ViewFuelList = ({ userDetails }) => {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state for the spinner
  const [currentPage, setCurrentPage] = useState(1); // For pagination
  const [rowsPerPage] = useState(8); // Set number of rows to 8 per page
  const [searchTerm, setSearchTerm] = useState(""); // For searching fuel records

  const navigate = useNavigate();

  // Fetch vehicle name using vehicle_id (which is a unique document ID)
  const fetchVehicleName = async (vehicle) => {
    try {

        // fuelData! {"fuel_cost":0,"fuel_quantity":"","fuel_station":"","odometer_reading":"","receipt_number":"567890","vehicle_id":{"converter":null,"_key":{"path":{"segments":["projects","fleet-management-9dd1f","databases","(default)","documents","vehicle","UONOcNCwcZ6iLHwDH6EO"],"offset":5,"len":2}},"type":"document","firestore":{"app":{"_isDeleted":false,"_options":{"apiKey":"AIzaSyCc1SIeYlVXiEjWB-gitEJGAgnZm0xrPpk","authDomain":"fleet-management-9dd1f.firebaseapp.com","projectId":"fleet-management-9dd1f","storageBucket":"fleet-management-9dd1f.appspot.com","messagingSenderId":"545153357303","appId":"1:545153357303:web:b3b25562eea3719a61caf2","measurementId":"G-W5T03SEVR4"},"_config":{"name":"[DEFAULT]","automaticDataCollectionEnabled":false},"_name":"[DEFAULT]","_automaticDataCollectionEnabled":false,"_container":{"name":"[DEFAULT]","providers":{}}},"databaseId":{"projectId":"fleet-management-9dd1f","database":"(default)"},"settings":{"host":"firestore.googleapis.com","ssl":true,"ignoreUndefinedProperties":false,"cacheSizeBytes":41943040,"experimentalForceLongPolling":false,"experimentalAutoDetectLongPolling":true,"experimentalLongPollingOptions":{},"useFetchStreams":true}}},"date":""}
       console.log(" document!",vehicle?._key?.path?.segments[6]);
      const vehicleDocRef = doc(db, "vehicle", vehicle?._key?.path?.segments[6]); // Use vehicleId, not name
      const vehicleDoc = await getDoc(vehicleDocRef);
      console.log("No such document!",vehicleDoc);
      
      // Return vehicle name if the document exists, otherwise "Unknown Vehicle"
      return vehicleDoc.exists() ? vehicleDoc.data().name : "Unknown Vehicle";
    } catch (error) {
      console.error("Error fetching vehicle name:", error);
      return "Unknown Vehicle";
    }
  };

  // Memoize fetchData to avoid unnecessary re-renders
  const fetchData = useCallback(async () => {
    setLoading(true); 
    try {
      const fuelCollection = collection(db, "Fuel"); // Fetch fuel records
      const q = query(fuelCollection); // Modify query if needed (e.g., filtering by userDetails)
      const querySnapshot = await getDocs(q);
      
      // For each fuel record, fetch vehicle name using the vehicle_id
      const fuelDataWithVehicleName = await Promise.all(
        querySnapshot.docs.map(async (doc) => {
          const fuelData = doc.data();
        console.log(" fuelData!",JSON.stringify(fuelData));

          const vehicleName = await fetchVehicleName(fuelData.vehicle_id); // Fetch vehicle name
          return {
            id: doc.id,
            ...fuelData,
            vehicle_name: vehicleName, // Add vehicle name to the fuel data
          };
        })
      );
      setTableData(fuelDataWithVehicleName);
    } catch (error) {
      console.error("Error fetching documents: ", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleEdit = (id) => {
    navigate(`/fuel/${id}`); // Redirect to the detail page with fuel ID
  };

  // Pagination: Get current page data
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = tableData
    .filter((fuel) => 
      fuel.fuel_station?.toLowerCase().includes(searchTerm.toLowerCase()) || 
      fuel.receipt_number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fuel.vehicle_name?.toLowerCase().includes(searchTerm.toLowerCase()) // Search by vehicle name
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
      <MetaData title='View Fuel List' />
      
      <div>
        <h2>Fuel List</h2>
        <input
          type="text"
          placeholder="Search by Fuel Station, Receipt Number, or Vehicle Name"
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
                <th>Fuel Station</th>
                <th>Fuel Cost</th>
                <th>Fuel Quantity</th>
                <th>Odometer Reading</th>
                <th>Receipt Number</th>
                <th>View</th>
              </tr>
            </thead>
            <tbody>
              {currentRows.length > 0 ? (
                currentRows.map((fuel, rowIndex) => (
                  <tr key={`fuel-${rowIndex}`}>
                    <td>{fuel.vehicle_name}</td>
                    <td>{fuel.fuel_station}</td>
                    <td>{fuel.fuel_cost}</td>
                    <td>{fuel.fuel_quantity}</td>
                    <td>{fuel.odometer_reading}</td>
                    <td>{fuel.receipt_number}</td>
                    <td>
                      <FaEye 
                        style={{ cursor: 'pointer' }} 
                        color="blue" 
                        onClick={() => handleEdit(fuel.id)} 
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7">No fuel records found</td>
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

export default ViewFuelList;

import { useState, useEffect , useCallback } from "react";
import { db } from '../../../firebase'; // Firebase instance
import { collection, query, where, getDocs } from "firebase/firestore";
import ClipLoader from "react-spinners/ClipLoader";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Import for routing
const ViewVehicle = ({ userDetails }) => {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state for the spinner
  const navigate = useNavigate()
  // Memoize fetchData to avoid unnecessary re-renders
  const fetchData = useCallback(async () => {
    setLoading(true); 
    try {
      const vehicleCollection = collection(db, "vehicle");
      const q = query(vehicleCollection, where("email", "==", userDetails?.email));
      const querySnapshot = await getDocs(q);
      const vehicleData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTableData(vehicleData);
    } catch (error) {
      console.error("Error fetching documents: ", error);
    } finally {
      setLoading(false);
    }
  }, [ userDetails?.email]); // Add dependencies userDetails.email

  const handleEdit = (id) => {
    navigate(`/vehicle/${id}`); // Redirect to the detail page with vehicle ID
  };

  // Fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, [fetchData]); // Include fetchData as a dependency

  return (
    <>
      {loading ? (
        <div className="spinner-container">
          <ClipLoader color={"#36D7B7"} loading={loading} size={50} />
        </div>
      ) : (
        <table className="table">
        <thead>
          <tr>
            <th>Vehicle Name</th>
            <th>Vehicle Type</th>
            <th>View</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((vehicle, rowIndex) => (
            <tr key={`tr-${rowIndex}`}>
              <td>{vehicle.name}</td>
              <td>{vehicle.type}</td>
              <td>
              <FaEye style={{cursor:'pointer'}} color="blue" onClick={() => handleEdit(vehicle.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
       )}
    </>
  );
};

export default ViewVehicle;

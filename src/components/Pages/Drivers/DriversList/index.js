import { useState, useEffect, useCallback } from "react";
import { db } from '../../../firebase'; // Firebase instance
import { collection, query, getDocs } from "firebase/firestore";
import ClipLoader from "react-spinners/ClipLoader";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Import for routing
import MetaData from "../../../MetaData";

const ViewDriverList = () => {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state for the spinner
  const [currentPage, setCurrentPage] = useState(1); // For pagination
  const [rowsPerPage] = useState(8); // Set number of rows to 8 per page
  const [searchTerm, setSearchTerm] = useState(""); // For searching driver records

  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    setLoading(true); 
    try {
      const driverCollection = collection(db, "Drivers");
      const q = query(driverCollection);
      const querySnapshot = await getDocs(q);
      const driverData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTableData(driverData);
    } catch (error) {
      console.error("Error fetching documents: ", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleEdit = (id) => {
    navigate(`/driver/${id}`); // Redirect to the detail page with driver ID
  };

  // Pagination: Get current page data
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = tableData
    .filter((driver) => 
      driver.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
      driver.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.contact_number?.toLowerCase().includes(searchTerm.toLowerCase())
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
      <MetaData title='View Driver List' />

      <div>
        <h2>Driver List</h2>
        <input
          type="text"
          placeholder="Search by First Name, Last Name, Email, or Contact Number"
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
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Contact Number</th>
                <th>License Number</th>
                <th>License Expiry Date</th>
                <th>Date of Birth</th>
                <th>Status</th>
                <th>View</th>
              </tr>
            </thead>
            <tbody>
              {currentRows.length > 0 ? (
                currentRows.map((driver, rowIndex) => (
                  <tr key={`driver-${rowIndex}`}>
                    <td>{driver.first_name}</td>
                    <td>{driver.last_name}</td>
                    <td>{driver.email}</td>
                    <td>{driver.contact_number}</td>
                    <td>{driver.license_number}</td>
                    <td>{new Date(driver.license_expiry_date.toDate()).toLocaleDateString()}</td>
                    <td>{new Date(driver.date_of_birth.toDate()).toLocaleDateString()}</td>
                    <td>{driver.status}</td>
                    <td>
                      <FaEye 
                        style={{ cursor: 'pointer' }} 
                        color="blue" 
                        onClick={() => handleEdit(driver.id)} 
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9">No drivers found</td>
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

export default ViewDriverList;


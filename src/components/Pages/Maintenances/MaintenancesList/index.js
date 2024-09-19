import React, { useState, useEffect, useCallback } from "react";
import { db } from '../../../firebase'; // Firebase instance
import { collection, query, getDocs } from "firebase/firestore";
import ClipLoader from "react-spinners/ClipLoader";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Import for routing
import MetaData from "../../../MetaData";

const ViewMaintenance = () => {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state for the spinner
  const [currentPage, setCurrentPage] = useState(1); // For pagination
  const [rowsPerPage] = useState(8); // Set number of rows to 8 per page
  const [searchTerm, setSearchTerm] = useState(""); // For searching maintenance records

  const navigate = useNavigate();

  // Fetch maintenance data
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const maintenanceCollection = collection(db, "Maintenances");
      const q = query(maintenanceCollection);
      const querySnapshot = await getDocs(q);
      const maintenanceData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTableData(maintenanceData);
    } catch (error) {
      console.error("Error fetching documents: ", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleEdit = (id) => {
    navigate(`/maintenance/${id}`); // Redirect to the detail page with maintenance ID
  };

  // Pagination: Get current page data
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = tableData
    .filter((maintenance) =>
      maintenance.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      maintenance.vehicle_id?.toLowerCase().includes(searchTerm.toLowerCase())
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
      <MetaData title='View Maintenance' />
      <div>
        <h2>Maintenance List</h2>
        <input
          type="text"
          placeholder="Search by Description or Vehicle ID"
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
                <th>Cost</th>
                <th>Description</th>
                <th>Maintenance Date</th>
                <th>Next Due Date</th>
                <th>Odometer Reading</th>
                <th>Vehicle ID</th>
                <th>View</th>
              </tr>
            </thead>
            <tbody>
              {currentRows.length > 0 ? (
                currentRows.map((maintenance, rowIndex) => (
                  <tr key={`maintenance-${rowIndex}`}>
                    <td>{maintenance.cost}</td>
                    <td>{maintenance.description}</td>
                    <td>{new Date(maintenance.maintenance_date.toDate()).toLocaleDateString()}</td>
                    <td>{new Date(maintenance.next_due_date.toDate()).toLocaleDateString()}</td>
                    <td>{maintenance.odometer_reading}</td>
                    <td>{maintenance.vehicle_id}</td>
                    <td>
                      <FaEye 
                        style={{ cursor: 'pointer' }} 
                        color="blue" 
                        onClick={() => handleEdit(maintenance.id)} 
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7">No maintenance records found</td>
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

export default ViewMaintenance;

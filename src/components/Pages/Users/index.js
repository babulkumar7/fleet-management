import React, { useState, useEffect, useCallback } from "react";
import { db } from '../../firebase'; // Firebase instance
import { collection, query, getDocs } from "firebase/firestore";
import ClipLoader from "react-spinners/ClipLoader";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Import for routing
import MetaData from "../../MetaData";

const ViewUsers = () => {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state for the spinner
  const [currentPage, setCurrentPage] = useState(1); // For pagination
  const [rowsPerPage] = useState(8); // Set number of rows to 8 per page
  const [searchTerm, setSearchTerm] = useState(""); // For searching users

  const navigate = useNavigate();

  // Fetch user data
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const usersCollection = collection(db, "Users");
      const q = query(usersCollection);
      const querySnapshot = await getDocs(q);
      const usersData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTableData(usersData);
    } catch (error) {
      console.error("Error fetching documents: ", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleView = (id) => {
    navigate(`/user/${id}`); // Redirect to the detail page with user ID
  };

  // Pagination: Get current page data
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = tableData
    .filter((user) =>
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName?.toLowerCase().includes(searchTerm.toLowerCase())
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
      <MetaData title='View Users' />
      <div>
        <h2>User List</h2>
        <input
          type="text"
          placeholder="Search by Email, First Name, or Last Name"
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
                <th>Photo</th>
                <th>Email</th>
                <th>Name</th>
                <th>Role</th>
                <th>Type</th>

                <th>View</th>
              </tr>
            </thead>
            <tbody>
              {currentRows.length > 0 ? (
                currentRows.map((user, rowIndex) => (
                  <tr key={`user-${rowIndex}`}>
                    <td>
                      <img
                        src={user.photo}
                        alt={`${user.firstName} ${user.lastName}`}
                        style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                      />
                    </td>
                    <td>{user.email}</td>
                    <td>{user.firstName}</td>
                    <td>{user.role}</td>
                    <td>{user.type}</td>

                    <td>
                      <FaEye 
                        style={{ cursor: 'pointer' }} 
                        color="blue" 
                        onClick={() => handleView(user.id)} 
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No users found</td>
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

export default ViewUsers;

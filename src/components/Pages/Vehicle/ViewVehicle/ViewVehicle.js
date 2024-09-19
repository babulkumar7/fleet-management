import { useState, useEffect, useCallback } from "react";
import { db } from '../../../firebase'; // Firebase instance
import { collection, getDocs } from "firebase/firestore";
import ClipLoader from "react-spinners/ClipLoader";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Import for routing
import MetaData from "../../../MetaData";

// Material UI table
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination'; // For pagination

// Styled components for the table
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const ViewVehicle = ({ userDetails }) => {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state for the spinner
  const [currentPage, setCurrentPage] = useState(1); // For pagination
  const [rowsPerPage] = useState(8); // Set number of rows to 8 per page
  const [searchTerm, setSearchTerm] = useState(""); // For searching vehicle records
  const navigate = useNavigate();

  // Fetch data from Firestore
  const fetchData = useCallback(async () => {
    setLoading(true); 
    try {
      const vehicleCollection = collection(db, "vehicle");
      const querySnapshot = await getDocs(vehicleCollection);
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
  }, []);

  const handleEdit = (id) => {
    navigate(`/vehicle/${id}`); // Redirect to the detail page with vehicle ID
  };

  // Pagination logic
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = tableData
    .filter((vehicle) =>
      vehicle.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.type?.toLowerCase().includes(searchTerm.toLowerCase()) // Search by vehicle name or type
    )
    .slice(indexOfFirstRow, indexOfLastRow);

  // Change page
  const paginate = (event, value) => setCurrentPage(value);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <MetaData title='View Vehicle' />
      
      <div>
        <h2>Vehicle List</h2>
        <input
          type="text"
          placeholder="Search by Vehicle Name or Type"
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
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="vehicle table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Vehicle Name</StyledTableCell>
                  <StyledTableCell>Vehicle Type</StyledTableCell>
                  <StyledTableCell align="center">View</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentRows.length > 0 ? (
                  currentRows.map((vehicle, rowIndex) => (
                    <StyledTableRow key={`vehicle-${rowIndex}`}>
                      <StyledTableCell component="th" scope="row">
                        {vehicle.name}
                      </StyledTableCell>
                      <StyledTableCell>{vehicle.type}</StyledTableCell>
                      <StyledTableCell align="center">
                        <FaEye
                          style={{ cursor: 'pointer' }}
                          color="blue"
                          onClick={() => handleEdit(vehicle.id)}
                        />
                      </StyledTableCell>
                    </StyledTableRow>
                  ))
                ) : (
                  <StyledTableRow>
                    <StyledTableCell colSpan="3" align="center">No vehicles found</StyledTableCell>
                  </StyledTableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          <Pagination
            count={Math.ceil(tableData.length / rowsPerPage)}
            page={currentPage}
            onChange={paginate}
            color="primary"
            className="mt-3"
          />
        </>
      )}
    </>
  );
};

export default ViewVehicle;

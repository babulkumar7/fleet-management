import React, { useState, useEffect, useCallback } from "react";
import { collection, getDocs, query } from "firebase/firestore"; // Firestore imports
import { db } from '../../firebase'; // Firebase instance
import { csvFormat } from "d3-dsv"; // For CSV formatting
import { saveAs } from "file-saver"; // For saving CSV

const Reports = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [trips, setTrips] = useState([]);
  //const [filteredTrips, setFilteredTrips] = useState([]);

  // Fetch all trips from Firestore when the component mounts
  const fetchTrips = useCallback(async () => {
    try {
      const tripCollection = collection(db, "trips");
      const q = query(tripCollection);
      const querySnapshot = await getDocs(q);
      const tripData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTrips(tripData);
    } catch (error) {
      console.error("Error fetching trips:", error);
    }
  }, []);

  useEffect(() => {
    fetchTrips();
  }, [fetchTrips]);

  // Function to filter trips based on selected dates
  const filterTripsByDate = () => {
    if (startDate && endDate) {
      const filtered = trips.filter(trip => {
        const tripDate = new Date(trip.start_time); // Assuming start_time is stored in a valid date format
        return tripDate >= new Date(startDate) && tripDate <= new Date(endDate);
      });
    //  setFilteredTrips(filtered);
    } else {
     // setFilteredTrips(trips); // Show all trips if no date is selected
    }
  };

  // Function to generate CSV file
  const generateCSV = (data) => {
    const csvData = data.map((trip) => ({
      start_time: new Date(trip.start_time).toLocaleString(),
      end_time: new Date(trip.end_time).toLocaleString(),
      vehicle_id: trip.vehicle_id,
      driver_id: trip.driver_id,
      distance_traveled: trip.distance_traveled,
      duration: trip.duration,
      trip_status: trip.trip_status,
    }));

    const csvContent = csvFormat(csvData);
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
    // Get current date and time for the filename
    const currentDate = new Date();
    const formattedDate = currentDate
      .toLocaleString()
      .replace(/[/,: ]/g, "-"); // Format to remove special characters
    const filename = `trips_report_${formattedDate}.csv`;
  
    saveAs(blob, filename);
  };

  const handleGenerateReport = () => {
    filterTripsByDate();
    generateCSV(trips);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Generate Trip Report</h2>
      <div className="row">
        <div className="col-md-4">
          <label htmlFor="startDate" className="form-label">
            Start Date:
          </label>
          <input
            type="date"
            id="startDate"
            className="form-control mb-3"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <label htmlFor="endDate" className="form-label">
            End Date:
          </label>
          <input
            type="date"
            id="endDate"
            className="form-control mb-3"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <div style={{ marginBottom :'1rem' }}  className="col-md-4 d-flex align-items-end">
          <button className="btn btn-primary" onClick={handleGenerateReport}>
            Generate CSV
          </button>
        </div>
      </div>

      {/* Display the list of trips */}
      <h3 className="mt-4">Trip List</h3>
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Vehicle ID</th>
            <th>Driver ID</th>
            <th>Distance Traveled</th>
            <th>Duration</th>
            <th>Trip Status</th>
          </tr>
        </thead>
        <tbody>
          {trips.length > 0 ? (
            trips.map((trip, index) => (
              <tr key={index}>
                <td>{new Date(trip.start_time).toLocaleString()}</td>
                <td>{new Date(trip.end_time).toLocaleString()}</td>
                <td>{trip.vehicle_id}</td>
                <td>{trip.driver_id}</td>
                <td>{trip.distance_traveled}</td>
                <td>{trip.duration}</td>
                <td>{trip.trip_status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
                No trips available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Reports;

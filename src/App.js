import React, { useEffect, useState } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/login";
import SignUp from "./components/register";
import Dashboard from "./components/dashboard";
import { ToastContainer } from "react-toastify";
import { auth, db } from "./components/firebase";
import Tracker from "./components/Pages/Dashboard/Tracker";
import AddVehicle from "./components/Pages/Vehicle/AddVehicle/AddVehicle";
// import ViewVehicle from "./components/Pages/Vehicle/ViewVehicle/ViewVehicle";
import ViewExistingVehicle  from "./components/Pages/Vehicle/ViewExistingVehicle/ViewExistingVehicle";
import VehicleDetail from "./components/Pages/Vehicle/VehicleDetail";
import VehicleDashboard from "./components/Pages/Vehicle/VehicleDetailPage/VehicleDashboard/VehicleDashboard";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import {HelmetProvider} from "react-helmet-async"
import AddFuel from "./components/Pages/Fuel/AddFuel";
import ViewFuelList from "./components/Pages/Fuel/FuelList";
import ViewDriverList from "./components/Pages/Drivers/DriversList";
import AddDriver from "./components/Pages/Drivers/AddDrivers";
import AddMaintances from "./components/Pages/Maintenances/AddMaintances";
import MaintenancesList from "./components/Pages/Maintenances/MaintenancesList";
import AddTrip from "./components/Pages/Trips/AddTrips";
import ViewTripsList from "./components/Pages/Trips/TripList";
import ViewUsers from "./components/Pages/Users";
import Reports from "./components/Pages/Reports";
import SendSMS from "./components/Pages/SendSMS/SendSMS";
import { doc, getDoc } from "firebase/firestore";
import VehicleTracker from "./components/Pages/Vehicle/VehicleTracker/VehicleTracker";

function App() {
  const [user, setUser] = useState(null);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      console.log('User:', user);
    });

    return () => unsubscribe();
  }, []);

  const fetchUserData = async (uid) => {
    try {
      // Query Firestore for the user document based on UID
      const userDocRef = doc(db, 'Users', uid);
      const userDocSnapshot = await getDoc(userDocRef);
      if (userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data();
        setUserDetails({
          photo: userData?.photo,
          firstName: `${userData?.firstName} ${userData?.lastName}`,
          email: userData?.email
        });
        console.log("User data:", userData);
      } else {
        console.log("No such user document in Firestore!");
      }
    } catch (error) {
      console.error("Error fetching user details from Firestore:", error);
    }
  };

  useEffect(() => {
    if (user?.uid) {
      fetchUserData(user.uid);
    }
  }, [user]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State to control the sidebar

  // Function to toggle the sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <HelmetProvider>
    <Router>
      {user ? (
        <>
          <Header toggleSidebar={toggleSidebar} userDetails={userDetails} />
          <div data-theme="dark" className="main d-flex">
            {/* <div className="sidebarWrapper"> */}
              <Sidebar isSidebarOpen={isSidebarOpen} userDetails={user.uid} />
            {/* </div> */}
            <div className="content">
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                {/* <Route path="/tracking" element={<Tracker />} /> */}
                <Route path="/add-vehicle" element={<AddVehicle userDetails={userDetails} />} />
                <Route path="/view-viewExistingVehicle" element={<ViewExistingVehicle/>} /> 
                {/* <Route path="/view-vehicleDashboard" element={<VehicleDashboard/>} />  */}
                <Route path="/view-vehicleDashboard/:id" element={<VehicleDashboard />} />
                <Route path="/vehicle-dashboard/:id" element={<VehicleDashboard />} />

                {/* <Route path="/view-vehicle" element={<VehicleList userDetails={userDetails} />} />*/}
                <Route path="/view-vehicle" element={<VehicleTracker userDetails={userDetails} />} />
                <Route path="/vehicle/:id" element={<VehicleDetail />} />
                {userDetails?.type ==='school'?
              <>
                <Route path="/send-sms" element={<SendSMS />} />
                </>
                :
              <>
                <Route path="/add-fuel" element={<AddFuel/>} />
                <Route path="/view-fuel" element={<ViewFuelList/>} />
                <Route path="/add-maintenance" element={<AddMaintances/>} />
                <Route path="/view-maintenance" element={<MaintenancesList/>} />
                <Route path="/add-trip" element={<AddTrip/>} />
                <Route path="/view-trip" element={<ViewTripsList/>} />
              </>
                }
                <Route path="/add-driver" element={<AddDriver/>} />
                <Route path="/view-driver" element={<ViewDriverList/>} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/users" element={<ViewUsers />} />
                <Route path="*" element={<Navigate to="/dashboard" />} />
              </Routes>
            </div>
          </div>
        </>

      ) : (
        <div className="App">
          <div className="auth-wrapper">
            <div className="auth-inner">
              <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/register" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<Navigate to="/login" />} />
              </Routes>
            </div>
          </div>
        </div>
      )}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Router>
    </HelmetProvider>
  );
}

export default App;

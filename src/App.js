import React, { useEffect, useState } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/login";
import SignUp from "./components/register";
import Dashboard from "./components/dashboard";
import { ToastContainer } from "react-toastify";
import { auth } from "./components/firebase";
import Tracker from "./components/Pages/Dashboard/Tracker";
import AddVehicle from "./components/Pages/Vehicle/AddVehicle/AddVehicle";
import ViewVehicle from "./components/Pages/Vehicle/ViewVehicle/ViewVehicle";
import VehicleDetail from "./components/Pages/Vehicle/VehicleDetail";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

function App() {
  const [user, setUser] = useState(null);
  const [userDetails, SetuserDetails] = useState(null);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      SetuserDetails({ photo: user?.photoURL, firstName: user?.displayName, email: user?.email })
      console.log('data', user);
    });
    return () => unsubscribe();
  }, []);
  return (
    <Router>
      {user ? (
        <>
          <Header userDetails={userDetails} />
          <div className="main d-flex">
            <div className="sidebarWrapper">
              <Sidebar />
            </div>
            <div className="content">
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/tracking" element={<Tracker />} />
                <Route path="/add-vehicle" element={<AddVehicle userDetails={userDetails} />} />
                <Route path="/view-vehicle" element={<ViewVehicle userDetails={userDetails} />} />
                <Route path="/vehicle/:id" element={<VehicleDetail />} />
                <Route path="/fuel" element={<Dashboard />} />
                <Route path="/reports" element={<Dashboard />} />
                <Route path="/users" element={<Dashboard />} />
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
  );
}

export default App;

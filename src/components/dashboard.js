import React, { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
// import InnerDashboard from "./Header/index";
//import MainDashboard  from "./Pages/Dashboard";
// import Header from "./Header";
// import Sidebar from "./Sidebar";
function Dashboard() {
  const [userDetails, setUserDetails] = useState(null);

  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const docRef = doc(db, "Users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserDetails(docSnap.data());
          console.log(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } else {
        console.log("User is not logged in");
      }
    });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  // const handleLogout = async () => {
  //   try {
  //     await auth.signOut();
  //     window.location.href = "/login";
  //     console.log("User logged out successfully!");
  //   } catch (error) {
  //     console.error("Error logging out:", error.message);
  //   }
  // };

  return (
    <div>
      {userDetails ? (
        <>
          {/* <Header userDetails={userDetails} />
          <div className="main d-flex">
            <div className="sidebarWrapper">
              <Sidebar />
            </div>
            <div className="content">

            </div>
          </div> */}
          {/* <InnerDashboard userDetails={userDetails}/> */}
          {/* <MainDashboard userDetails={userDetails}/> */}
          {/* <div className="display: flex; flex-direction: column; background-color: white;">
          <AppHeader />
      <div className="SideMenuAndPageContent">
        <SideMenu></SideMenu>
        <PageContent></PageContent>
      </div>
      <AppFooter />
      </div> */}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Dashboard;
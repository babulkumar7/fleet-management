import React, { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import MetaData from "./MetaData";
import MainDashboard  from "./Pages/Dashboard/index";
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


  return (
    <div>
      <MetaData title='Home'></MetaData>
      {userDetails ? (
        <>
     <MainDashboard />
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
      
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Dashboard;
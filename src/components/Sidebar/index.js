import Button from '@mui/material/Button';
import { MdDashboard } from "react-icons/md";
import { FaAngleRight, FaAngleDown, FaBus, FaUser, FaTools, FaMapMarkerAlt } from "react-icons/fa";
import { BsFillFuelPumpFill } from "react-icons/bs";
import { TbGps, TbReportSearch } from "react-icons/tb";
import { GiSteeringWheel } from "react-icons/gi";
import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
// import { SidebarContext } from '../../context/sidebarContext';
import { MdSms } from "react-icons/md";
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import "./index.css";

const fleetmenuItems = [
  { name: "Dashboard", icon: <MdDashboard />, link: "/dashboards" },
  {
    name: "Vehicle", icon: <FaBus />, link: "",
    subMenu: [
      { name: "Add Vehicle", link: "/add-vehicle" },
      { name: "View Vehicle", link: "/view-vehicle" },
      { name: "view Existing Vehicle", link: "/view-viewExistingVehicle" },
      // { name: "view vehicleDashboard", link: "/view-vehicleDashboard" },
    ]
  },
  {
    name: "Driver's", icon: <GiSteeringWheel />, link: "",
    subMenu: [
      { name: "Add Driver", link: "/add-driver" },
      { name: "View Driver List", link: "/view-driver" }
    ]
  },
  {
    name: "Fuel", icon: <BsFillFuelPumpFill />, link: "",
    subMenu: [
      { name: "Add Fuel", link: "/add-fuel" },
      { name: "View Fuel List", link: "/view-fuel" }
    ]
  },
  {
    name: "Maintenance", icon: <FaTools />, link: "",
    subMenu: [
      { name: "Add Maintenance", link: "/add-maintenance" },
      { name: "View Maintenance List", link: "/view-maintenance" }
    ]
  },
  {
    name: "Trip's", icon: <FaMapMarkerAlt />, link: "",
    subMenu: [
      { name: "Add Trip", link: "/add-trip" },
      { name: "View Trip", link: "/view-trip" }
    ]
  },
  // { name: "Tracking", icon: <TbGps />, link: "/tracking" },
  { name: "Reports", icon: <TbReportSearch />, link: "/reports" },
  { name: "Users", icon: <FaUser />, link: "/users" }
];
const schoolmenuItems = [
  { name: "Dashboard", icon: <MdDashboard />, link: "/dashboards" },
  {
    name: "Vehicle", icon: <FaBus />, link: "",
    subMenu: [
      { name: "Add Vehicle", link: "/add-vehicle" },
      { name: "View Vehicle", link: "/view-vehicle" }
    ]
  },
  {
    name: "Driver's", icon: <GiSteeringWheel />, link: "",
    subMenu: [
      { name: "Add Driver", link: "/add-driver" },
      { name: "View Driver List", link: "/view-driver" }
    ]
  },
  // { 
  //   name: "Fuel", icon: <BsFillFuelPumpFill />, link: "", 
  //   subMenu: [
  //     { name: "Add Fuel", link: "/add-fuel" }, 
  //     { name: "View Fuel List", link: "/view-fuel" }
  //   ]
  // },
  // { 
  //   name: "Maintenance", icon: <FaTools />, link: "", 
  //   subMenu: [
  //     { name: "Add Maintenance", link: "/add-maintenance" }, 
  //     { name: "View Maintenance List", link: "/view-maintenance" }
  //   ]
  // },
  // { 
  //   name: "Trip's", icon: <FaMapMarkerAlt />, link: "", 
  //   subMenu: [
  //     { name: "Add Trip", link: "/add-trip" }, 
  //     { name: "View Trip", link: "/view-trip" }
  //   ]
  // },
  // { name: "Tracking", icon: <TbGps />, link: "/tracking" },
  { name: "Send SMS", icon: <MdSms />, link: "/send-sms" },
  { name: "Reports", icon: <TbReportSearch />, link: "/reports" },
  { name: "Users", icon: <FaUser />, link: "/users" }
];

const Sidebar = ({ isSidebarOpen, userDetails }) => {

  const [activeTab, setActiveTab] = useState(null);
  const [menuItems, setMenuItems] = useState([]);

  const [isToggleSubmenu, setIsToggleSubmenu] = useState(false);
  //const { isSidebarOpen } = useContext(SidebarContext);
  //const [sidebarClass, setSidebarClass] = useState("sidebar-change");

  const isOpenSubMenu = (index) => {
    setActiveTab(index);
    setIsToggleSubmenu(activeTab === index ? !isToggleSubmenu : true);
  };

  const fetchUserData = async (uid) => {

    try {
      // Query Firestore for the user document based on UID
      const userDocRef = doc(db, 'Users', uid);
      const userDocSnapshot = await getDoc(userDocRef);
      if (userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data();
        console.log("userData", userData);
        if (userData?.type === 'School') {
          setMenuItems(schoolmenuItems);
        } else {
          setMenuItems(fleetmenuItems);
        }
      } else {
        console.log("No such user document in Firestore!");
      }
    } catch (error) {
      console.error("Error fetching user details from Firestore:", error);
    }
  }
  useEffect(() => {
    fetchUserData(userDetails);
  }, [userDetails]);

  return (
    
    <div className={`sidebarWrapper`}       style={{ display: isSidebarOpen ? 'block' : 'none' }}  // Conditionally apply display style
>

    <div className={`sidebar`}>
      <ul>
        {menuItems.map((item, index) => (
          <li key={index} onClick={() => isOpenSubMenu(index)}>
            {item.link ? (
              <Link to={item.link}>
                <Button className={`w-100 ${activeTab === index ? 'active' : ''}`}>
                  <span className="icon">{item.icon}</span>
                  {item.name}
                  <span className="arrow">{item.subMenu ? (activeTab === index && isToggleSubmenu ? <FaAngleDown /> : <FaAngleRight />) : ''}</span>
                </Button>
              </Link>
            ) : (
              <Button className={`w-100 ${activeTab === index ? 'active' : ''}`}>
                <span className="icon">{item.icon}</span>
                {item.name}
                <span className="arrow">{item.subMenu ? (activeTab === index && isToggleSubmenu ? <FaAngleDown /> : <FaAngleRight />) : ''}</span>
              </Button>
            )}

            {item.subMenu && (
              <div className={`submenuWrapper ${activeTab === index && isToggleSubmenu ? 'colapse' : 'colapsed'}`}>
                <ul className="submenu">
                  {item.subMenu.map((subItem, subIndex) => (
                    <li key={subIndex}>
                      <Link to={subItem.link}>{subItem.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
};

export default Sidebar;

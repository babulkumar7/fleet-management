import { Link } from "react-router-dom";
import Logo from '../../Images/Etiquette_Logo_290324-768x540.png'
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { CiLight } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import Button from '@mui/material/Button';
import { MdEmail } from "react-icons/md";
import { FaBell } from "react-icons/fa";
import SearchBox from "../Search";
import React, { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import "./index.css";

// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import Tooltip from '@mui/material/Tooltip';
// import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
//import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import useLocalStorage from "use-local-storage";
import { auth } from "../firebase";
function Header({ toggleSidebar, userDetails }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handlelogout = async () => {
    try {
      await auth.signOut();
      window.location.href = "/login";
      console.log("User logged out successfully!");
      setAnchorEl(null);
    } catch (error) {
    setAnchorEl(null);
      console.error("Error logging out:", error.message);
    }
  };
  const preference = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [isDark, setIsDark] = useLocalStorage("isDark", preference);

  return (
    <>
      <header data-theme={isDark ? "dark" : "light"} className="d-flex align-items-center">
        <div className="container-fluid w-100">
          <div className="d-flex align-items-center">
            <div className="col-sm-2">
              <Link to={'/'} ><img width={100} className="logo" src={Logo} alt="logo"></img></Link>
            </div>

            <div className="col-sm-3 d-flex align-items-center part2 pl-4">
              <Button onClick={toggleSidebar} className="rounded-circle mr-3"><AiOutlineMenuUnfold size={20} /></Button>
              <SearchBox />
            </div>

            <div className="col-sm-7 d-flex align-items-center justify-content-end part3 ">
              <Button onClick={()=>{setIsDark(!isDark)}} className="rounded-circle mr-4"><CiLight size={30} /></Button>
              <Button className="rounded-circle mr-3 "><MdDarkMode size={20} /></Button>
              {/* <Button className="rounded-circle mr-3"><FaShoppingCart  size={20} /></Button>
              <Button className="rounded-circle mr-3"><MdEmail size={20} /></Button> */}
              <Button className="rounded-circle mr-3"><FaBell size={20} /></Button>
              <div  >
                <div onClick={handleClick} className="my-account d-flex align-items-center">
                  <div className="userimg">
                    <span className="rounded-circle">
                      <img
                        alt=""
                        src={userDetails?.photo}
                      />
                    </span>
                  </div>
                  <div className="userInfo">
                    <h4> {userDetails?.firstName}</h4>
                  </div>
                </div>
              </div>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                slotProps={{
                  paper: {
                    elevation: 0,
                    sx: {
                      overflow: 'visible',
                      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                      mt: 1.5,
                      '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      '&::before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                      },
                    },
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <MenuItem onClick={handleClose}>
                  <Avatar /> Profile
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Avatar /> Reset Password
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <Settings fontSize="small" />
                  </ListItemIcon>
                  Settings
                </MenuItem>
                <MenuItem onClick={handlelogout}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
export default Header;

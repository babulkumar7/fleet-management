import Button from '@mui/material/Button';
import { MdDashboard } from "react-icons/md";
import { FaAngleRight } from "react-icons/fa";
import { FaBus } from "react-icons/fa";
import { BsFillFuelPumpFill } from "react-icons/bs";
import { TbGps } from "react-icons/tb";
import { TbReportSearch } from "react-icons/tb";
import { FaUser } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FaAngleDown } from "react-icons/fa6";

const Sidebar = () => {
    const [activeTab,setActiveTab] = useState(0);
    const [isToggleSubmenu,setIsToggleSubmenu] = useState(false);

    const isOpenSubMenu=(index)=>{
        setActiveTab(index);
        setIsToggleSubmenu(!isToggleSubmenu);
    }
    return (
        <>
            <div className="sidebar">
                <ul>
                    <li>
                        <Link to="/dashboards">
                            <Button className={`w-100 ${activeTab===0 ? 'active':''}`} onClick={()=>isOpenSubMenu(0)}> <span className='icon'><MdDashboard />
                            </span>Dashboard
                                <span className='arrow'><FaAngleRight />
                                </span></Button>
                        </Link>
                    </li>
                    <li>
                        <Button className={`w-100 ${activeTab===1  ? 'active':''}`} onClick={()=>isOpenSubMenu(1)}> <span className='icon'><FaBus />
                        </span>vehicle
                            <span className='arrow'> {activeTab===1 && isToggleSubmenu===true ? <FaAngleDown/>: <FaAngleRight />}
                            </span></Button>
                        <div className={`submenuWrapper ${activeTab===1 && isToggleSubmenu===true ? 'colapse':'colapsed'}`}>

                        <ul className='submenu'>
                            <li> <Link to="/add-vehicle">Add vehicle</Link></li>
                            <li> <Link to="/view-vehicle">View vehicle</Link></li>
                        </ul>
                        </div>
                    </li>
                    <li>
                        <Link to="/fuel">
                            <Button className={`w-100 ${activeTab===2 ? 'active':''}`} onClick={()=>isOpenSubMenu(2)}> <span className='icon'><BsFillFuelPumpFill />
                            </span>Fuel
                                <span className='arrow'><FaAngleRight />
                                </span></Button>
                        </Link>
                    </li>
                    <li>
                        <Link to="/tracking">
                            <Button className={`w-100 ${activeTab===3 ? 'active':''}`} onClick={()=>isOpenSubMenu(3)}> <span className='icon'><TbGps />
                            </span>Tracking
                                <span className='arrow'><FaAngleRight />
                                </span></Button>
                        </Link>
                    </li>
                    <li>
                        <Link to="/reports">
                            <Button className={`w-100 ${activeTab===4 ? 'active':''}`} onClick={()=>isOpenSubMenu(4)}> <span className='icon'><TbReportSearch />
                            </span>Reports
                                <span className='arrow'><FaAngleRight />
                                </span></Button>
                        </Link>
                    </li>
                    <li>
                        <Link to="/users">
                            <Button className={`w-100 ${activeTab===5 ? 'active':''}`} onClick={()=>isOpenSubMenu(5)}> <span className='icon'><FaUser />
                            </span>Users
                                <span className='arrow'><FaAngleRight />
                                </span></Button>
                        </Link>
                    </li>
                </ul>
            </div>
        </>

    )
}

export default Sidebar

import DashbordBox from "./DashboardBox"
import { FaMapMarkerAlt } from "react-icons/fa";
import { GiSteeringWheel } from "react-icons/gi";
import { FaTools } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";
import { VscGraphLine } from "react-icons/vsc";
import { Chart } from "react-google-charts";
import { background } from "@chakra-ui/react";
export const datagraph = [
    ["Year", "Sales", "Expenses"],
    ["2021", 1000, 400],
    ["2022", 1170, 460],
    ["2023", 660, 1120],
    ["2024", 1030, 540],
];

export const optionsdatagraph = {
    'backgroundColor': 'transparent'
};
export const data = [
    ["City", "2010 Population", "2000 Population"],
    ["New York City, NY", 8175000, 8008000],
    ["Los Angeles, CA", 3792000, 3694000],
    ["Chicago, IL", 2695000, 2896000],
    ["Houston, TX", 2099000, 1953000],
    ["Philadelphia, PA", 1526000, 1517000],
];

export const options = {
    title: "Population of Largest U.S. Cities",
    chartArea: { width: "50%" },
    hAxis: {
        title: "Total Population",
        minValue: 0,
    },
    vAxis: {
        title: "City",
    },
};

const Dashboard = ({ userDetails }) => {
    return (
        <>
            <div className="row dashbordWrapperRow">
                <div className="col-md-8">

                    <div className="dashbordWrapper d-flex">

                        <DashbordBox color={["#1da256", "#48d483"]} grow={true} percentage="0.23%" value='398' title='Customers' icon={<FaUserAlt />} />
                        <DashbordBox color={["#c012e2", "#eb64fe"]} grow={true} percentage="5.23%" value='250' title='Trips' icon={<FaMapMarkerAlt />} />
                        <DashbordBox color={["#2c78e5", "#60aff5"]} grow={false} percentage="-1.74%" value='78' title='Drivers' icon={<GiSteeringWheel />} />
                        <DashbordBox color={["#e1950e", "#f3cd29"]} grow={true} percentage="6.23%" value='23' title='Maintenance' icon={<FaTools />} />

                    </div>
                </div>
                <div className="col-md-4 pl-0 box">
                    <div className="graphBox">
                        <h3 className="text-white mb-4 mt-0">  Total Sales  </h3>
                        <h4 className="text-white font-weight-bold">  ₹ 3,899,8399.03  </h4>
                        <p className="text-white ">₹ 3,222,6382.00 in last month</p>
       <span   className="graphBoxchart"> <VscGraphLine /></span>
                       
                        {/* <Chart 
                        className="graphBoxchart"
                            chartType="AreaChart"
                            width="100%"
                            height="200px"
                            data={datagraph}
                            options={optionsdatagraph}

                        /> */}
                    </div>
                </div>
                <Chart
                    chartType="BarChart"
                    width="100%"
                    height="400px"
                    data={data}
                    options={options}
                />
            </div>
        </>
    )
}
export default Dashboard
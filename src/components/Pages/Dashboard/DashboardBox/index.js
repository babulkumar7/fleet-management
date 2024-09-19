import { HiDotsVertical } from "react-icons/hi";
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
const DashbordBox = (props) => {
  
    return (
        <>
        
            <div className="dashbordBox" style={{
                backgroundImage: `linear-gradient(to right, ${props.color?.[0]} ,  ${props.color?.[1]})`
            }}>
       
                <div className="d-flex w-100">
                    <div className="col1">
                        <h4 className="text-white">Total {props.title}</h4>
                        <span className="text-white">  {props?.value}</span>
                    </div> 
                    <div className="ml-auto">
                    <span className="icon">

                    {props?.icon}
                        
                    </span>
                    </div>
                </div>
                 <div className="d-flex align-item-center">
                 <h4 className="text-white mb-0 mt-0">         {
                    props.grow ===true ?
                    <span className="chart">  <TrendingUpIcon/></span> :
                    <span className="chart">  <TrendingDownIcon/></span> 
                    

                } {props.percentage} Last Month </h4>
                 {/* <span className="mt-0 toggleIc">  <HiDotsVertical />
                 </span>
  */}
                 </div>
            </div>
        </>
    )
}

export default DashbordBox

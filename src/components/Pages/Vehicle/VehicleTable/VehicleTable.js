import React, { useState } from 'react';
import "./VehicleTable.css";
import DetailsPanel from '../DetailsPanel/DetailsPanel';

export default function VehicleTable({ vehicles, handleVehicleSelect, selectedVehicleIndex }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const vehiclesPerPage = 5; // Number of vehicles to show per page

    // Handle search input change
    const handleSearch = (event) => {
        const term = event.target.value.toLowerCase();
        setSearchTerm(term);
        setCurrentPage(1); // Reset to the first page on search
    };

    const filteredVehicles = vehicles.filter(vehicle =>
        vehicle.name.toLowerCase().includes(searchTerm) || vehicle.type.toLowerCase().includes(searchTerm)
    );

    // Pagination logic
    const indexOfLastVehicle = currentPage * vehiclesPerPage;
    const indexOfFirstVehicle = indexOfLastVehicle - vehiclesPerPage;
    const currentVehicles = filteredVehicles.slice(indexOfFirstVehicle, indexOfLastVehicle);

    // Handle pagination click
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div>
            {/* Search Input */}
            <input
                type="text"
                placeholder="Search vehicles..."
                value={searchTerm}
                onChange={handleSearch}
                className="form-control mb-3"
                style={{ marginTop: '2%' }}
            />

            {/* Vehicle Table */}
            <table className="table table-hover " style={{ background: 'white', borderRadius: '5px' }}>
               
                <tbody>
                    {currentVehicles.map((vehicle, index) => (
                        <tr
                            key={index}
                            onClick={() => handleVehicleSelect(indexOfFirstVehicle + index, vehicle)}
                            style={{
                                backgroundColor: selectedVehicleIndex === (indexOfFirstVehicle + index) ? '#cce5ff' : 'transparent',
                                cursor: 'pointer',
                            }}
                        >
                            <td className="align-middle">
                                <div className='d-flex align-items-center'>
                                    <img
                                        src={vehicle.imageUrl}
                                        alt=''
                                        style={{ width: '45px', height: '45px' }}
                                        className='rounded-circle'
                                    />
                                    <div className='ms-3'>
                                        <p className='fw-bold mb-1'>{vehicle.name}</p>
                                        <p className='text-muted mb-0'>{vehicle.type}</p>
                                    </div>
                                </div>
                            </td>
                            <td className="align-middle">
                                <span className={`badge bg-${vehicle.status === 'Running' ? 'success' : vehicle.status === 'Idle' ? 'warning' : 'danger'}`}>
                                    {vehicle.status}
                                </span>
                            </td>
                            <td className="text-center align-middle">
                                {vehicle.gps ? <i className="fa fa-map-marker text-success"></i> : <i className="fa fa-map-marker text-danger"></i>}
                            </td>
                            <td className="text-center align-middle">
                                {vehicle.signal ? <i className="fa fa-wifi text-success"></i> : <i className="fa fa-wifi text-danger"></i>}
                            </td>
                            <td className="text-center align-middle">
                                {vehicle.alert ? <i className="fa fa-exclamation-triangle text-danger"></i> : <i className="fa fa-check-circle text-success"></i>}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination */}
            <nav style={{ marginTop: '2%' }}>
                <ul className="pagination justify-content-center">
                    {Array.from({ length: Math.ceil(filteredVehicles.length / vehiclesPerPage) }, (_, i) => i + 1).map(pageNumber => (
                        <li key={pageNumber} className={`page-item ${currentPage === pageNumber ? 'active' : ''}`}>
                            <a onClick={() => paginate(pageNumber)} className="page-link" href="#">
                                {pageNumber}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
}

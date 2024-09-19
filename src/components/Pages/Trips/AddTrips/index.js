import React, { useState, useEffect, useRef } from 'react';
import { useJsApiLoader, GoogleMap, DirectionsRenderer, Marker } from '@react-google-maps/api';
import { db } from '../../../firebase'; // Import db instance
import {  collection,getDocs, addDoc  } from 'firebase/firestore'; // Import correct Firestore functions
import { toast } from "react-toastify";
import MetaData from "../../../MetaData";
import { Modal, Button, Form } from 'react-bootstrap';

const center = { lat:10.7905021, lng: 78.7046687 }; // Default center point (Eiffel Tower)

const AddTrip = () => {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
        libraries: ['places'],
    });

    const originRef = useRef(null);
    const destinationRef = useRef(null);
    const [vehicles, setVehicles] = useState([]); // Store list of vehicles
    const [drivers, setDrivers] = useState([]); // Store list of vehicles
    const [vehicleId, setVehicleId] = useState("");
    const [driverId, setDriverId] = useState("");
    const [startDateTime, setStartDateTime] = useState("");
    const [endDateTime, setEndDateTime] = useState("");
    const [origin, setOrigin] = useState(null);
    const [destination, setDestination] = useState(null);
    const [directions, setDirections] = useState(null);
    const [markers, setMarkers] = useState({ start: null, end: null });
    const [showModal, setShowModal] = useState(false);
    const [tripDetails, setTripDetails] = useState({
        distance: '',
        duration: '',
        startLat: '',
        startLng: '',
        endLat: '',
        endLng: '',
    });

    useEffect(() => {
        if (isLoaded && originRef.current && destinationRef.current) {
            const originAutocomplete = new window.google.maps.places.Autocomplete(originRef.current);
            const destinationAutocomplete = new window.google.maps.places.Autocomplete(destinationRef.current);

            originAutocomplete.addListener('place_changed', () => {
                const place = originAutocomplete.getPlace();
                if (place.geometry) {
                    setOrigin(place);
                }
            });

            destinationAutocomplete.addListener('place_changed', () => {
                const place = destinationAutocomplete.getPlace();
                if (place.geometry) {
                    setDestination(place);
                }
            });
        }
    }, [isLoaded]);
    useEffect(() => {
        const fetchVehicles = async () => {
          const vehiclesSnapshot = await getDocs(collection(db, "vehicle"));
          const vehicleList = vehiclesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setVehicles(vehicleList);
          console.log('vehicleList::',vehicleList)
        };
        const fetchDrivers = async () => {
            const driversSnapshot = await getDocs(collection(db, "Drivers"));
            const driversList = driversSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setDrivers(driversList);
            console.log('setDrivers::',driversList)
          };
        fetchVehicles();
        fetchDrivers();
      }, []);
    
      const handleBookTrip = () => {
        setShowModal(true);
    };
    const handleSaveChanges = async () => {
        const start = new Date(startDateTime);
        // Convert duration from string to number
        const durationMinutes = parseFloat(tripDetails.duration); // Assuming duration is in minutes
        const end = new Date(start.getTime() + durationMinutes * 60000); // Duration in milliseconds
    
        // Format end time to match datetime-local input format
        const formattedEndDateTime = end.toISOString().slice(0, 16); // Slice to fit datetime-local format
    
         console.log(' start.toISOString():::'+ start.toISOString())
         console.log('new Date(formattedEndDateTime).toISOString(),:::'+new Date(formattedEndDateTime).toISOString())

        // Prepare data for saving
        const tripData = {
            vehicle_id: vehicleId,
            driver_id: driverId,
            start_time: start.toISOString(), // Save in ISO format
            end_time: new Date(formattedEndDateTime).toISOString(), // Convert formatted string back to ISO
           
            start_location: tripDetails.startLat + ',' + tripDetails.startLng,
            end_location: tripDetails.endLat + ',' + tripDetails.endLng,
            distance_traveled: tripDetails.distance,
            duration: tripDetails.duration,
            trip_status: 'Not Started',
        };
    
        try {
            // Add trip data to Firestore
            const tripCollectionRef = collection(db, "trips"); // Reference to the "trips" collection
           const result =  await addDoc(tripCollectionRef, tripData); // Automatically generates an ID and adds the document

            toast.success("Trip booked successfully", {
                position: "top-center",
            });
            console.log("Trip booked successfully", JSON.stringify(result));
            handleclearTripDetails();
            // Close modal
            setShowModal(false);
        } catch (error) {
            console.error("Error booking trip: ", error);
            toast.error("Error booking trip", {
                position: "top-center",
            });
        }
    };
    
    const handleclearTripDetails = () => {
         // Clear trip details and markers
    setTripDetails({
        distance: '',
        duration: '',
        startLat: '',
        startLng: '',
        endLat: '',
        endLng: '',
    });
    setMarkers({ start: null, end: null });  // Reset markers
    setDirections(null);  // Reset directions (remove route rendering)

    // Clear the input fields
    if (originRef.current) originRef.current.value = '';
    if (destinationRef.current) destinationRef.current.value = '';
    };
    
    const calculateRoute = async () => {
        if (!origin || !destination) return;

        const directionsService = new window.google.maps.DirectionsService();
        const results = await directionsService.route({
            origin: origin.geometry.location,
            destination: destination.geometry.location,
            travelMode: window.google.maps.TravelMode.DRIVING,
        });
        setDirections(results);
  console.log('results',results)
        // Extracting trip details
        const route = results.routes[0].legs[0];
        setTripDetails({
            distance: route.distance.text,
            duration: route.duration.text,
            startLat: route.start_location.lat(),
            startLng: route.start_location.lng(),
            endLat: route.end_location.lat(),
            endLng: route.end_location.lng(),
        });

        // Set markers for start and end locations
        setMarkers({
            start: { lat: route.start_location.lat(), lng: route.start_location.lng() },
            end: { lat: route.end_location.lat(), lng: route.end_location.lng() },
        });
    };

    const handleShowTripDetails = () => {
        calculateRoute();
    };

    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
     <MetaData title='Book Trip'></MetaData>

            <div style={{ flex: '3', padding: '20px' }}>
                <div style={{ marginBottom: '20px' }}>
                    <label className="form-label">Start Trip</label>
                    <input
                        className="form-control"
                        ref={originRef}
                        type="text"
                        placeholder="Enter origin"
                    />
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <label className="form-label">End Trip</label>
                    <input
                        className="form-control"
                        ref={destinationRef}
                        type="text"
                        placeholder="Enter destination"
                        style={{ width: '100%', padding: '10px', fontSize: '16px' }}
                    />
                </div>
                    <button  onClick={handleShowTripDetails} className="btn btn-primary">
                        Show Trip Details
                    </button>

                    <button onClick={handleclearTripDetails} style={{ marginLeft: '20px' }} className='btn btn-danger' >
                        Clear
                    </button>
                {/* Display Trip Details */}
                {tripDetails.distance && (
                    <div style={{ marginTop: '20px' }}>
                        <h3>Trip Details:</h3>
                        <p><strong>Distance:</strong> {tripDetails.distance}</p>
                        <p><strong>Duration:</strong> {tripDetails.duration}</p>
                        {/* <p><strong>Start Latitude:</strong> {tripDetails.startLat}</p>
                        <p><strong>Start Longitude:</strong> {tripDetails.startLng}</p>
                        <p><strong>End Latitude:</strong> {tripDetails.endLat}</p>
                        <p><strong>End Longitude:</strong> {tripDetails.endLng}</p> */}
                        <button style={{ alignItems:'center', marginTop: '20px' }} onClick={handleBookTrip} className="btn btn-primary">
                         Book Now
                    </button>
                    </div>
                )}
            </div>

            {/* Right Column (7/12 width) */}
            <div style={{ flex: '9', height: '100%' }}>
       
                <GoogleMap 
                    center={center}
                    zoom={10}
                    mapContainerStyle={{ width: '100%', height: '100%' }}
                >
                    {directions && <DirectionsRenderer key={JSON.stringify(directions)} directions={directions} />}

                    {markers.start && (
                        <Marker position={markers.start} label="Start" />
                    )}

                    {markers.end && (
                        <Marker position={markers.end} label="End" />
                    )}
                </GoogleMap> 
            </div>

              {/* Modal for editing */}
              <Modal show={showModal} onHide={() => setShowModal(false)}>
    <Modal.Header closeButton>
        <Modal.Title>Book Trip</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <Form>
            <Form.Group className="mb-3">
                <Form.Label>Choose Vehicle</Form.Label>
                <Form.Control
                    as="select"
                    id="vehicleId"
                    value={vehicleId}
                    onChange={(e) => setVehicleId(e.target.value)}
                    required
                >
                    <option value="">Select Vehicle</option>
                    {vehicles.map((vehicle) => (
                        <option key={vehicle.id} value={vehicle.id}>
                            {vehicle.name}
                        </option>
                    ))}
                </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Choose Driver</Form.Label>
                <Form.Control
                    as="select"
                    id="driverId"
                    value={driverId}
                    onChange={(e) => setDriverId(e.target.value)}
                    required
                >
                    <option value="">Select Driver</option>
                    {drivers.map((driver) => (
                        <option key={driver.id} value={driver.id}>
                            {driver.first_name} {driver.last_name} 
                        </option>
                    ))}
                </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Start Date/Time</Form.Label>
                <Form.Control
                    type="datetime-local"
                    value={startDateTime}
                    onChange={(e) => setStartDateTime(e.target.value)}
                    required
                />
            </Form.Group>
{/* 
            <Form.Group className="mb-3">
                <Form.Label>End Date/Time</Form.Label>
                <Form.Control
                    type="datetime-local"
                    value={endDateTime}
                    onChange={(e) => setEndDateTime(e.target.value)}
                    required
                />
            </Form.Group> */}

            {/* Additional fields as needed */}
        </Form>
    </Modal.Body>
    <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
        </Button>
        <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
        </Button>
    </Modal.Footer>
</Modal>

        </div>
    );
};

export default AddTrip;

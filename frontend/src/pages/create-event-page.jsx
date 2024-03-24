// import { PageLayout, HeaderImage, FormField, Button } from "../components";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// import globalStyles from "../globals.module.scss";
// import styles from "./create-event-page.module.scss";
// import React, { useEffect, useRef, useState } from 'react';
// import mapboxgl from 'mapbox-gl';



// export const CreateEventPage = () => {
//   const navigate = useNavigate();
//   const mapContainer = useRef(null);
//   const [locations, setLocations] = useState([]);
//   const [tempLocation, setTempLocation] = useState(null);
//   const [locationName, setLocationName] = useState('');

//   useEffect(() => {
//     navigator.geolocation.getCurrentPosition((position) => {
//       const { latitude, longitude } = position.coords;

//       mapboxgl.accessToken = 'pk.eyJ1Ijoia2lhbmhrNiIsImEiOiJjbHU1YzY2NHcxdDA3MmtwcHlhbHp5eTRxIn0.gd5SsAWT75NUaNwTwB21Zg';
//       const map = new mapboxgl.Map({
//         container: mapContainer.current,
//         style: 'mapbox://styles/mapbox/streets-v11',
//         center: [longitude, latitude],
//         zoom: 15
//       });

//       map.on('click', (e) => {
//         const { lng, lat } = e.lngLat;
//         // Add a new marker at the click location
//         new mapboxgl.Marker()
//         .setLngLat([lng, lat])
//         .addTo(map);
//         setTempLocation({ lat, lng });
//       });
//     });
//   }, []);

//   const addLocation = () => {
//     if (tempLocation && locationName) {
//       setLocations([...locations, { name: locationName, latLong: tempLocation }]);
//       setTempLocation(null);
//       setLocationName('');
//     }
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const { nameOfEvent, description, startDate, endDate } = event.target;

//     try {
//       const res = await axios.post(
//         "http://localhost:3000/event/createEvent",
//         {
//           nameOfEvent: nameOfEvent.value,
//           description: description.value,
//           startDate: startDate.value,
//           endDate: endDate.value,
//           meetingRooms: locations,
//         },
//         { withCredentials: true }
//       );

//       navigate(`/event/${res.data.eventId}`);
//     } catch (error) {
//       console.error("Error creating event:", error);
//     }
//   };

//   return (
//     <PageLayout
//       includeNav
//       header={<HeaderImage />}
//       className={styles.createEventPage}
//     >
//       <form onSubmit={handleSubmit}>
//         <h1>Create Event</h1>
//         <section className={styles.fields}>
//           <FormField label="Name" type="text" name="nameOfEvent" />
//           <FormField label="Description" type="textarea" name="description" />
//           <FormField label="Start Date" type="date" name="startDate" />
//           <FormField label="End Date" type="date" name="endDate" />
//         </section>
//         <div ref={mapContainer} style={{ width: '100%', height: '30vh' }} />

//         <div ref={mapContainer} style={{ width: '100%', height: '30vh' }}></div>

//         <section className={styles.fields}>
//           <FormField label="Location Name" type="text" name="nameOfLocation"   onChange={(e) => setLocationName(e.target.value)} />
//           <Button type="button" onClick={addLocation}>Add Location</Button>

//         </section>

//         <ul>
//           {locations.map((location, index) => (
//             <li key={index}>{location.name}: {location.latLong.lat}, {location.latLong.lng}</li>
//           ))}
//         </ul>
//         <Button type="submit">Create Event</Button>
//       </form>
//     </PageLayout>
//   );
// };


import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { PageLayout, HeaderImage, FormField, Button } from "../components";
import styles from "./create-event-page.module.scss";

export const CreateEventPage = () => {
  const navigate = useNavigate();
  const mapContainer = useRef(null);
  const [locations, setLocations] = useState([]);
  const [tempLocation, setTempLocation] = useState(null); // Temporary store for the current location
  const [locationName, setLocationName] = useState(''); // Name of the current location to add
  const [currentMarker, setCurrentMarker] = useState(null); // Reference to the current marker on the map


  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;

      mapboxgl.accessToken = 'pk.eyJ1Ijoia2lhbmhrNiIsImEiOiJjbHU1YzY2NHcxdDA3MmtwcHlhbHp5eTRxIn0.gd5SsAWT75NUaNwTwB21Zg';
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-122.91813898293222,  49.277016401899544],
        zoom: 15
      });

      map.on('click', (e) => {
        const { lng, lat } = e.lngLat;
        // Create a new marker and add it to the map
        const marker = new mapboxgl.Marker()
          .setLngLat([lng, lat])
          .addTo(map);

        // Update the current marker reference
        setCurrentMarker(marker);
        // Update temp location state
        setTempLocation({ lng, lat });
      });
    });
  }, []); // Depend on currentMarker to ensure marker is managed correctly

  const addLocation = () => {
    if (tempLocation && locationName) {
      setLocations([...locations, { name: locationName, latLong: tempLocation }]);
      setLocationName('');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { nameOfEvent, description, startDate, endDate } = event.target.elements;

    try {
      console.log(locations)
      const res = await axios.post(
        "http://localhost:3000/event/createEvent",
        {
          nameOfEvent: nameOfEvent.value,
          description: description.value,
          startDate: startDate.value,
          endDate: endDate.value,
          meetingRooms: locations,
        },
        { withCredentials: true }
      );



      navigate(`/event/${res.data.eventId}`);
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  return (
    <PageLayout
      includeNav
      header={<HeaderImage />}
      className={styles.createEventPage}
    >
      <form onSubmit={handleSubmit}>
        <h1>Create Event</h1>
        <section className={styles.fields}>
          <FormField label="Name" type="text" name="nameOfEvent" />
          <FormField label="Description" type="textarea" name="description" />
          <FormField label="Start Date" type="date" name="startDate" />
          <FormField label="End Date" type="date" name="endDate" />
          <FormField 
            label="Location Name" 
            type="text" 
            name="nameOfLocation"   
            value={locationName}
            onChange={(e) => setLocationName(e.target.value)} 
          />
          <Button type="button" onClick={addLocation}>Add Location</Button>
        </section>
        <div ref={mapContainer} style={{ width: '100%', height: '30vh' }}></div>
        <ul>
          {locations.map((location, index) => (
            <li key={index}>{location.name}: Lat {location.latLong.lat}, Lng {location.latLong.lng}</li>
          ))}
        </ul>
        <Button type="submit">Create Event</Button>
      </form>
    </PageLayout>
  );
};

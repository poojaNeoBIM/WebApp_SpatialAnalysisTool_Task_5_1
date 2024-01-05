import React, { useState } from 'react';
import '../css/mapDemo.css'; // Make sure this path is correct
import axios from 'axios'; // Import axios for making HTTP requests




const DirectionsComponent = ({ start, setStart, destination, setDestination, mode, setMode }) => {
  const [directions, setDirections] = useState(null); // Now useState is defined
  
  const handleDirections = async () => {
    if (!start || !destination) return;

    // OpenRouteService API endpoint
    const directionsApiUrl = `/ors/v2/directions/${mode}-car`;
    const apiKey = '5b3ce3597851110001cf624884d38df10b794d05a77bee540309b20c'; // Replace with your actual API key

    try {
      const response = await axios.post('/ors/v2/directions/driving-car', {
        coordinates: [
          start.split(',').map(Number), // Convert start to [lon, lat] array
          destination.split(',').map(Number) // Convert destination to [lon, lat] array
        ],
      }, {
        headers: {
          'Authorization': apiKey, // Replace with your actual API key
          'Content-Type': 'application/json'
        }
      });
  
      setDirections(response.data); // Save the directions response
    } catch (error) {
      console.error('Error fetching directions:', error);
    }
  };

  return (
    <div className="directions-container">
      <input
        type="text"
        placeholder="Choose a starting place"
        value={start}
        onChange={(e) => setStart(e.target.value)}
      />
      <input
        type="text"
        placeholder="Choose destination"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
      />
      <div>
        <button onClick={() => setMode('driving')}>Driving</button>
        <button onClick={() => setMode('walking')}>Walking</button>
        <button onClick={() => setMode('cycling')}>Cycling</button>
      </div>
      <button onClick={handleDirections}>Get Directions</button>

      {/* Directions Summary */}
      {directions && (
        <div className="directions-summary">
          <div>Duration: {Math.round(directions.features[0].properties.summary.duration / 60)} min</div>
          <div>Distance: {(directions.features[0].properties.summary.distance / 1000).toFixed(2)} km</div>
          {/* Render turn-by-turn instructions */}
          {directions.features[0].properties.segments[0].steps.map((step, index) => (
            <div key={index}>{step.instruction}</div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DirectionsComponent;


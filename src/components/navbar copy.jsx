import React, { useState } from 'react';
import '../css/mapDemo.css';
import axios from 'axios';

const DirectionsComponent = ({ start, setStart, destination, setDestination, mode, setMode }) => {
  const [directions, setDirections] = useState(null);

  const handleDirections = async () => {
    if (!start || !destination) return;

    const directionsApiUrl = `/ors/v2/directions/${mode}-car`;
    const apiKey = 'your-api-key'; // Replace with your actual API key

    try {
      const response = await axios.post(directionsApiUrl, {
        coordinates: [
          start.split(',').map(Number),
          destination.split(',').map(Number)
        ],
      }, {
        headers: {
          'Authorization': apiKey,
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
      {/* ...existing inputs and buttons... */}

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

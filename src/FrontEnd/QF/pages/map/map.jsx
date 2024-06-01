import React, { useState, useEffect } from 'react';

const MapPage = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        error => {
          console.error('Error getting geolocation:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  return (
    <div style={{ width: '100%', margin: '24px 0px 0px 0px' }}>
      {latitude !== null && longitude !== null && (
        <iframe
          width="100%"
          height="600"
          frameBorder="0"
          scrolling="no"
          marginHeight="0"
          marginWidth="0"
          src={`https://maps.google.com/maps?q=${latitude},${longitude}&hl=en&z=14&output=embed`}
          title="Google Map"
        ></iframe>
      )}
    </div>
  );
};

export default MapPage;

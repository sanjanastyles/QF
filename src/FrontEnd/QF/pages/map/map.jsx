import React from 'react';
const MapPage = ({ latitude = 28.621271, longitude = 77.061325 }) => {

    return (
    <div style={{ width: '100%', margin:"24px 0px  0px 0px" }}>
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
    </div>
  );
};
export default MapPage;
import React, { useEffect, useState } from 'react';
import LoadingSpinner from './LoadingSpinner';

export default function Map(props) {
  const { themeLight, setThemeLight, lat, lng } = props;
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    const mapElement = document.querySelector('.map');
      setShowMap(true);
    if (mapElement && !mapElement.querySelector('iframe')) {
      const iframe = document.createElement('iframe');
      iframe.src = `https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`;
      iframe.width = '100%';
      iframe.height = '100%';
      mapElement.appendChild(iframe);
    }
  }, [lat, lng]);

  return (
    <div className="widget">
      { showMap?
      <div className="map"></div>
      :
      <LoadingSpinner />
      }
    </div>
  );
}

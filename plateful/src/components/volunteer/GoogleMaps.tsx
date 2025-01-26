import React, { useState, useEffect, useCallback } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

// Set your Google Maps API key here
const apiKey = 'AIzaSyAr3geQfmZtripTlM_xzkIW8YwQm275hno'; 

const containerStyle = {
    width: '100%',
    height: '400px'
};

const center = {
    lat: -3.745,
    lng: -38.523
};

const GoogleMaps = () => {
    const [map, setMap] = useState<google.maps.Map | null>(null);
    const [currentLocation, setCurrentLocation] = useState<{ lat:number, lng: number } | null>(null);

    useEffect(() => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              setCurrentLocation({ lat: latitude, lng: longitude });
            },
            (error) => {
              console.error("Error getting geolocation:", error);
            }
          );
        } else {
          console.error("Geolocation is not supported by this browser.");
        }
      }, []);

    const onLoad = React.useCallback(function callback(map: google.maps.Map) {
        const bounds = new window.google.maps.LatLngBounds();
        map.fitBounds(bounds);
        setMap(map);
    }, []);

    const onUnmount = React.useCallback(function callback(map: google.maps.Map) {
        setMap(null);
    }, []);

    return (
        <LoadScript googleMapsApiKey={apiKey}>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={currentLocation || { lat: 44.23, lng: -76.523 }}
                zoom={10}
                onLoad={onLoad}
                onUnmount={onUnmount}
            >
                <Marker position={center} />
            </GoogleMap>
        </LoadScript>
    );
};


export default GoogleMaps;
import { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker , DirectionsRenderer } from '@react-google-maps/api';
import MarkerClusterer from '@googlemaps/markerclustererplus';
import generateRandomRestaurantData, { Restaurant } from './data';

const mapCenter = { lat: 53.5511, lng: 9.9937 };
const homePosition = { lat: 53.55 , lng: 9.99 };
const restaurantData: Restaurant[] = generateRandomRestaurantData(300);


const App = () => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
  const [selectedPoint, setSelectedPoint] = useState<google.maps.LatLngLiteral | null>(null);

  
  useEffect(() => {
    if (map && selectedPoint) {
      const directionsService = new window.google.maps.DirectionsService();

      const request: google.maps.DirectionsRequest = {
        origin: homePosition,
        destination: selectedPoint,
        travelMode: google.maps.TravelMode.DRIVING,
      };

      directionsService.route(request, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          setDirections(result);
        }
      });
    }
  }, [map, selectedPoint]);

  useEffect(() => {
    if (map) {
      const markerCluster = new MarkerClusterer(map, [], {
        imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
      });

      restaurantData.forEach((restaurant) => {
        const marker = new window.google.maps.Marker({
          position: restaurant.position,
          title: restaurant.name,
        });

        markerCluster.addMarker(marker);
      });
    }
  }, [map]);

  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    setSelectedPoint({
      lat: e.latLng?.lat() ,
      lng: e.latLng?.lng() ,
    });
  };

  return (
    <LoadScript 
    googleMapsApiKey="AIzaSyBQflAXOHQc2A92df5sOFTyYxiQb1SB9l8"
    libraries={["places"]}
    >
      <GoogleMap
        mapContainerStyle={{ height: '100vh', width: '100vw' }}
        center={mapCenter}
        zoom={13}
        onLoad={(map) => setMap(map)}
        onClick={handleMapClick}
      >
        {restaurantData.map((restaurant) => (
          <Marker
            key={restaurant.id}
            position={restaurant.position}
            title={restaurant.name}
          />
        ))}

        {map && selectedPoint && (
          <>
            <Marker position={selectedPoint} title="Selected Point" />
            {directions && <DirectionsRenderer directions={directions} />}
          </>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default App;

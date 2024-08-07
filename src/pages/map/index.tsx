import { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import FloatTags from '../../components/floatTags';
import { tags } from '../../types';
import mockUpLocations from '../../mockupData/destinations.json';
import markerImg from '../../assets/markerImg.png';
import DrawerComponent from '../../components/drawer';

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
`;
declare global {
  interface Window {
    kakao: any;
  }
}

const Map: React.FC = () => {
  const [map, setMap] = useState<any>(null);
  const [locations, setLocations] = useState(mockUpLocations);
  const [markers, setMarkers] = useState<any[]>([]);
  const [isClicked, setIsClicked] = useState(false);
  const [destId, setDestId] = useState<number | undefined>(undefined);

  const { kakao } = window;

  useEffect(() => {
    const mapContainer = document.getElementById('map');
    const mapOption = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 10,
    };
    setMap(new kakao.maps.Map(mapContainer, mapOption));
  }, [kakao.maps.LatLng, kakao.maps.Map]);

  useEffect(() => {
    if (map && locations.length > 0) {
      createMarkers();
    }
  }, [map]);

  useEffect(() => {
    fetch('../../mockupData/destinations.json')
      .then((response) => response.json())
      .then((jsonData) => setLocations(jsonData));
  }, []);
  const createMarkers = useCallback(() => {
    const newMarkers = locations.map((location) => {
      const position = new kakao.maps.LatLng(
        location.latitude,
        location.longitude
      );
      const markerImage = new kakao.maps.MarkerImage(
        markerImg,
        new kakao.maps.Size(24, 35)
      );
      const marker = new kakao.maps.Marker({
        map: map,
        position: position,
        title: location.dest_name,
        image: markerImage,
        clickable: true,
      });

      kakao.maps.event.addListener(marker, 'click', () => {
        setIsClicked(true);
        setDestId(location.dest_id);
      });

      return marker;
    });

    setMarkers(newMarkers);
  }, [locations, kakao.maps, map]);

  useEffect(() => {
    if (map && locations.length > 0) {
      createMarkers();
    }
  }, [map, locations.length, createMarkers]);

  useEffect(() => {
    fetch('../../mockupData/destinations.json')
      .then((response) => response.json())
      .then((jsonData) => setLocations(jsonData));
  }, []);

  const handleCloseDrawer = () => {
    setIsClicked(false);
  };

  return (
    <>
      <MapContainer id="map" />
      <FloatTags tagList={tags} data={locations} />
      <DrawerComponent
        tagList={tags}
        destId={destId}
        isClicked={isClicked}
        data={locations}
        onClose={handleCloseDrawer}
      />
    </>
  );
};

export default Map;

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Flex, Typography } from "antd";
import {
  Map,
  Marker,
  NavigationControl,
  ScaleControl,
} from "@vis.gl/react-maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import Pin from "../../components/map/Pin";
import MarkerPopup from "../../components/map/MarkerPopup";

// bangalore
const initialPointers = {
  latitude: 12.971599,
  longtitude: 77.594566,
};

const StreetMap = ({ mapData = [], onMapClick }) => {
  const mapRef = useRef();

  const [viewState, setViewState] = useState({
    ...initialPointers,
    zoom: 11,
    bearing: 0,
    pitch: 0,
  });

  const [popupInfo, setPopupInfo] = useState(null);

  const onMapLoad = () => {
    if (mapData.length > 0) {
      // mapRef.current?.flyTo({center: [mapData[0].longitude, mapData[0].latitude], duration: 2000});
      const longs = [];
      const lats = [];
      mapData.forEach((m) => {
        longs.push(m.longitude);
        lats.push(m.latitude);
      });

      mapRef.current?.fitBounds(
        [
          [Math.min(...longs), Math.min(...lats)],
          [Math.max(...longs), Math.max(...lats)]
        ],
        {padding: 40, duration: 1000}
      );
    }
  };

  useEffect(() => {
    if (mapData.length > 0) {
      const initialValue = {
        latitude: mapData[0].latitude,
        longtitude: mapData[0].longitude
      };

      setViewState((prev) => ({
        ...prev,
        ...initialValue
      }));
    }
  }, [mapData]);

  const pins = useMemo(() => {
    const markers = mapData.map((m, index) => (
      <Marker
        key={`marker-${index}`}
        longitude={m.longitude}
        latitude={m.latitude}
        anchor="bottom"
        onClick={(e) => {
          e.originalEvent.stopPropagation();
          setPopupInfo(m);
        }}
      >
        <Pin />
      </Marker>
    ));
    return markers;
  }, [mapData]);

  return (
    <Flex
      vertical
      flex={1}
      gap={8}
      className="bg-[#FFF] border border-[#ddd] rounded-sm max-w-[70%]"
    >
      <Flex vertical gap={8} className="p-3">
        <Typography.Title level={5}>Street Lights</Typography.Title>
      </Flex>
      <Flex vertical className="p-3">
        <Map
          ref={mapRef}
          initialViewState={{ ...viewState }}
          style={{ width: "100%", height: 500 }}
          mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
          onMove={(evt) => setViewState(evt.viewState)}
          onLoad={onMapLoad}
          onClick={onMapClick}
        >
          <NavigationControl position="bottom-right" />
          <ScaleControl />
          {pins}
          {popupInfo && <MarkerPopup data={popupInfo} setPopupInfo={setPopupInfo} />}
        </Map>
      </Flex>
    </Flex>
  );
};

export default StreetMap;

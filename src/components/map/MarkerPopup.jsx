import React from "react";
import { Popup } from "@vis.gl/react-maplibre";
import { Flex, Typography } from "antd";

const { Text } = Typography;

const MarkerPopup = ({ data, setPopupInfo }) => {
  return (
    <Popup
      anchor="top"
      longitude={Number(data.longitude)}
      latitude={Number(data.latitude)}
      onClose={() => setPopupInfo(null)}
    >
      <Flex vertical gap={2}>
        <Text >Group: {data.group}</Text>
        <Text type="secondary">ID: {data.id}</Text>
        <Text type="secondary">Name: {data.name}</Text>
      </Flex>
    </Popup>
  );
};

export default MarkerPopup;

import React, { useEffect, useState } from "react";
import { Flex, notification, Typography } from "antd";
import StreetGroups from "./StreetGroups";
import StreetMap from "./StreetMap";
import AddLightPopup from "../../components/street-view/AddLight";
import useStreetLightsStore from "../../zustand/streetLightsStore";

const StreetView = () => {
  const [notifApi, notifContextHolder] = notification.useNotification();
  const { data: stLights, fetchLights, addLight} = useStreetLightsStore();

  const [addNewLoc, setAddNewLoc] = useState(null);

  const [groups, setGroups] = useState([]);

  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState("");
  const toggleGroupSelection = (item) => {
    setSelected((prev) => {
      if (prev === item) {
        return "";
      }
      return item;
    });
  };

  const handleAddLight = (e) => {
    const { lngLat } = e;
    setAddNewLoc(lngLat);
  };

  const saveLight = (data) => {
    addLight({ ...data, id: stLights.length + 1 });
    setAddNewLoc(null);
    notifApi["success"]({
      message: "New Street Light Added",
      description: (
        <Flex>
          <Typography.Text>
            A new Street Light
            <Typography.Text strong>{` ${data.name} `}</Typography.Text>added to
            Group
            <Typography.Text strong>{` ${data.group}.`}</Typography.Text>
          </Typography.Text>
        </Flex>
      ),
    });
  };

  useEffect(() => {
    if (stLights.length > 0) {
      const groupNames = [...new Set(stLights.map((s) => s.group).sort())];
      setGroups(() =>
        groupNames.map((s) => ({ label: `Street${s}`, value: s }))
      );
    }
  }, [stLights]);

  useEffect(() => {
    fetchLights();
  }, [fetchLights]);

  // simple group search
  let filteredGroups = [...groups];
  if (search) {
    filteredGroups = groups.filter((g) => g.label.includes(search));
  }

  let filteredMapData = [...stLights];
  if (selected) {
    filteredMapData = stLights.filter((m) => m.group === selected);
  }

  return (
    <Flex gap={16}>
      {notifContextHolder}
      <StreetGroups
        streetGroups={filteredGroups}
        selected={selected}
        search={search}
        setSearch={setSearch}
        toggleGroupSelection={toggleGroupSelection}
      />
      <StreetMap mapData={filteredMapData} onMapClick={handleAddLight} />
      {addNewLoc && (
        <AddLightPopup
          open={!!addNewLoc}
          location={addNewLoc}
          groups={groups}
          handleAdd={saveLight}
          handleCancel={() => setAddNewLoc(null)}
        />
      )}
    </Flex>
  );
};

export default StreetView;

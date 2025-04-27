import React, { useState } from "react";
import { Divider, Flex, Input, Modal, Select, Typography } from "antd";

const { Text } = Typography;

const AddLightPopup = ({ open, groups, location, handleAdd, handleCancel }) => {
  const [name, setName] = useState("");
  const [group, setGroup] = useState(null);
  const [errors, setErrors] = useState(null);

  const validateForm = () => {
    let errorsObj = {};
    if (!name) {
      errorsObj.name = "Name is required.";
    }

    if (!group) {
      errorsObj.group = "Group is required.";
    }
    return errorsObj;
  };

  const submit = () => {
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(() => ({ ...formErrors }));
    } else {
      setErrors(null);
      handleAdd({
        name,
        group,
        latitude: location.lat,
        longitude: location.lng,
      });
    }
  };

  return (
    <Modal
      title="Add New Light"
      open={open}
      onOk={submit}
      onCancel={handleCancel}
    >
      <Flex vertical gap={8}>
        <Divider className="m-2" />
        <Text strong>Latitude: {location.lat || ""}</Text>
        <Text strong>Longitude: {location.lng || ""}</Text>
        <Flex vertical gap={8}>
          <Text>Name</Text>
          <Input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            status={errors?.name ? "error" : ""}
          />
          {errors?.name && <Text type="danger">{errors?.name}</Text>}
        </Flex>
        <Flex vertical gap={8}>
          <Text>Group</Text>
          <Select
            showSearch
            placeholder="Select a Group"
            optionFilterProp="label"
            options={[...groups]}
            value={group}
            onChange={(val) => setGroup(val)}
            status={errors?.group ? "error" : ""}
          />
          {errors?.group && <Text type="danger">{errors?.group}</Text>}
        </Flex>
      </Flex>
    </Modal>
  );
};

export default AddLightPopup;

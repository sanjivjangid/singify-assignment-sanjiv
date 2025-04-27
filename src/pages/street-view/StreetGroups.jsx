import React from "react";
import { Flex, Input, List, Typography } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const StreetGroups = ({ streetGroups, selected, search, setSearch, toggleGroupSelection }) => {
  return (
    <Flex
      vertical
      flex={1}
      gap={8}
      className="bg-[#FFF] border border-[#ddd] rounded-sm"
    >
      <Flex vertical gap={8} className="p-3">
        <Typography.Title level={5}>Groups</Typography.Title>
        <Input placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} prefix={<SearchOutlined />} />
      </Flex>
      <Flex vertical gap={8} className=" border-[#ddd] border-t-1">
        <List
          data-testid="groups-list"
          size="small"
          dataSource={streetGroups}
          renderItem={(item) => (
            <List.Item
              data-testid="groups-list-item"
              onClick={() => toggleGroupSelection(item.value)}
              className={item.value === selected && "bg-list-selected"}
            >
              {item.label}
            </List.Item>
          )}
        />
      </Flex>
    </Flex>
  );
};

export default StreetGroups;

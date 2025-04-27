import React, { useState } from "react";
import {
  Layout as AntdLayout,
  Avatar,
  Dropdown,
  Flex,
  Menu,
  Space,
} from "antd";
import {
  SunFilled,
  ChromeFilled,
  QuestionCircleFilled,
  DownOutlined,
  DoubleRightOutlined,
  DoubleLeftOutlined,
} from "@ant-design/icons";

const { Header, Content, Sider } = AntdLayout;

const sideMenu = [
  {
    key: "menu-1",
    icon: React.createElement(SunFilled),
    label: "Street View",
  },
];

const userMenu = [{ key: "1", label: "Logout" }];

const Layout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <AntdLayout>
      <Header className="flex justify-between items-center sticky top-0 w-screen">
        <ChromeFilled className="text-[2rem] text-primary" />
        <Flex gap={24} align="center">
          <QuestionCircleFilled className="text-[1rem]" />
          <Avatar gap={8} size="default" className="bg-white text-black">
            SJ
          </Avatar>
          <Dropdown menu={{ items: userMenu }} trigger={["click"]} arrow>
            <Space>
              Sanjiv J
              <DownOutlined />
            </Space>
          </Dropdown>
        </Flex>
      </Header>
      <AntdLayout hasSider className="h-[calc(100vh-64px)] overflow-auto">
        <Sider
          collapsible
          width={200}
          className="overflow-auto h-[calc(100vh-64px)]"
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          trigger={collapsed ? <DoubleRightOutlined /> : <DoubleLeftOutlined />}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={["menu-1"]}
            defaultOpenKeys={["menu-1"]}
            style={{ height: "100%", borderRight: 0 }}
            items={sideMenu}
          />
        </Sider>
        <Content className="overflow-auto h-[calc(100vh-64px)] p-4">
          {children}
        </Content>
      </AntdLayout>
    </AntdLayout>
  );
};

export default Layout;

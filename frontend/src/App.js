import { Route, Routes, useLocation, useNavigate, Navigate } from "react-router-dom";
import Home from "./pages/Home.js";
import Foh from "./pages/Foh.js";
import MenuDashboard from "./pages/MenuDashboard.js";
import MENU from "./pages/Menu.js";
import WaitingListDashboard from "./pages/WaitingListDashboard.js";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  UserOutlined,
  FileOutlined
} from '@ant-design/icons';
import { Button, Layout, Menu, Typography, theme } from 'antd';
import { useState } from 'react';
const { Header, Sider, Content } = Layout;

const tabKeyToLabelMap = {
  'menu-dashboard': '菜單後台',
  'foh': '桌況後台',
  'wait-list-dashboard': '候位後台',
  'waiting-list-dashboard/pending': '候位後台 / 待處理',
  'waiting-list-dashboard/history': '候位後台 / 歷史紀錄'
};

const getItem = ( key, icon, children) => ({
  key,
  icon,
  children,
  label: tabKeyToLabelMap[key],
});

const items = [
  getItem('menu-dashboard', <PieChartOutlined />),
  getItem('foh', <FileOutlined />),
  getItem('wait-list-dashboard', <UserOutlined />, [
    getItem('waiting-list-dashboard/pending'),
    getItem('waiting-list-dashboard/history'),
  ]),
];

const App = () => {
  const navigate = useNavigate();
  let location = useLocation();
  const currentTabKey = location.pathname.slice(1);
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const handleMenuClick = ({ key }) => {
    navigate(`/${key}`);
  };
  return (
    <Layout style={{ height: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[currentTabKey]}
          items={items}
          onClick={handleMenuClick}
        />
      </Sider>
      <Layout>
        <Header
        style={{
            padding: 0,
            background: colorBgContainer,
        }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
            fontSize: '16px',
            width: 64,
            height: 64,
            }}
          />
          <span>
            { tabKeyToLabelMap[currentTabKey] }
          </span>
        </Header>
        <Content
            style={{
                margin: '24px 16px',
                padding: 24,
            }}
        >
          <Routes>
            <Route
              path="*"
              element={<Navigate to="/menu-dashboard/" replace />}
            />
            {/* <Route exact path="/" element={<Home />} /> */}
            <Route exact path="/foh/" element={<Foh />} />
            <Route exact path="/menu/" element={<MENU />} />
            <Route exact path="/menu-dashboard/" element={<MenuDashboard />} />
            <Route
              exact
              path="/waiting-list-dashboard/*"
              element={<WaitingListDashboard theme={theme} />}
            />
          </Routes>  
        </Content>
    </Layout>
      
    </Layout>
  );
};

export default App;
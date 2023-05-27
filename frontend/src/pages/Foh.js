import { TabletOutlined } from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import React, { useState, useEffect } from "react";
import instance from "../axios";
const { Content, Footer, Sider } = Layout;

const items = [
  {
    key: "1",
    icon: <TabletOutlined />,
    label: "Outdoor",
  },
  {
    key: "2",
    icon: <TabletOutlined />,
    label: "1F",
  },
  {
    key: "3",
    icon: <TabletOutlined />,
    label: "2F",
  },
];
const Foh = () => {
  const [current, setCurrent] = useState("戶外");
  const [tables, setTables] = useState([]);
  const [newTableName, setNewTableName] = useState("");
  const [newTableArea, setNewTableArea] = useState("");

  // 獲取所有桌子
  const getTables = async () => {
    try {
      const response = await instance.get("/foh/getFOH");
      const allTables = response.data.tableList;
      console.log(allTables);
      const currentTable = allTables.filter((item) => item.area === current);
      setTables(currentTable);
    } catch (error) {
      console.log(error);
    }
  };

  // 新增桌子
  const addTable = async () => {
    try {
      const response = await instance.post("/foh/addTable", {
        tableName: newTableName,
        area: newTableArea,
      });
      const newTable = response.data.newTable;
      setTables((prevTables) => [...prevTables, newTable]);
      setNewTableName("");
      setNewTableArea("");
    } catch (error) {
      console.log(error);
    }
  };

  // 更改桌子狀態
  const updateTableStatus = async (tableId) => {
    try {
      await instance.put("/foh/updateTableStatus", { tableId });
      setTables((prevTables) =>
        prevTables.map((table) => {
          if (table.tableId === tableId) {
            const newStatus =
              table.status === "occupied" ? "vacant" : "occupied";
            return { ...table, status: newStatus };
          }
          return table;
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  // 刪除桌子
  const deleteTable = async (tableId) => {
    try {
      await instance.delete(`/foh/deleteTable/${tableId}`);
      setTables((prevTables) =>
        prevTables.filter((table) => table.tableId !== tableId)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useEffect(() => {
    getTables();
  }, []);

  const onClick = (e) => {
    if (e.key == "1") {
      setCurrent("戶外");
    } else if (e.key == "2") {
      setCurrent("1F");
    } else {
      setCurrent("2F");
    }
  };
  useEffect(() => {
    getTables();
  }, current);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider style={{ background: colorBgContainer }}>
        <Menu
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
          onClick={onClick}
        />
      </Sider>
      <Layout>
        <Content style={{ margin: "0 16px" }}>
          <div style={{ padding: 24, minHeight: 360 }}>
            <h2>現有桌子：</h2>
            {tables.map((table) => (
              <div key={table.tableId}>
                <p>{table.tableName}</p>
                <p>{table.area}</p>
                <p>{table.status}</p>
                <button onClick={() => updateTableStatus(table.tableId)}>
                  更改狀態
                </button>
                <button onClick={() => deleteTable(table.tableId)}>刪除</button>
              </div>
            ))}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>Footer</Footer>
      </Layout>
    </Layout>
  );
};
export default Foh;

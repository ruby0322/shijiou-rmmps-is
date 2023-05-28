import React, { useState, useEffect } from "react";
import instance from "../axios";
import { Tabs, Card } from 'antd';

const fakeTables = [ 
  { "tableName": "A1", "area": "1F", "status": "vacant", "tableId":"aaa1" }, 
  { "tableName": "A2", "area": "1F", "status": "vacant", "tableId":"aaa2" }, 
  { "tableName": "A3", "area": "1F", "status": "vacant", "tableId":"aaa3" }, 
  { "tableName": "A4", "area": "1F", "status": "vacant", "tableId":"aaa4" }, 
  { "tableName": "A5", "area": "1F", "status": "vacant", "tableId":"aaa5" }, 
  { "tableName": "A6", "area": "1F", "status": "vacant", "tableId":"aaa6" }, 
  { "tableName": "A7", "area": "1F", "status": "vacant", "tableId":"aaa7" }, 
  { "tableName": "A8", "area": "1F", "status": "vacant", "tableId":"aaa8" }, 
  { "tableName": "A9", "area": "1F", "status": "vacant", "tableId":"aaa9" }, 

  { "tableName": "B1", "area": "2F", "status": "vacant", "tableId":"b1" }, 
  { "tableName": "B2", "area": "2F", "status": "vacant", "tableId":"b2" }, 
  { "tableName": "B3", "area": "2F", "status": "vacant", "tableId":"b3" }, 
  { "tableName": "B4", "area": "2F", "status": "vacant", "tableId":"b4" }, 
  { "tableName": "B5", "area": "2F", "status": "vacant", "tableId":"b5" }, 
  { "tableName": "B6", "area": "2F", "status": "vacant", "tableId":"b6" }, 
  { "tableName": "B7", "area": "2F", "status": "vacant", "tableId":"b7" }, 
  { "tableName": "B8", "area": "2F", "status": "vacant", "tableId":"b8" }, 
  { "tableName": "B9", "area": "2F", "status": "vacant", "tableId":"b9" }, 
  { "tableName": "B10", "area": "2F", "status": "vacant", "tableId":"b10" }, 

  { "tableName": "O1", "area": "戶外", "status": "vacant", "tableId":"ooo1" }, 
  { "tableName": "O2", "area": "戶外", "status": "vacant", "tableId":"ooo2" }, 
  { "tableName": "O3", "area": "戶外", "status": "vacant", "tableId":"ooo3" }, 
  { "tableName": "O4", "area": "戶外", "status": "vacant", "tableId":"ooo4" }, 
  { "tableName": "O5", "area": "戶外", "status": "vacant", "tableId":"ooo5" }, 
  { "tableName": "O6", "area": "戶外", "status": "vacant", "tableId":"ooo6" }
];

const FOH = () => {
  const [tables, setTables] = useState([]);
  const [newTableName, setNewTableName] = useState("");
  const [newTableArea, setNewTableArea] = useState("");

  

  // 獲取所有桌子
  const getTables = async () => {
    try {
      const response = await instance.get("/foh/getFOH");
      setTables(response.data.tableList);
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

  // useEffect(() => {
  //   getTables();
  // }, []);

  const onChange = (key) => {
    console.log(key);
  };

  const tabs = ['1F', '2F', '戶外'];

  return (
    <div>
      <h1>FOH</h1>
      <div>
        <h2>新增桌子：</h2>
        <input
          type="text"
          value={newTableName}
          onChange={(e) => setNewTableName(e.target.value)}
          placeholder="桌子名稱"
        />
        <input
          type="text"
          value={newTableArea}
          onChange={(e) => setNewTableArea(e.target.value)}
          placeholder="區域"
        />
        <button onClick={addTable}>新增桌子</button>
      </div>
      <div>
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
      <Tabs
        onChange={onChange}
        type="card"
        items={new Array(3).fill(null).map((_, i) => {
          const id = String(i + 1);
          return {
            label: tabs[i],
            key: id,
            // children: `Content of Tab Pane ${id}`,
            children: 
            <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '1.2rem', padding: '1rem'}}>
              {fakeTables.filter((table) => {
                return (table.area == tabs[i]);
              }).map((table) => {
                return (
                  table.status === 'vacant' ? 
                  <Card key={table.tableId} onClick={() => console.log(table.tableId)} style={{width: '150px', height: '150px', display: 'flex', backgroundColor: 'lightgreen', alignItems: "center", justifyContent: "center", fontSize: "36px", color: 'green'}}>{table.tableName}</Card> :
                  <Card key={table.tableId} onClick={() => console.log(table.tableId)} style={{width: '150px', height: '150px', display: 'flex', backgroundColor: '#fe7654', alignItems: "center", justifyContent: "center", fontSize: "36px", color: 'red'}}>{table.tableName}</Card>
                );
              })}
              {/* <Card style={{width: '150px', height: '150px', display: 'flex', backgroundColor: 'lightgreen', alignItems: "center", justifyContent: "center", fontSize: "36px", color: 'green'}}>A1</Card>
              <Card style={{width: '150px', height: '150px', display: 'flex', backgroundColor: '#fe7654', alignItems: "center", justifyContent: "center", fontSize: "36px", color: 'red'}}>A2</Card> */}
            </div>
          };
        })}
        size="large"
      />
    </div>
  );
};

export default FOH;

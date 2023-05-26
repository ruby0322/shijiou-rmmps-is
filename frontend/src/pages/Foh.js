import React, { useState, useEffect } from "react";
import instance from "../axios";

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

  useEffect(() => {
    getTables();
  }, []);

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
    </div>
  );
};

export default FOH;

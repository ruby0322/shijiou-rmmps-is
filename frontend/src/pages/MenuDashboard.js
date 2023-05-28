import React, { useState, useEffect } from "react";
import instance from "../axios";
import fakeMenu from "../components/fakeMenu";
import { Tabs, Card } from 'antd';

const Menu = () => {
  const [menuList, setMenuList] = useState([]);

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const response = await instance.get("/menu/getMenu");
      setMenuList(response.data.menuList);
    } catch (error) {
      console.log(error);
    }
  };

  const onChange = (key) => {
    console.log(key);
  };

  const tabs = ['咖啡', '茶', '風味飲', '早餐盤', '鹹食', '輕食', '甜點', '每日特餐'];

  return (
    <div>
      <h2>Menu</h2>
      <div>
        <h3>Normal Items</h3>
        {menuList
          .filter((item) => item.itemCategory !== "Today's Special")
          .map((item) => (
            <div key={item.itemId}>
              <h4>{item.itemName}</h4>
              <p>Category: {item.itemCategory}</p>
              <p>Price: {item.price}</p>
              <p>Status: {item.status}</p>
            </div>
          ))}
      </div>
      <div>
        <h3>Today's special</h3>
        {menuList
          .filter((item) => item.itemCategory === "Today's Special")
          .map((item) => (
            <div key={item.itemId}>
              <h4>{item.itemName}</h4>
              <p>Category: {item.itemCategory}</p>
              <p>Price: {item.price}</p>
              <p>Status: {item.status}</p>
            </div>
          ))}
      </div>
      <Tabs
        onChange={onChange}
        type="card"
        items={new Array(8).fill(null).map((_, i) => {
          const id = String(i + 1);
          return {
            label: tabs[i],
            key: id,
            // children: `Content of Tab Pane ${id}`,
            children: 
            <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '1.2rem', padding: '1rem'}}>
              {fakeMenu.filter((item) => {
                return (item.itemCategory == tabs[i]);
              }).map((item) => {
                return (
                  item.status === 'serving' ? 
                  <Card title={'筆'} onClick={() => console.log(item.itemName)} style={{ width: '150px', backgroundColor: 'lightgreen', fontSize: "16px", color: 'black'}}>{item.itemName}</Card> :
                  <Card onClick={() => console.log(item.itemName)} style={{width: '150px', display: 'flex', backgroundColor: 'lightgray', alignItems: "center", justifyContent: "center", fontSize: "16px", color: 'gray'}}>{item.itemName}</Card>
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
export default Menu;
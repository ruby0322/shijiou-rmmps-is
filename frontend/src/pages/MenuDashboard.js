import React, { useState, useEffect } from "react";
import instance from "../axios";
import fakeMenu from "../components/fakeMenu";
import { Tabs, Card, Modal, Input, InputNumber, Button, Radio } from 'antd';
import { EditOutlined } from '@ant-design/icons';

const Menu = () => {
  const [menuList, setMenuList] = useState([]);
  const [editModal, setEditModal] = useState(""); //存 item 物件

  // useEffect(() => {
  //   fetchMenu();
  // }, []);

  const fetchMenu = async () => {
    console.log('f')
    try {
      // const response = await instance.get("/menu/getMenu");
      setMenuList(null);
    } catch (error) {
      console.log(error);
    }
  };

  const onChange = (key) => {
    console.log(key);
  };

  const onChangeRadio = (e) => {
    console.log(`radio checked:${e.target.value}`);
  };

  const tabs = ['咖啡', '茶', '風味飲', '早餐盤', '鹹食', '輕食', '甜點', '每日特餐'];

  return (
    <div>
      {/* <h2>Menu</h2>
      <div>
        <h3>Normal Items</h3>
        {
          menuList
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
      </div> */}
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
                return (item.itemCategory === tabs[i]);
              }).map((item) => {
                return (
                  item.status === 'serving' ? 
                  <Card size="small" onClick={() => console.log(item.itemName)} style={{ width: '150px', backgroundColor: 'lightgreen', fontSize: "16px", color: 'black' }} 
                  extra={
                    <EditOutlined style={{ fontSize: 'large'}} onClick={() => {console.log("edit", item.itemName); setEditModal(item)}}/>}
                  >{item.itemName} </Card> :
                  <Card size="small" onClick={() => console.log(item.itemName)} style={{width: '150px', backgroundColor: 'lightgray', fontSize: "16px", color: 'gray'}} 
                  extra={
                    <EditOutlined style={{ fontSize: 'large'}} onClick={() => {console.log("edit", item.itemName); setEditModal(item)}}/>}
                  >{item.itemName} </Card>
                );
              })}
            </div>
          };
        })}
        size="large"
      />
      <Modal title="修改品項" centered open={editModal!==""} onOk={() => setEditModal("")} onCancel={() => setEditModal("")}>
        <Input size="large" addonBefore="品名" placeholder={editModal.itemName} />
        <Radio.Group onChange={onChangeRadio} >
          {tabs.map((tab, i) => {
            return (<Radio.Button value={i}>{tab}</Radio.Button>);
          })}
        </Radio.Group>
        <InputNumber size="large"addonBefore="價格" placeholder={editModal.price} />
        <Button size="large" >供應中</Button>
        <Button size="large" danger >刪除品項</Button>
      </Modal>
    </div>

  );
};
export default Menu;
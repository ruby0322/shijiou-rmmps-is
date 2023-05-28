import React, { useState, useEffect } from "react";
import instance from "../axios";
import fakeMenu from "../components/fakeMenu";
import { Tabs, Card, Modal, Input, InputNumber, Button, Radio } from 'antd';
import { EditOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { useMenu } from "../hooks/useMenu";

const MenuDashBoard = () => {
  const { menuList, addMenuItem, updateItemContent, updateItemStatus, deleteMenuItem } = useMenu();
  console.log("eeee", menuList);
  const [editModal, setEditModal] = useState(""); //存 item 物件
  const [addModal, setAddModal] = useState(false); // true/false
  const [inputName, setInputName] = useState(""); // input value of Modal - name
  const [inputPrice, setInputPrice] = useState(0); // input value of Model - price

  const onChangeRadio = (e) => {
    console.log(`radio checked:${e.target.value}`);
  };

  const onChangeInputName = (e) => {
    console.log("input:", e.target.value);
    setInputName(e.target.value);
  }

  const onChangeInputPrice = (value) => {
    console.log("input:", value);
    setInputPrice(value);
  }

  const transformData = (data) => {
    let transformedData = [];
    Object.keys(data).forEach((key) => {
      transformedData.push({ itemId: key, ...data[key] });
    });
    transformedData.sort((a, b) => {
      if (a.itemName < b.itemName) return -1;
      else if (a.itemName > b.itemName) return 1;
      else return 0;
    });
    console.log(transformedData);
    return transformedData;
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
        type="card"
        items={new Array(8).fill(null).map((_, i) => {
          const id = String(i + 1);
          return {
            label: tabs[i],
            key: id,
            // children: `Content of Tab Pane ${id}`,
            children: 
            <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '1.2rem', padding: '1rem'}}>
              {transformData(menuList).filter((item) => {
                return (item.itemCategory === tabs[i]);
              }).map((item) => {
                return (
                  item.status === 'serving' ? 
                  <Card size="small" onClick={() => console.log(item.itemId)} style={{ width: '150px', backgroundColor: 'lightgreen', fontSize: "16px", color: 'black' }} 
                  extra={
                    <EditOutlined style={{ fontSize: 'large'}} onClick={() => {console.log("edit", item.itemId); setEditModal(item)}}/>}
                  >{item.itemName} </Card> :
                  <Card size="small" onClick={() => console.log(item.itemId)} style={{width: '150px', backgroundColor: 'lightgray', fontSize: "16px", color: 'gray'}} 
                  extra={
                    <EditOutlined style={{ fontSize: 'large'}} onClick={() => {console.log("edit", item.itemId); setEditModal(item)}}/>}
                  >{item.itemName} </Card>
                );
              })}
              <Card size="small" onClick={() => setAddModal(true)} style={{ width: '150px', backgroundColor: '#e0e0e0', fontSize: "16px", color: 'black',display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
                <PlusCircleOutlined style={{ fontSize: '28px'}}/>
              </Card>
              
              <Modal title="修改品項" centered open={editModal!==""} onOk={() => {
                  //updateItemContent(editModal.itemId, inputName, editModal.itemCategory, inputPrice);
                  setEditModal("");
                }} onCancel={() => setEditModal("")}>
                <Input size="large" addonBefore="品名" placeholder={editModal.itemName} onChange={onChangeInputName} />
                <Radio.Group onChange={onChangeRadio} defaultValue={i}>
                  {tabs.map((tab, i0) => {
                    return (<Radio.Button value={i0}>{tab}</Radio.Button>);
                  })}
                </Radio.Group>
                <InputNumber size="large" addonBefore="價格" placeholder={editModal.price} onChange={onChangeInputPrice}/>
                {editModal.status === 'serving' ? 
                    <Button size="large" onClick={ () => updateItemStatus(editModal.itemId) }>供應中</Button> :
                    <Button size="large" onClick={ () => updateItemStatus(editModal.itemId) }>售完</Button>
                }
                <Button size="large" danger onClick={ () => deleteMenuItem(editModal.itemId) } >刪除品項</Button>
              </Modal>

              <Modal title="新增品項" centered open={addModal} onOk={() => {
                  setAddModal(false);
                  // addMenuItem(itemName, itemCategory, price);
                }} onCancel={() => setAddModal(false)}>
                <Input size="large" addonBefore="品名" />
                <Input disabled size="large" addonBefore="類別" placeholder={tabs[i]} />
                <InputNumber size="large" addonBefore="價格" />
                <Button size="large" >供應中</Button>
              </Modal>
            </div>
          };
        })}
        size="large"
      />

    </div>

  );
};
export default MenuDashBoard;
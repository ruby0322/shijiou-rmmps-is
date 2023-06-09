import React, { useState, useEffect } from "react";
import instance from "../axios";
import { Menu, Tabs } from "antd";
import { CaretRightOutlined, CaretLeftOutlined } from "@ant-design/icons";
import "./css/menu.css";
import { useMenu } from "../hooks/useMenu";


const MENU = () => {
  const { menuList } = useMenu();
  console.log(menuList);
  const [activeKey, setActiveKey] = useState("1");
  const categoryList = ['咖啡', '茶', '風味飲', '早餐盤', '鹹食', '輕食', '甜點', '每日特餐'];
  console.log(categoryList);
  const previousPage = () => {
    setActiveKey(`${parseInt(activeKey) - 1}`);
  };
  const nextPage = () => {
    setActiveKey(`${parseInt(activeKey) + 1}`);
  };
  const [isWelcomePage, setIsWelcomePage] = useState(true);

  const handleStart = () => {
    setIsWelcomePage(false);
  };

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
  // const fetchMenu = async () => {
  //   try {
  //     const response = await instance.get("/menu/getMenu");
  //     setMenuList(response.data.menuList);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // useEffect(() => {
  //   fetchMenu();
  // }, []);
  return (
    <>
      {isWelcomePage ? (
        <div className="container">
          <div className="centeredContent">
            <img
              src="assets/shiujiou.png"
              alt="Shiujiou Image"
              style={{ maxHeight: "100%", height: "70%" }}
            />
            <button
              className="startButton"
              onClick={() => {
                handleStart();
              }}
            >
              Start
            </button>
          </div>
        </div>
      ) : (
        <div className="menuContainer">
          <Tabs
            activeKey={activeKey}
            defaultActiveKey="1"
            tabBarStyle={{ display: "none" }}
          >
            {categoryList.map((category, index) => (
              <Tabs.TabPane tab={category} key={index + 1}>
                <div className="menuWrapper">
                  <button
                    className="pageBtn"
                    onClick={() => {
                      previousPage();
                    }}
                    disabled={activeKey === "1"}
                  >
                    <CaretLeftOutlined />
                  </button>
                  <div className="menu">
                    {transformData(menuList)
                      .filter((item) => item.itemCategory === category)
                      .map((item) => (
                        <div
                          key={item.itemId}
                          className="menuItem menu-font"
                          style={{
                            opacity: item.status === "serving" ? 1 : 0.3,
                          }}
                        >
                          {`${item.itemName} \u00A0 /`} {item.price}
                        </div>
                      ))}
                  </div>
                  <button
                    className="pageBtn"
                    onClick={() => {
                      nextPage();
                    }}
                    disabled={activeKey === "8"}
                  >
                    <CaretRightOutlined />
                  </button>
                </div>
              </Tabs.TabPane>
            ))}
          </Tabs>
        </div>
      )}
    </>
  );
};
export default MENU;
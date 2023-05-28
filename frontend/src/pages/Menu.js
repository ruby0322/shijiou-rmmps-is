import React, { useState, useEffect } from "react";
import instance from "../axios";
import { Tabs } from "antd";
import { CaretRightOutlined, CaretLeftOutlined } from "@ant-design/icons";
import "./css/menu.css";

const inialMenuList = [
  {
    itemCategory: "咖啡",
    itemName: "黑咖啡",
    price: 100,
    description: [],
    status: "soldOut",
  },
  {
    itemCategory: "咖啡",
    itemName: "經典拿鐵",
    price: 120,
    description: [],
    status: "serving",
  },
  {
    itemCategory: "咖啡",
    itemName: "肉桂卡布",
    price: 120,
    description: [],
    status: "serving",
  },
  {
    itemCategory: "咖啡",
    itemName: "焦糖瑪奇朵",
    price: 140,
    description: [],
    status: "serving",
  },
  {
    itemCategory: "咖啡",
    itemName: "香草拿鐵",
    price: 140,
    description: [],
    status: "serving",
  },
  {
    itemCategory: "咖啡",
    itemName: "黑糖拿鐵",
    price: 140,
    description: [],
    status: "serving",
  },
  {
    itemCategory: "咖啡",
    itemName: "西西里冰咖啡",
    price: 140,
    description: [],
    status: "soldOut",
  },
  {
    itemCategory: "咖啡",
    itemName: "漂浮冰咖啡",
    price: 120,
    description: [],
    status: "serving",
  },
  {
    itemCategory: "咖啡",
    itemName: "巧克力摩卡",
    price: 150,
    description: [],
    status: "serving",
  },
  {
    itemCategory: "咖啡",
    itemName: "蜂蜜肉桂拿鐵",
    price: 150,
    description: [],
    status: "serving",
  },
  {
    itemCategory: "咖啡",
    itemName: "漂浮脆脆拿鐵",
    price: 150,
    description: [],
    status: "serving",
  },

  {
    itemCategory: "茶",
    itemName: "養生花草茶",
    price: 120,
    description: [],
    status: "serving",
  },
  {
    itemCategory: "茶",
    itemName: "洋甘菊花茶",
    price: 120,
    description: [],
    status: "serving",
  },
  {
    itemCategory: "茶",
    itemName: "桂花荷葉茶",
    price: 120,
    description: [],
    status: "serving",
  },
  {
    itemCategory: "茶",
    itemName: "薄荷早安茶",
    price: 120,
    description: [],
    status: "serving",
  },
  {
    itemCategory: "茶",
    itemName: "洛神玫瑰茶",
    price: 120,
    description: [],
    status: "serving",
  },
  {
    itemCategory: "茶",
    itemName: "新鮮水果茶",
    price: 150,
    description: [],
    status: "serving",
  },
  {
    itemCategory: "茶",
    itemName: "韓國柚子茶",
    price: 140,
    description: [],
    status: "serving",
  },
  {
    itemCategory: "茶",
    itemName: "伯爵紅茶",
    price: 100,
    description: [],
    status: "serving",
  },
  {
    itemCategory: "茶",
    itemName: "蘋果冰茶",
    price: 110,
    description: [],
    status: "serving",
  },
  {
    itemCategory: "茶",
    itemName: "鳳梨冰茶",
    price: 110,
    description: [],
    status: "serving",
  },
  {
    itemCategory: "茶",
    itemName: "薄荷檸檬紅",
    price: 110,
    description: [],
    status: "serving",
  },

  {
    itemCategory: "風味飲",
    itemName: "雪鹽焦糖奶茶",
    price: 140,
    description: [],
    status: "serving",
  },
  {
    itemCategory: "風味飲",
    itemName: "印度香料奶茶",
    price: 140,
    description: [],
    status: "serving",
  },
  {
    itemCategory: "風味飲",
    itemName: "小農鮮奶茶",
    price: 120,
    description: [],
    status: "serving",
  },
  {
    itemCategory: "風味飲",
    itemName: "黑糖鮮奶茶",
    price: 120,
    description: [],
    status: "serving",
  },
  {
    itemCategory: "風味飲",
    itemName: "鹹奶蓋紅茶",
    price: 120,
    description: [],
    status: "serving",
  },
  {
    itemCategory: "風味飲",
    itemName: "可可牛奶",
    price: 140,
    description: [],
    status: "soldOut",
  },
  {
    itemCategory: "風味飲",
    itemName: "抹茶牛奶",
    price: 130,
    description: [],
    status: "serving",
  },
  {
    itemCategory: "風味飲",
    itemName: "蜂蜜檸檬氣泡",
    price: 130,
    description: [],
    status: "serving",
  },
  {
    itemCategory: "風味飲",
    itemName: "經典柚子氣泡",
    price: 130,
    description: [],
    status: "serving",
  },
  {
    itemCategory: "風味飲",
    itemName: "藍莓果粒氣泡",
    price: 130,
    description: [],
    status: "soldOut",
  },
  {
    itemCategory: "風味飲",
    itemName: "自製草莓氣泡",
    price: 130,
    description: [],
    status: "serving",
  },
  {
    itemCategory: "風味飲",
    itemName: "酸甜青梅氣泡",
    price: 130,
    description: [],
    status: "serving",
  },
  {
    itemCategory: "風味飲",
    itemName: "百香必思氣泡",
    price: 130,
    description: [],
    status: "serving",
  },
  {
    itemCategory: "風味飲",
    itemName: "蘋果風味氣泡",
    price: 130,
    description: [],
    status: "serving",
  },
  {
    itemCategory: "風味飲",
    itemName: "鳳梨冰茶氣泡",
    price: 130,
    description: [],
    status: "serving",
  },
  {
    itemCategory: "早餐盤",
    itemName: "旭舊早餐盤",
    price: 280,
    description: [
      "嫩煎去骨雞腿排、花香炒櫛菇、生菜佐巴薩米克油醋、楓糖可頌、微糖優格",
      "附蛋 / 太陽蛋、全熟蛋、炒嫩蛋,擇一",
    ],
    status: "serving",
  },
  {
    itemCategory: "早餐盤",
    itemName: "日常早餐盤",
    price: 280,
    description: [
      "德式香腸、培根、花香炒櫛菇、生菜佐巴薩米克油醋、美式煎餅、微糖優格",
      "附蛋 / 太陽蛋、全熟蛋、炒嫩蛋,擇一",
    ],
    status: "serving",
  },
  {
    itemCategory: "早餐盤",
    itemName: "經典早餐盤",
    price: 320,
    description: [
      "漢堡肉、花香炒櫛菇、生菜佐巴薩米克油醋、楓糖可頌、微糖優格",
      "附蛋 / 太陽蛋、全熟蛋、炒嫩蛋,擇一",
    ],
    status: "serving",
  },
  {
    itemCategory: "早餐盤",
    itemName: "無肉早餐盤",
    price: 320,
    description: [
      "beyond未來肉、花香炒櫛菇、生菜佐巴薩米克油醋、楓糖可頌、微糖優格",
      "附蛋 / 太陽蛋、全熟蛋、炒嫩蛋,擇一",
    ],
    status: "serving",
  },
  {
    itemCategory: "早餐盤",
    itemName: "美式早餐",
    price: 320,
    description: ["花生培根牛肉排漢堡、花香炒櫛菇、莎莎醬佐玉米脆片、炒嫩蛋"],
    status: "serving",
  },
  {
    itemCategory: "早餐盤",
    itemName: "台式早餐",
    price: 320,
    description: ["墨西哥莎莎嫩雞漢堡、花香炒櫛菇、莎莎醬佐玉米脆片、炒嫩蛋"],
    status: "serving",
  },
  {
    itemCategory: "鹹食",
    itemName: "台式打拋豬飯",
    price: 200,
    description: ["附蛋 / 太陽蛋、全熟蛋、炒嫩蛋,擇一"],
    status: "serving",
  },
  {
    itemCategory: "鹹食",
    itemName: "嫩煎雞腿排飯",
    price: 220,
    description: ["附蛋 / 太陽蛋、全熟蛋、炒嫩蛋,擇一"],
    status: "serving",
  },
  {
    itemCategory: "鹹食",
    itemName: "時蔬花椰米飯",
    price: 260,
    description: ["附蛋 / 太陽蛋、全熟蛋、炒嫩蛋,擇一"],
    status: "serving",
  },
  {
    itemCategory: "輕食",
    itemName: "大方分享好吃的水餃",
    price: 150,
    description: ["阿姨們手工包的餃子,內餡是香甜的白韭菜豬肉,不沾醬也好吃"],
    status: "serving",
  },
  {
    itemCategory: "輕食",
    itemName: "單點的胡麻時蔬",
    price: 80,
    description: ["可以詢問夥伴今日的胡麻時蔬是什麼蔬菜喔"],
    status: "serving",
  },
  {
    itemCategory: "輕食",
    itemName: "單點的花香炒櫛菇",
    price: 80,
    description: ["特別的花香醬,搭配櫛瓜、鴻禧菇、雪白菇等時蔬,翻炒至香氣十足"],
    status: "serving",
  },
  {
    itemCategory: "輕食",
    itemName: "莎莎醬玉米脆片",
    price: 120,
    description: ["各位解饞的好夥伴"],
    status: "serving",
  },
  {
    itemCategory: "輕食",
    itemName: "楓糖奶油煎餅",
    price: 150,
    description: [],
    status: "serving",
  },
  {
    itemCategory: "輕食",
    itemName: "楓糖奶油可頌",
    price: 150,
    description: [],
    status: "serving",
  },
  {
    itemCategory: "輕食",
    itemName: "迷你奶油吐司",
    price: 150,
    description: [],
    status: "serving",
  },
  {
    itemCategory: "甜點",
    itemName: "提拉米蘇",
    price: 160,
    description: [
      "沒有加太多的吉利丁",
      "口感上濕潤又帶點微醺",
      "不會醉 但也許會 無法自拔的陶醉",
    ],
    status: "serving",
  },
  {
    itemCategory: "甜點",
    itemName: "焦糖脆脆戚風",
    price: 180,
    description: [
      "歷史悠久的椪糖與手工焦糖醬的融合",
      "蛋糕體是完美解膩的伯爵茶",
    ],
    status: "serving",
  },
  {
    itemCategory: "每日特餐",
    itemName: "超好吃咩咩qq奶茶",
    price: 180,
    description: ["我亂取的"],
    status: "serving",
  },
];

const MENU = () => {
  const [menuList, setMenuList] = useState(inialMenuList);
  console.log(menuList);
  const [activeKey, setActiveKey] = useState("1");
  const categoryList = [...new Set(menuList.map((item) => item.itemCategory))];
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
                    disabled={activeKey == "1" ? true : false}
                  >
                    <CaretLeftOutlined />
                  </button>
                  <div className="menu">
                    {menuList
                      .filter((item) => item.itemCategory === category)
                      .map((item) => (
                        <div
                          key={item.itemId}
                          className="menuItem"
                          style={{
                            opacity: item.status == "serving" ? 1 : 0.3,
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
                    disabled={activeKey == "8" ? true : false}
                  >
                    <CaretRightOutlined />
                  </button>
                </div>
              </Tabs.TabPane>
            ))}
            {/* <Tabs.TabPane tab="咖啡" key="1">
      {menuList
        .filter((item) => item.itemCategory === "咖啡")
        .map((item) => (
          <div key={item.itemId} style={{ writingMode: "vertical-rl" }}>
            <h4>
              {item.itemName} {item.price}
            </h4>
          </div>
        ))}
    </Tabs.TabPane> */}
          </Tabs>
        </div>
      )}
    </>
  );
};
export default MENU;

import React, { useState, useEffect } from "react";
import instance from "../axios";

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
    </div>
  );
};
export default Menu;

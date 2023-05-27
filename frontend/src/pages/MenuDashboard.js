import React, { useState, useEffect } from "react";
import instance from "../axios";

const MenuDashboard = () => {
  const [menuList, setMenuList] = useState([]);
  const [itemName, setItemName] = useState("");
  const [itemCategory, setItemCategory] = useState("");
  const [price, setPrice] = useState("");

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

  const addMenuItem = async () => {
    try {
      const response = await instance.post("/menu/addItem", {
        itemName,
        itemCategory,
        price,
      });
      console.log(response.data);
      fetchMenu();
    } catch (error) {
      console.log(error);
    }
  };

  const updateItemContent = async (itemId, newName, newCategory, newPrice) => {
    try {
      const response = await instance.put("/menu/updateItemContent", {
        itemId,
        newName,
        newCategory,
        newPrice,
      });
      console.log(response.data);
      fetchMenu();
    } catch (error) {
      console.log(error);
    }
  };

  const updateItemStatus = async (itemId, status) => {
    try {
      const response = await instance.put("/menu/updateItemStatus", {
        itemId,
      });
      console.log(response.data);
      fetchMenu();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteMenuItem = async (itemId) => {
    try {
      const response = await instance.delete(`/menu/deleteItem/${itemId}`);
      console.log(response.data);
      fetchMenu();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Menu Dashboard</h2>
      <div>
        <h3>Add Menu Item</h3>
        <input
          type="text"
          placeholder="Item Name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Item Category"
          value={itemCategory}
          onChange={(e) => setItemCategory(e.target.value)}
        />
        <input
          type="text"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button type="button" onClick={addMenuItem}>
          Add Item
        </button>
      </div>
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
              <button
                type="button"
                onClick={() =>
                  updateItemContent(item.itemId, "New Name", "New Category", 0)
                }
              >
                Update Content
              </button>
              <button
                type="button"
                onClick={() => updateItemStatus(item.itemId, item.status)}
              >
                {item.status === "serving" ? "Set Sold Out" : "Set Serving"}
              </button>
              <button type="button" onClick={() => deleteMenuItem(item.itemId)}>
                Delete Item
              </button>
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
              <button
                type="button"
                onClick={() =>
                  updateItemContent(item.itemId, "New Name", "New Category", 0)
                }
              >
                Update Content
              </button>
              <button
                type="button"
                onClick={() => updateItemStatus(item.itemId, item.status)}
              >
                {item.status === "serving" ? "Set Sold Out" : "Set Serving"}
              </button>
              <button type="button" onClick={() => deleteMenuItem(item.itemId)}>
                Delete Item
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};
export default MenuDashboard;

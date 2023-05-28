import { useContext, createContext, useState, useEffect } from "react";
import instance from "../axios.js";

const MenuContext = createContext({
  menuList: {},
  addMenuItem: () => {},
  updateItemContent: () => {},
  updateItemStatus: () => {},
  deleteMenuItem: () => {},
});

const MenuProvider = (props) => {
  const [menuList, setMenuList] = useState({});

  const fetchMenu = async () => {
    try {
      const res = await instance.get("/menu/getMenu");
      console.log("dd", res.data);
      setMenuList(res.data);
    } catch (error) {  
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, [setMenuList]);

  const addMenuItem = async (itemName, itemCategory, price) => {
    try {
        const res = await instance.post("/menu/addItem", {
            itemName,
            itemCategory,
            price,
        });
        let newMenuList = { ...menuList };
        newMenuList[res.data.itemId] = res.data.newMenuItem;
        setMenuList(newMenuList);
    } catch (error) {
        console.log(error);
    }
  };

  const updateItemContent = async (itemId, newName, newCategory, newPrice) => {
    try {
        const res = await instance.put("/menu/updateItemContent", {
            itemId,
            newName,
            newCategory,
            newPrice,
        });
        let newMenuList = { ...menuList };
        newMenuList[itemId] = res.data;
        setMenuList(newMenuList);
    } catch (error) {
        console.log(error);
    }
  };

  const updateItemStatus = async (itemId) => {
    try {
      const res = await instance.put("/menu/updateItemStatus", {
        itemId,
      });
      let newMenuList = { ...menuList };
      newMenuList[itemId].status = res.data.status;
      setMenuList(newMenuList);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteMenuItem = async (itemId) => {
    try {
      const res = await instance.delete(`/menu/deleteItem/${itemId}`);
      let newMenuList = { ...menuList };
      delete newMenuList[itemId];
      setMenuList(newMenuList);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MenuContext.Provider value={{
        menuList,
        addMenuItem,
        updateItemContent,
        updateItemStatus,
        deleteMenuItem,
      }} 
      { ...props }  
    />
  )

};

const useMenu = () => useContext(MenuContext);

export { MenuProvider, useMenu };



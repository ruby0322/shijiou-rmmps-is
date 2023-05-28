import express from "express";
import { db } from "../db.js";
import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import MenuItem from "../schema/MenuItem.js";

const menuRouter = express.Router();

const menuRef = collection(db, "menuItems");

menuRouter.get("/getMenu", async (req, res) => {
  try { 
    const fullMenu = await getDocs(menuRef);
    let menuList = {};
    fullMenu.forEach((document) => {
      menuList[document.id] = document.data();
      console.log(document.id, " => ", document.data());
    });
    res.status(200).json(menuList);
  } catch (error) {
    console.log(error);
  }
});

menuRouter.post("/addItem", async (req, res) => {
  try {
    const itemName = req.body.itemName;
    const itemCategory = req.body.itemCategory;
    const price = req.body.price;
    // const status = req.body.status;
    const newItem = new MenuItem(itemName, itemCategory, price);
    const newItemRef = await addDoc(menuRef, { ...newItem });
    console.log(newItemRef.id);
    res.status(200).json({
      newMenuItem: { ...newItem },
      itemId: newItemRef.id,
    });
  } catch (error) {
    console.log(error);
  }
});

menuRouter.put("/updateItemContent", async (req, res) => {
  try {
    const itemId = req.body.itemId;
    const itemRef = doc(db, "menuItems", itemId);
    const newItemName = req.body.newName;
    const newItemCategory = req.body.newCategory;
    const newPrice = req.body.newPrice;
    // const status = req.body.status;
    await updateDoc(itemRef, {
      itemName: newItemName,
      itemCategory: newItemCategory,
      price: newPrice,
    });
    const item = await getDoc(itemRef);
    res.status(200).json(item.data());
  } catch (error) {
    console.log(error);
  }
});

menuRouter.put("/updateItemStatus", async (req, res) => {
  try {
    const itemId = req.body.itemId;
    const itemRef = doc(db, "menuItems", itemId);
    const item = await getDoc(itemRef);
    const newStatus = (item.data().status === "serving" ? "soldout" : "serving");
    await updateDoc(itemRef, {
      status: newStatus,
    });
    res.status(200).json({
      itemId: itemId,
      status: newStatus,
    });
  } catch (error) {
    console.log(error);
  }
});

menuRouter.delete("/deleteItem/:itemId", async (req, res) => {
  try {
    const itemId = req.params.itemId;
    const itemRef = doc(db, "menuItems", itemId);
    await deleteDoc(itemRef);
    res.status(200).send({
      message: "item is deleted successfully",
      itemId,
    });
  } catch (error) {
    console.log(error);
  }
});

export default menuRouter;

/*
/menu
    /getMenu
    /addItem
    /updateItemContent
    /updateItemStatus
    /deleteItem
*/

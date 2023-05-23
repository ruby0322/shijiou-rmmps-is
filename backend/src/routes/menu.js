import express from "express";
import { db } from '../db.js';
import { collection, doc, addDoc, getDocs, updateDoc, deleteDoc } from "firebase/firestore"; 
import MenuItem from "../schema/MenuItem.js";

const menuRouter = express.Router();

const menuRef = collection(db, "menuItems");

menuRouter.get("/getMenu", async (req, res) => {
    try {
        const fullMenu = await getDocs(menuRef);
        let menuList = [];
        fullMenu.forEach(doc => {
            menuList.push({id: doc.id, ...doc.data()});
            console.log(doc.id, " => ", doc.data());
        })
        res.status(200).json({
            menuList: menuList,
        });
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
        const newItemRef = await addDoc(menuRef, {...newItem});
        console.log(newItemRef.id);
        res.status(200).json({
            newItem: newItem,
        });
    } catch (error) {
        console.log(error);
    }
});

menuRouter.put("/updateItemContent", async (req, res) => {
    try {
        const itemId = req.body.itemId;
        const itemName = req.body.itemName;
        const itemCategory = req.body.itemCategory;
        const price = req.body.price;
        // const status = req.body.status;
        const itemRef = doc(db, "menuItems", itemId);
        await updateDoc(itemRef, {
            itemName: itemName,
            itemCategory: itemCategory,
            price: price,
        });
        res.status(200).end();
    } catch (error) {
        console.log(error);
    }
});

menuRouter.put("/updateItemStatus", async (req, res) => {
    try {
        const itemId = req.body.itemId;
        const status = req.body.status;
        const itemRef = doc(db, "menuItems", itemId);
        await updateDoc(itemRef, {
            status: status,
        });
        res.status(200).end();
    } catch (error) {
        console.log(error);
    }
});

menuRouter.delete("/deleteItem", async (req, res) => {
    try {
        const itemId = req.body.itemId;
        const itemRef = doc(db, "menuItems", itemId);
        await deleteDoc(itemRef);
        res.status(200).end();
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
    /updateItemeStatus
    /deleteItem
*/
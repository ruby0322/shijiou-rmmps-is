import express from "express";
import { db } from '../db.js';
import { collection, doc, addDoc, getDoc, getDocs, updateDoc, deleteDoc } from "firebase/firestore"; 
import TodaySpecial from "../schema/TodaySpecial.js";

const todaySpecialRouter = express.Router();

const todaySpecialCollectionName = "todaySpecials";
const todaySpecialRef = collection(db, todaySpecialCollectionName);

todaySpecialRouter.get("/getTodaySpecial", async (req, res) => {
    try {
        const fullTodaySpecials = await getDocs(todaySpecialRef);
        let todaySpecialList = [];
        fullTodaySpecials.forEach(doc => {
            todaySpecialList.push({itemId: doc.id, ...doc.data()});
            console.log(doc.id, " => ", doc.data());
        })
        res.status(200).json({
            todaySpecialList: todaySpecialList,
        });
    } catch (error) {
        console.log(error);
    }
});

todaySpecialRouter.post("/addItem", async (req, res) => {
    try {
        const itemName = req.body.itemName;
        const itemCategory = req.body.itemCategory;
        const price = req.body.price;
        // const status = req.body.status;
        const newItem = new TodaySpecial(itemName, itemCategory, price);
        const newItemRef = await addDoc(todaySpecialRef, {...newItem});
        console.log(newItemRef.id);
        res.status(200).json({
            message: "today special item is added successfully",
            newItem: {...newItem, itemId: newItemRef.id},
        });
    } catch (error) {
        console.log(error);
    }
});

todaySpecialRouter.put("/updateItemContent", async (req, res) => {
    try {
        const itemId = req.body.itemId;
        const itemRef = doc(db, todaySpecialCollectionName, itemId);
        const newItemName = req.body.newItemName;
        const newItemCategory = req.body.newItemCategory;
        const newPrice = req.body.newPrice;
        // const status = req.body.status;
        await updateDoc(itemRef, {
            itemName: newItemName,
            itemCategory: newItemCategory,
            price: newPrice,
        });
        res.status(200).json({
            message: "item content is updated successfully",
            itemId: itemId,
            itemName: newItemName,
            itemCategory: newItemCategory,
            price: newPrice,
        });
    } catch (error) {
        console.log(error);
    }
});

todaySpecialRouter.put("/updateItemStatus", async (req, res) => {
    try {
        const itemId = req.body.itemId;
        const itemRef = doc(db, todaySpecialCollectionName, itemId);
        const item = await getDoc(itemRef);
        const newStatus = ((item.data().status === "serving") ? "soldout" : "serving");
        await updateDoc(itemRef, {
            status: newStatus,
        });
        res.status(200).json({
            message: "item status is updated successfully",
            itemId: itemId,
            status: newStatus,
        });
    } catch (error) {
        console.log(error);
    }
});

todaySpecialRouter.delete("/deleteItem", async (req, res) => {
    try {
        const itemId = req.body.itemId;
        const itemRef = doc(db, todaySpecialCollectionName, itemId);
        await deleteDoc(itemRef);
        res.status(200).send({
            message: "item is deleted successfully",
            itemId,
        });
    } catch (error) {
        console.log(error);
    }
});

export default todaySpecialRouter;


/*
/menu
    /getMenu
    /addItem
    /updateItemContent
    /updateItemStatus
    /deleteItem
*/
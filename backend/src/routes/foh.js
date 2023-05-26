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
import FOHTable from "../schema/FOHTable.js";

const fohRouter = express.Router();
const fohTableCollectionName = "fohTables";
const fohRef = collection(db, fohTableCollectionName);

fohRouter.get("/getFOH", async (req, res) => {
  try {
    const allTables = await getDocs(fohRef);
    let tableList = [];
    allTables.forEach((doc) => {
      tableList.push({ tableId: doc.id, ...doc.data() });
      console.log(doc.id, " => ", doc.data());
    });
    res.status(200).json({
      message: "load FOH data successfully",
      tableList: tableList,
    });
  } catch (error) {
    console.log(error);
  }
});

fohRouter.post("/addTable", async (req, res) => {
  try {
    const tableName = req.body.tableName;
    const area = req.body.area;
    console.log(tableName, area);

    const newTable = new FOHTable(tableName, area);
    console.log(newTable.tableName, newTable.area, newTable.status);
    const newTableRef = await addDoc(fohRef, { ...newTable });
    console.log(newTableRef.id);
    res.status(200).json({
      message: "new table is added successfully",
      newTable: { ...newTable, tableId: newTableRef.id },
    });
  } catch (error) {
    console.log(error);
  }
});

fohRouter.put("/updateTableStatus", async (req, res) => {
  try {
    const tableId = req.body.tableId;

    const tableRef = doc(db, fohTableCollectionName, tableId);
    const table = await getDoc(tableRef);
    const newStatus =
      table.data().status === "occupied" ? "vacant" : "occupied";
    await updateDoc(tableRef, {
      status: newStatus,
    });
    res.status(200).json({
      message: "table status is updated successfully",
      tableId: tableId,
      status: newStatus,
    });
  } catch (error) {
    console.log(error);
  }
});

fohRouter.delete("/deleteTable/:tableId", async (req, res) => {
  try {
    const tableId = req.params.tableId;

    const tableRef = doc(db, fohTableCollectionName, tableId);
    await deleteDoc(tableRef);

    res.status(200).json({
      message: "table is deleted successfully",
      tableId: tableId,
    });
  } catch (error) {
    console.log(error);
  }
});

export default fohRouter;

/* 

/foh
    /getFOH
    /addTable
    /updateTableStatus
    /deleteTable
*/

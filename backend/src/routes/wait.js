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

const waitRequestRouter = express.Router();
const todayWaitCollection = "todayWaitRef";
const historyWaitCollection = "historyWaitRef";
const todayWaitRef = collection(db, todayWaitCollection);
const historyWaitRef = collection(db, historyWaitCollection);


waitRequestRouter.get("/getTodayWait", async (req, res) => {
    try {
        const todayWaitRequests = await getDocs(todayWaitRef);
        let todayWaitList = [];
        todayWaitRequests.forEach((doc) => {
            todayWaitList.push({ waitReqId: doc.id, ...doc.data() });
            console.log(doc.id, " => ", doc.data());
        });
        res.status(200).json({
            todayWaitList,
        });
    } catch (error) {
        console.log(error);
    }
})



waitRequestRouter.put("/notify", async (req, res) => {
    try {
        const waitReqId = req.body.waitReqId;
        const waitReqRef = doc(db, todayWaitCollection, waitReqId);
        await updateDoc(waitReqRef, {
            status: "notified",
        });
        res.status(200).json({
            message: "wait request status is updated to notified",
            waitReqId: waitReqId,
        });
    } catch (error) {
        console.log(error);
    }
})

waitRequestRouter.put("/done", async (req, res) => {
    try {
        const waitReqId = req.body.waitReqId;
        const waitReqRef = doc(db, todayWaitCollection, waitReqId);
        await updateDoc(waitReqRef, {
            isWaiting: false,
            status: "arrived",
        });
        res.status(200).json({
            message: "wait request status is updated to arrived",
            waitReqId: waitReqId,
        });
    } catch (error) {
        console.log(error);
    }
})

waitRequestRouter.put("/remove", async (req, res) => {
    try {
        const waitReqId = req.body.waitReqId;
        const waitReqRef = doc(db, todayWaitCollection, waitReqId);

        await updateDoc(waitReqRef, {
            isWaiting: false,
            status: "removed",
        });

        res.status(200).json({
            message: "wait request status is updated to removed",
            waitReqId: waitReqId,
        });
    } catch (error) {
        console.log(error);
    }
})

waitRequestRouter.put("/clear", async (req, res) => {
    try {
        const todayWaitRequests = await getDocs(todayWaitRef);
        todayWaitRequests.forEach(async (doc) => {
            const docData = { ...doc.data() };
            if (docData.isWaiting === false) {
                await addDoc(historyWaitRef, { ...docData });
                const docRef = doc(db, todayWaitCollection, doc.id);
                await deleteDoc(docRef);
            }
        });
        res.status(200).json({
            message: "wait request is moved to history",
            waitReqId: waitReqId,
        });
    } catch (error) {
        console.log(error);
    }
})

waitRequestRouter.put("/removeAll", async (req, res) => {
    try {
        const todayWaitRequests = await getDocs(todayWaitRef);
        todayWaitRequests.forEach(async (doc) => {
            const docRef = doc(db, todayWaitCollection, doc.id);
            const docData = { ...doc.data() };
            if (docData.isWaiting === true) {
                await addDoc(historyWaitRef, {
                    isWaiting: false,
                    status: "removed",
                    ...docData,
                });
            } else {
                await addDoc(historyWaitRef, {
                    ...docData,
                });
            }
            await deleteDoc(docRef);
        });
        res.status(200).json({
            message: "wait request status is updated to removed",
            waitReqId: waitReqId,
        });
    } catch (error) {
        console.log(error);
    }
})

export default waitRequestRouter;
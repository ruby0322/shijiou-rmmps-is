import express from "express";
import { db } from "../db.js";
import WaitRequest from "../schema/WaitRequest.js";
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
const todayWaitCollection = "todayWaitRequests";
const historyWaitCollection = "historyWaitRequests";
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

waitRequestRouter.get("/getHistoryWait", async (req, res) => {
    try {
        const historyWaitRequests = await getDocs(historyWaitRef);
        let historyWaitList = [];
        historyWaitRequests.forEach((document) => {
            historyWaitList.push({ waitReqId: document.id, ...document.data() });
            console.log(document.id, " => ", document.data());
        });
        res.status(200).json({
            historyWaitList,
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
        // line notify user
        /*

        */
        res.status(200).json({
            message: `wait request ${waitReqId} status is updated to notified`,
        });
    } catch (error) {
        console.log(error);
    }
})

waitRequestRouter.put("/late", async (req, res) => {
    try {
        const waitReqId = req.body.waitReqId;
        const waitReqRef = doc(db, todayWaitCollection, waitReqId);
        await updateDoc(waitReqRef, {
            status: "late",
        });
        res.status(200).json({
            message: `wait request ${waitReqId} status is updated to late`,
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
            message: `wait request ${waitReqId} status is updated to arrived`,
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
            message: `wait request ${waitReqId} status is updated to removed`,
        });
    } catch (error) {
        console.log(error);
    }
})

waitRequestRouter.put("/clear", async (req, res) => {
    try {
        const todayWaitRequests = await getDocs(todayWaitRef);
        todayWaitRequests.forEach(async (document) => {
            const docData = { ...document.data() };
            if (docData.isWaiting === false) {
                await addDoc(historyWaitRef, { ...docData });
                console.log(document.id);
                const docRef = doc(db, todayWaitCollection, document.id);
                await deleteDoc(docRef);
            }
        });
        res.status(200).json({
            message: `all non-pending wait requests are moved to history`,
        });
    } catch (error) {
        console.log(error);
    }
})

waitRequestRouter.put("/removeAll", async (req, res) => {
    try {
        const todayWaitRequests = await getDocs(todayWaitRef);
        todayWaitRequests.forEach(async (document) => {
            const docRef = doc(db, todayWaitCollection, document.id);
            const docData = { ...document.data() };
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
            message: "all wait requests are moved to history",
        });
    } catch (error) {
        console.log(error);
    }
})

waitRequestRouter.post("/addWaitReq", async (req, res) => {
    try {
        const { waitingNumber, lineUserId, status, groupSize, requestMadeTime } = req.body;
        const newReq = new WaitRequest(waitingNumber, lineUserId, status, groupSize, requestMadeTime);
        const newReqRef = await addDoc(todayWaitRef, { ...newReq });
        console.log(newReqRef.id);
        res.status(200).json({
            message: `new request ${newReqRef.id} is added successfully`,
        });
    } catch (error) {
        console.log(error);
    }
})

export default waitRequestRouter;
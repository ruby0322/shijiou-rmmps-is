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
import { notifyLINEUser } from '../botUtils.js';

const waitRequestRouter = express.Router();
const todayWaitCollection = "todayWaitRequests";
const historyWaitCollection = "historyWaitRequests";
const todayWaitRef = collection(db, todayWaitCollection);
const historyWaitRef = collection(db, historyWaitCollection);

waitRequestRouter.get("/getTodayWait", async (req, res) => {
  try {
    const todayWaitRequests = await getDocs(todayWaitRef);
    let todayWaitList = {};
    todayWaitRequests.forEach((document) => {
      todayWaitList[document.id] = document.data();
      console.log(document.id, " => ", document.data());
    });
    res.status(200).json(todayWaitList);
  } catch (error) {
    console.log(error);
  }
});

waitRequestRouter.get("/getHistoryWait", async (req, res) => {
  try {
    const historyWaitRequests = await getDocs(historyWaitRef);
    let historyWaitList = {};
    historyWaitRequests.forEach((document) => {
      historyWaitList[document.id] = document.data();
      console.log(document.id, " => ", document.data());
    });
    res.status(200).json(historyWaitList);
  } catch (error) {
    console.log(error);
  }
});

waitRequestRouter.put("/notify", async (req, res) => {
  try {
    const waitReqId = req.body.waitReqId;
    const waitReqRef = doc(db, todayWaitCollection, waitReqId);
    await updateDoc(waitReqRef, {
      status: "notified",
      requestAnsweredTime: Date.now(),
    });
    const docSnap = await getDoc(waitReqRef);
    const lineUserId = docSnap.data().lineUserId;
    // line notify user
    notifyLINEUser(lineUserId);
    res.status(200).json({
      message: `wait request ${waitReqId} status is updated to notified`,
    });
  } catch (error) {
    console.log(error);
  }
});

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
});

// waitRequestRouter.put("/cancel", async (req, res) => {
//   try {
//     const waitReqId = req.body.waitReqId;
//     const waitReqRef = doc(db, todayWaitCollection, waitReqId);
//     await updateDoc(waitReqRef, {
//       isWaiting: false,
//       status: "canceled",
//       arriveTime: Date.now(),
//     });
//     res.status(200).json({
//       message: `wait request ${waitReqId} status is updated to arrived`,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// });

waitRequestRouter.put("/done", async (req, res) => {
  try {
    const waitReqId = req.body.waitReqId;
    const waitReqRef = doc(db, todayWaitCollection, waitReqId);
    await updateDoc(waitReqRef, {
      isWaiting: false,
      status: "arrived",
      arriveTime: Date.now(),
    });
    const waitReqSnap = await getDoc(waitReqRef);
    const lineUserId = waitReqSnap.data().lineUserId;
    await updateDoc(doc(db, "customers", lineUserId), {
      isWaiting: false,
      waitRequestId: null,
    });
    res.status(200).json({
      message: `wait request ${waitReqId} status is updated to arrived`,
    });
  } catch (error) {
    console.log(error);
  }
});

waitRequestRouter.put("/remove", async (req, res) => {
  try {
    const waitReqId = req.body.waitReqId;
    const waitReqRef = doc(db, todayWaitCollection, waitReqId);

    await updateDoc(waitReqRef, {
      isWaiting: false,
      status: "removed",
    });

    const waitReqSnap = await getDoc(waitReqRef);
    const lineUserId = waitReqSnap.data().lineUserId;
    await updateDoc(doc(db, "customers", lineUserId), {
      isWaiting: false,
      waitRequestId: null,
    });

    res.status(200).json({
      message: `wait request ${waitReqId} status is updated to removed`,
    });
  } catch (error) {
    console.log(error);
  }
});

waitRequestRouter.put("/clear", async (req, res) => {
  try {
    const todayWaitRequests = await getDocs(todayWaitRef);
    let newlyAddHistoryWaitReqs = {};
    todayWaitRequests.forEach(async (document) => {
      const docData = { ...document.data() };
      if (docData.isWaiting === false) {
        const newHistDocRef = await addDoc(historyWaitRef, { ...docData });
        console.log(newHistDocRef.id);
        newlyAddHistoryWaitReqs[newHistDocRef.id] = docData;
        const docRef = doc(db, todayWaitCollection, document.id);
        await deleteDoc(docRef);
      }
    });
    res.status(200).json(newlyAddHistoryWaitReqs);
  } catch (error) {
    console.log(error);
  }
}); 

waitRequestRouter.put("/removeAll", async (req, res) => {
  try {
    const todayWaitRequests = await getDocs(todayWaitRef);
    let newlyAddHistoryWaitReqs = {};
    todayWaitRequests.forEach(async (document) => {
      const docRef = doc(db, todayWaitCollection, document.id);
      let docData = { ...document.data() };
      const waitReqSnap = await getDoc(docRef);
      const lineUserId = waitReqSnap.data().lineUserId;
      await updateDoc(doc(db, "customers", lineUserId), {
        isWaiting: false,
        waitRequestId: null,
      });
      if (docData.isWaiting === true) {
        const newDocData = {
          ...docData,
          isWaiting: false,
          status: "removed",
        };
        console.log("hh");
        console.log(newDocData);
        const newHistDocRef = await addDoc(historyWaitRef, newDocData);
        newlyAddHistoryWaitReqs[newHistDocRef.id] = newDocData;
      } else {
        const newDocData = { ...docData };
        const newHistDocRef = await addDoc(historyWaitRef, newDocData);
        newlyAddHistoryWaitReqs[newHistDocRef.id] = newDocData;
      }
      await deleteDoc(docRef);
    });
    res.status(200).json(newlyAddHistoryWaitReqs);
  } catch (error) {
    console.log(error);
  }
});

waitRequestRouter.post("/addWaitReq", async (req, res) => {
    try {
        const { waitingNumber, lineUserId, status, groupSize, requestMadeTime, isWaiting } = req.body;
        const newReq = new WaitRequest(waitingNumber, lineUserId, groupSize);
        newReq.status = status;
        newReq.requestMadeTime = requestMadeTime;
        newReq.isWaiting = isWaiting;
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

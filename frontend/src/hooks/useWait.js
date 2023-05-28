import { useContext, createContext, useState, useEffect } from "react";
import { collection, doc, addDoc, getDoc, getDocs, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../db.js";

const todayWaitCollection = "todayWaitRequests";
const historyWaitCollection = "historyWaitRequests";
const todayWaitRef = collection(db, todayWaitCollection);
const historyWaitRef = collection(db, historyWaitCollection);


const WaitContext = createContext({

});

const WaitProvider = (props) => {
    const [todayWaitReqs, setTodayWaitReqs] = useState([]);
    const [historyWaitReqs, setHistoryWaitReqs] = useState([]);

    const getTodayWait = async () => {
        const todayWaitRequests = await getDocs(todayWaitRef);
        let todayWaitList = [];
        todayWaitRequests.forEach((doc) => {
            todayWaitList.push({ waitReqId: doc.id, ...doc.data() });
            console.log(doc.id, " => ", doc.data());
        });
        return todayWaitList;
    };

    const getHistoryWait = async () => {
        const historyWaitRequests = await getDocs(historyWaitRef);
        let historyWaitList = [];
        historyWaitRequests.forEach((document) => {
            historyWaitList.push({ waitReqId: document.id, ...document.data() });
            console.log(document.id, " => ", document.data());
        });
        return historyWaitList;
    };

    useEffect(() => {

    }, []);

    const notify = async (waitReqId) => {
        try {
            const waitReqRef = doc(db, todayWaitCollection, waitReqId);
            await updateDoc(waitReqRef, {
                status: "notified",
            });
            // line notify user
        } catch (error) {
            console.log(error);
        }
    };

    const late = async (waitReqId) => {
        try {
            const waitReqRef = doc(db, todayWaitCollection, waitReqId);
            await updateDoc(waitReqRef, {
                status: "late",
            });
        } catch (error) {
            console.log(error);
        }
    };

    const done = async (waitReqId) => {
        try {
            const waitReqRef = doc(db, todayWaitCollection, waitReqId);
            await updateDoc(waitReqRef, {
                isWaiting: false,
                status: "arrived",
            });
        } catch (error) {
            console.log(error);
        }
    };

    const remove = async (waitReqId) => {
        try {
            const waitReqRef = doc(db, todayWaitCollection, waitReqId);
            await updateDoc(waitReqRef, {
                isWaiting: false,
                status: "removed",
            });
        } catch (error) {
            console.log(error);
        }
    };

    const clear = async () => {
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
        } catch (error) {
            console.log(error);
        }
    };

    const removeAll = async () => {
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
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <WaitContext.Provider value={{
            
        }}
        { ...props } />
    )
};

const useWait = () => useContext(WaitContext);

export { WaitProvider, useWait };
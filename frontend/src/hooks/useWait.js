import { useContext, createContext, useState, useEffect } from "react";
import { collection, doc, addDoc, getDoc, getDocs, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../db.js";
import instance from '../axios.js';

const todayWaitCollection = "todayWaitRequests";
const historyWaitCollection = "historyWaitRequests";
const todayWaitRef = collection(db, todayWaitCollection);
const historyWaitRef = collection(db, historyWaitCollection);


const WaitContext = createContext({
    todayWaitReqs: {},
    historyWaitReqs: {},
    notify: () => { },
    late: () => { },
    done: () => { },
    remove: () => { },
    clear: () => { },
    removeAll: () => { },
});

const WaitProvider = (props) => {
    const [todayWaitReqs, setTodayWaitReqs] = useState({});
    const [historyWaitReqs, setHistoryWaitReqs] = useState({});

    const fetchTodayWaitReqs = async () => {
        try {
            const res = await instance.get('wait/getTodayWait');
            setTodayWaitReqs(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    const fetchHistoryWaitReqs = async () => {
        try {
            const res = await instance.get('wait/getHistoryWait');
            setHistoryWaitReqs(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchTodayWaitReqs();
        fetchHistoryWaitReqs();
    }, [setHistoryWaitReqs, setTodayWaitReqs]);
 
    const notify = async (waitReqId) => {
        try {
            const res = await instance.put("/wait/notify", { waitReqId });
            let newTodayWaitReqs = { ...todayWaitReqs };
            newTodayWaitReqs[waitReqId].status = "notified";
            setTodayWaitReqs(newTodayWaitReqs);
        } catch (error) {
            console.log(error); 
        }
    };

    const late = async (waitReqId) => {
        try {
            const res = await instance.put("/wait/late", { waitReqId });
            let newTodayWaitReqs = { ...todayWaitReqs };
            newTodayWaitReqs[waitReqId].status = "late";
            setTodayWaitReqs(newTodayWaitReqs);
        } catch (error) {
            console.log(error); 
        }
    };

    const done = async (waitReqId) => {
        try {
            const res = await instance.put("/wait/done", { waitReqId });
            let newTodayWaitReqs = { ...todayWaitReqs };
            newTodayWaitReqs[waitReqId].status = "arrived";
            newTodayWaitReqs[waitReqId].isWaiting = false;
            setTodayWaitReqs(newTodayWaitReqs);
        } catch (error) {
            console.log(error);
        }
    };

    const remove = async (waitReqId) => {
        try {
            const res = await instance.put("/wait/remove", { waitReqId });
            let newTodayWaitReqs = { ...todayWaitReqs };
            newTodayWaitReqs[waitReqId].status = "removed";
            setTodayWaitReqs(newTodayWaitReqs);
        } catch (error) {
            console.log(error); 
        }
    };

    const clear = async () => {
        try {
            const res = await instance.put("/wait/clear");

            let newTodayWaitReqs = { ...todayWaitReqs };
            for (const waitReq in newTodayWaitReqs) {
                if (newTodayWaitReqs[waitReq].isWaiting === false) {
                    delete newTodayWaitReqs[waitReq];
                }
            }
            setTodayWaitReqs(newTodayWaitReqs);

            let oldHistoryWaitReqs = { ...historyWaitReqs };
            const newlyAddHistoryWaitReqs = res.data;
            const newHistoryWaitReqs = {
                ...oldHistoryWaitReqs,
                ...newlyAddHistoryWaitReqs,
            };
            setHistoryWaitReqs(newHistoryWaitReqs);

        } catch (error) {
            console.log(error); 
        }
    };

    const removeAll = async () => {
        try {
            const res = await instance.put("/wait/removeAll");
            let oldHistoryWaitReqs = { ...historyWaitReqs };
            const newlyAddHistoryWaitReqs = res.data;
            const newHistoryWaitReqs = {
                ...oldHistoryWaitReqs,
                ...newlyAddHistoryWaitReqs,
            };
            setHistoryWaitReqs(newHistoryWaitReqs);
            setTodayWaitReqs({});
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <WaitContext.Provider value={{
            todayWaitReqs,
            historyWaitReqs,
            notify,
            late,
            done,
            remove,
            clear,
            removeAll,
        }}
        { ...props } />
    )
};

const useWait = () => useContext(WaitContext);

export { WaitProvider, useWait };
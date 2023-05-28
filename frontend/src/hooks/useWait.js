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
        // return {};
        const res = await instance.get('wait/getTodayWait');
        if (res.status === 200) {
            setTodayWaitReqs(res.data);
        } else {
            return null;
        }
    }

    const fetchHistoryWaitReqs = async () => {
        // return {};
        const res = await instance.get('wait/getHistoryWait');
        if (res.status === 200) {
            setHistoryWaitReqs(res.data);
        } else {
            return null;
        }
    }

    useEffect(() => {
        fetchTodayWaitReqs();
        fetchHistoryWaitReqs();
    }, [setHistoryWaitReqs, setTodayWaitReqs]);
 
    const notify = async (waitReqId) => {
        // 更新本地資料

        // 更新 DB 資料
    };

    const late = async (waitReqId) => {
    };

    const done = async (waitReqId) => {
    };

    const remove = async (waitReqId) => {
    };

    const clear = async () => {

    };

    const removeAll = async () => {

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
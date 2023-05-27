import * as React from 'react';

const WaitingListItem = ( {item} ) => {

    const {waitingNumber, lineUserId, status, groupSize, requestMadeTime, requestAnsweredTime, arriveTime, cancelTime} = item;

    const clickNotification = (lineUserId) => {
        console.log("clickNotification, lineUserId", lineUserId);
    }
    
    const clickCheck = (lineUserId) => {
        console.log("clickCheck, lineUserId", lineUserId);
    }
    
    const clickDelete = (lineUserId) => {
        console.log("clickDelete, lineUserId", lineUserId);
    }    

    return (
        <div>
            我是一個 Waiting List 的 Item
        </div>
    )
}

export default WaitingListItem;
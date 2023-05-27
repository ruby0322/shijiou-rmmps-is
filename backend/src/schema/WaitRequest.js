const WaitRequest = class {
    constructor(waitingNumber, lineUserId, isWaiting, status, groupSize, requestMadeTime, requestAnsweredTime, arriveTime, cancelTime) {
        this.waitingNumber = waitingNumber;
        this.lineUserId = lineUserId;
        this.isWaiting = isWaiting;
        this.status = status;
        this.groupSize = groupSize;
        this.requestMadeTime = requestMadeTime;
        this.requestAnsweredTime = requestAnsweredTime;
        this.arriveTime = arriveTime;
        this.cancelTime = cancelTime;
    }
}

export default WaitRequest;
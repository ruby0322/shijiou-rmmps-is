const WaitRequest = class {
    constructor(waitingNumber, lineUserId, status, groupSize, requestMadeTime) {
        this.waitingNumber = waitingNumber;
        this.lineUserId = lineUserId;
        this.isWaiting = true;
        this.status = status;
        this.groupSize = groupSize;
        this.requestMadeTime = requestMadeTime;
        this.requestAnsweredTime = null;
        this.arriveTime = null;
        this.cancelTime = null;
    }
}

export default WaitRequest;
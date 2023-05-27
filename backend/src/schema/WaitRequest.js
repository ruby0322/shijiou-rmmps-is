const WaitRequest = class {
    constructor(waitingNumber, lineUserId, groupSize, requestMadeTime) {
        this.waitingNumber = waitingNumber;
        this.lineUserId = lineUserId;
        this.isWaiting = true;
        this.status = "pending";
        this.groupSize = groupSize;
        this.requestMadeTime = requestMadeTime;
        this.requestAnsweredTime = null;
        this.arriveTime = null;
        this.cancelTime = null;
    }
}

export default WaitRequest;
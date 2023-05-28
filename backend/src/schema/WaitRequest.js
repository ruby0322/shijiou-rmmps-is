const WaitRequest = class {
    constructor(waitingNumber, lineUserId, status, groupSize, requestMadeTime, isWaiting) {
        this.waitingNumber = waitingNumber;
        this.lineUserId = lineUserId;
        this.isWaiting = isWaiting;
        this.status = status;
        this.groupSize = groupSize;
        this.requestMadeTime = requestMadeTime;
        this.requestAnsweredTime = null;
        this.arriveTime = null;
        this.cancelTime = null;
    }

    constructor(waitingNumber, lineUserId, groupSize) {
        this.waitingNumber = waitingNumber;
        this.lineUserId = lineUserId;
        this.isWaiting = true;
        this.status = 'pending';
        this.groupSize = groupSize;
        this.requestMadeTime = Date.now();
        this.requestAnsweredTime = null;
        this.arriveTime = null;
        this.cancelTime = null;
    }
}

export default WaitRequest;
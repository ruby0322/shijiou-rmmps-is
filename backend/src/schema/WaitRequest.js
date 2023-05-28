const WaitRequest = class {
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
const WaitRequest = class {
    constructor(waitingNumber, lineUserId, status, groupSize, requestMadeTime, requestAnsweredTime, arriveTime, cancelTime) {
        this.waitingNumber = waitingNumber;
        this.lineUserId = lineUserId;
        this.status = status;
        this.groupSize = groupSize;
        this.requestMadeTime = requestMadeTime;
        this.requestAnsweredTime = requestAnsweredTime;
        this.arriveTime = arriveTime;
        this.cancelTime = cancelTime;
    }
}

export default WaitRequest;
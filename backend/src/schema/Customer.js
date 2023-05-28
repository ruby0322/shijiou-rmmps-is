const Customer = class {
    constructor(lineUserId) {
        this.lineUserId = lineUserId;
        this.isWaiting  = false;
        this.isRequesting = false;
        this.waitRequestId = null;
    }
}

export default Customer;
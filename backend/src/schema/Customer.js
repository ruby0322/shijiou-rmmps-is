const Customer = class {
    constructor(lineUserId) {
        this.lineUserId = lineUserId;
        this.isWaiting  = false;
        this.isRequesting = false;
    }
}

export default Customer;
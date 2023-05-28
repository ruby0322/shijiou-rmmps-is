const MenuItem = class {
    constructor(itemName, itemCategory, price, description) {
        this.itemName = itemName;
        this.itemCategory = itemCategory;
        this.price = price;
        this.status = "serving"; // serving, soldout
        this.description = (description === undefined ? null : description);
    }
};


export default MenuItem;
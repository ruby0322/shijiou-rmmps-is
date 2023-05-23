const MenuItem = class {
    constructor(itemName, itemCategory, price) {
        this.itemName = itemName;
        this.itemCategory = itemCategory;
        this.price = price;
        this.status = "serving"; // serving, soldout
    }
};

export default MenuItem;
const TodaySpecial = class {
    constructor(itemName, itemCategory, price) {
        this.itemName = itemName;
        this.itemCategory = itemCategory;
        this.price = price;
        this.status = "serving";
    }
};

export default TodaySpecial;
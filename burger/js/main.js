class Hamburger {
    /**
     * 
     * @param {string} size S - маленький, L - большой
     * @param {string} stuffing cheese - с сыром, salat - с салатом, potato - с картофелем
     */
    constructor(size, stuffing) {
        this.size = size;
        this.stuffing = stuffing;
        this.flavored = false;
        this.mayo = false;
        this.price = this.calculatePrice();
        this.calories = this.calculateCalories();
    }
    addTopping(topping) {
        switch (topping) {
            case "flavoring":
                if (!this.flavored) {
                    this.price += 15;
                    this.flavored = true;
                }
                break;
            case "mayo":
                if (!this.mayo) {
                    this.price += 20;
                    this.calories += 5;
                    this.mayo = true;
                }
                break;
        }
    }   // Добавить добавку }
    removeTopping(topping) {
        switch (topping) {
            case "flavoring":
                if (this.flavored) {
                    this.price -= 15;
                    this.flavored = false;
                }
                break;
            case "mayo":
                if (this.mayo) {
                    this.price -= 20;
                    this.calories -= 5;
                    this.mayo = false;
                }
                break;
        }
    } // Убрать добавку }
    getToppings(topping) {
        return `Flavored: ${this.flavored}, Mayo: ${this.mayo}`;
    }   // Получить список добавок }
    getSize() {
        return `Size: ${this.size}`;
    }              // Узнать размер гамбургера }
    getStuffing() {
        return `Stuffing: ${this.stuffing}`;
    }          // Узнать начинку гамбургера }
    calculatePrice() {
        let price = 0;
        switch (this.size) {
            case 'S':
                price += 50;
                break;
            case 'L':
                price += 100;
                break;
        }
        switch (this.stuffing) {
            case 'cheese':
                price += 10;
                break;
            case 'salat':
                price += 20;
                break;
            case 'potato':
                price += 15;
                break;
        }
        if (this.flavored) {
            price += 15;
        }
        if (this.mayo) {
            price += 20;
        }
        return price;
    }       // Узнать цену }
    calculateCalories() {
        let calories = 0;
        switch (this.size) {
            case 'S':
                calories += 20;
                break;
            case 'L':
                calories += 40;
                break;
        }
        switch (this.stuffing) {
            case 'cheese':
                calories += 20;
                break;
            case 'salat':
                calories += 5;
                break;
            case 'potato':
                calories += 10;
                break;
        }
        if (this.mayo) {
            calories += 5;
        }
        return calories;
    }    // Узнать калорийность }
}

const hamburger = new Hamburger('L', 'salat');
console.log(hamburger.price, hamburger.calories);

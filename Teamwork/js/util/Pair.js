export class Pair {


    constructor(name, askPrice) {
        this._name = name;
        this._askPrice = askPrice;
    }


    get name() {
        return this._name;
    }

    get askPrice() {
        return this._askPrice;
    }

}
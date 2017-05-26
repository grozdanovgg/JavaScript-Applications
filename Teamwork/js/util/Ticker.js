export class Ticker {

    constructor(name) {
        this._name = name;
    }


    get name() {
        return this._name;
    }


    set minPricePair(pair) {
        Validator.string(pair);
        Validator.stringLength(pair, 6, 8);
        this._minPricePair = pair;

    }
    get minPricePair() {
        return this._minPricePair;
    }


    set minPrice(price) {
        Validator.isNumeric(price);
        this._minPrice = price;
    }
    get minPrice() {
        return this._minPrice;
    }


    set maxPricePair(pair) {
        Validator.string(pair);
        Validator.stringLength(pair, 6, 8);
        this._maxPricePair = pair;
    }
    get maxPricePair() {
        return this._maxPricePair;
    }


    set maxPrice(price) {
        Validator.isNumeric(price);
        this._maxPrice = price;
    }
    get maxPrice() {
        return this._maxPrice;
    }


    set pricesInEuro(pricesObj) {
        this._pricesInEuro = pricesObj;
    }
    get pricesInEuro() {
        return this._pricesInEuro;
    }
}



class Validator {

    static string(input) {
        if (typeof input !== 'string') {
            throw Error('input is not a string');
        }
    }
    static stringLength(input, minLength, maxlength) {
        if (input.length < minLength || input.length > maxlength) {
            throw Error('input is below or above lenght limit')
        }
    }
    static isNumeric(input) {
        if (isNaN(input)) {
            throw Error('input is not a number')
        }
    }
}
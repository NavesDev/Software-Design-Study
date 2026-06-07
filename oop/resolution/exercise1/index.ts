// ENCAPSULATION EXERCISE
// Getters, setters and private properties
import { 
    ValueMustBeGraterOrEqualsMinNumberError, 
    ValueMustBeGreaterThanMinNumberError, 
    StringEmptyError, 
    QuantityGreaterOrEqualsStock,
    DiscountSmallerOrEqualsMaximumDiscount,
    MaximumDiscountGreaterThanExpectedError
} from "./error";

import { 
    LIMITS, 
    PROPERTIES 
} from "./constants";

export class Product {

    private _name!: string;
    private _price!: number;
    private _stockQuantity: number;
    private _maximumDiscount!: number;

    constructor(name:string, price:number, stockQuantity:number, maximumDiscount:number){
        this.name = name;
        this.price = price;
        this.maximumDiscount = maximumDiscount;
        
        this._stockQuantity = 0;
        if(stockQuantity > LIMITS.MIN_NUMBER){
            this.addStock(stockQuantity)
        } else{
            throw new ValueMustBeGreaterThanMinNumberError(PROPERTIES.STOCK_QUANTITY);
        }
    }

    set name(newName:string){
        if (newName != ""){
            this._name = newName;
        } else {
            throw new StringEmptyError(PROPERTIES.NAME);
        }
    }

    get name(){
        return this._name;
    }

    set price(newPrice:number){
        if (newPrice > LIMITS.MIN_NUMBER){
            this._price = newPrice;
        } else {
            throw new ValueMustBeGreaterThanMinNumberError(PROPERTIES.PRICE);
        }
    }

    get price(){
        return this._price;
    }

    get stockQuantity(){
        return this._stockQuantity;
    }

    set maximumDiscount(newMaximumDiscount:number){
        if(newMaximumDiscount <= LIMITS.MAX_DISCOUNT && newMaximumDiscount >= LIMITS.MIN_NUMBER){
            this._maximumDiscount = newMaximumDiscount;
        } else if (newMaximumDiscount<0){
            throw new ValueMustBeGraterOrEqualsMinNumberError(PROPERTIES.MAXIMUM_DISCOUNT);
        } else {
            throw new MaximumDiscountGreaterThanExpectedError()
        }
    }     

    get maximumDiscount(){
        return this._maximumDiscount;
    }

    public addStock(quantity:number):void {
        if(quantity > LIMITS.MIN_NUMBER){
            this._stockQuantity += quantity;
        } else {
            throw new ValueMustBeGreaterThanMinNumberError(PROPERTIES.QUANTITY);
        }
    }

    public removeStock(quantity:number):void{
        if(quantity >= LIMITS.MIN_NUMBER && this._stockQuantity >= quantity){
            this._stockQuantity -= quantity;
        } else if(quantity < 0){
            throw new ValueMustBeGreaterThanMinNumberError(PROPERTIES.QUANTITY);
        } else {
            throw new QuantityGreaterOrEqualsStock()
        }
    }

    public calculatePriceWithDiscount(discount:number):number{
        if (discount >= LIMITS.MIN_NUMBER && discount <= this._maximumDiscount){
            return this._price - (this._price * discount);
        } else if (discount > this._maximumDiscount){
            throw new DiscountSmallerOrEqualsMaximumDiscount();
        } else {
            throw new ValueMustBeGraterOrEqualsMinNumberError(PROPERTIES.DISCOUNT);
        }
    }

}
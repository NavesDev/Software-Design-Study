// ENCAPSULATION EXERCISE
// Getters, setters and private properties

export class Product {

    private _name: string;
    private _price: number;
    private _stockQuantity: number;
    private _maximumDiscount: number;

    constructor(name:string, price:number, stockQuantity:number, maximumDiscount:number){
        this._name = name;
        this._price = price;
        this._stockQuantity = stockQuantity;
        this._maximumDiscount = maximumDiscount;
    }

    set name(newName:string){
        if (newName != ""){
            this._name = newName;
        } else {
            throw new Error("The product name cannot be empty.");
        }
    }

    get name(){
        return this._name;
    }

    set price(newPrice:number){
        if (newPrice > 0){
            this._price = newPrice;
        } else {
            throw new RangeError("The price must be greater than '0'.");
        }
    }

    get price(){
        return this._price;
    }

    get stockQuantity(){
        return this._stockQuantity;
    }

    set maximumDiscount(newMaximumDiscount:number){
        if(newMaximumDiscount <= 0.5 && newMaximumDiscount >=0){
            this._maximumDiscount = newMaximumDiscount;
        } else {
            throw new RangeError("The maximum discount must be greater or equals '0' and not should be greater than '0.5'");
        }
    }     

    get maximumDiscount(){
        return this._maximumDiscount;
    }

    public addStock(quantity:number):void {
        if(quantity > 0){
            this._stockQuantity += quantity;
        } else {
            throw new RangeError("The quantity must be greater than '0'")
        }
    }

    public removeStock(quantity:number):void{
        if(quantity >= 0 && this._stockQuantity >= quantity){
            this._stockQuantity -= quantity;
        } else if(quantity < 0){
            throw new RangeError("The quantity must bbe greater than '0'")
        } else {
            throw new Error("The quantity is greater than the stock")
        }
    }

    public calculatePriceWithDiscount(discount:number):number{
        if (discount >= 0 && discount <= this._maximumDiscount){
            return this._price - (this._price * discount);
        } else if (discount > this._maximumDiscount){
            throw new Error(`The discount should be smaller than the maximum discount (${this._maximumDiscount})`)
        } else {
            throw new RangeError("The discount should be greater than '0'")
        }
    }

}
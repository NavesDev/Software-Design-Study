import { LIMITS, PROPERTIES } from "./constants"

export class ValueMustBeGreaterThanMinNumberError extends RangeError{
    constructor(property:string) {
        super(`The ${property} must be greater than '${LIMITS.MIN_NUMBER}'`);
    }
}

export class ValueMustBeGraterOrEqualsMinNumberError extends RangeError{
    constructor(property:string){
        super(`The ${property} must be greater or equals '${LIMITS.MIN_NUMBER}'`);
    }
}

export class StringEmptyError extends Error{
    constructor(property:string){
        super(`The ${property} cannot be empty`);
    }
}

export class QuantityGreaterOrEqualsStock extends RangeError{
    constructor(){
        super(`The ${PROPERTIES.STOCK_QUANTITY} must be greater or equals ${PROPERTIES.QUANTITY}`)
    }
}

export class DiscountSmallerOrEqualsMaximumDiscount extends RangeError{
    constructor(){
        super(`The ${PROPERTIES.DISCOUNT} must be smaller or equals ${PROPERTIES.MAXIMUM_DISCOUNT}`)
    }
}

export class MaximumDiscountGreaterThanExpectedError extends RangeError{
    constructor(){
        super(`The ${PROPERTIES.MAXIMUM_DISCOUNT} must be smaller than ${LIMITS.MAX_DISCOUNT}`)
    }
}
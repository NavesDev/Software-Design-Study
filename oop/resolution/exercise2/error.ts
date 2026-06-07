export class ValueSmallerOrEqualsZeroError extends Error{
    constructor(property:string = "value"){
        super(`The ${property} is smaller or equals zero.`);
    }
}
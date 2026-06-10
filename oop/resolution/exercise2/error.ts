export class ValueSmallerOrEqualsZeroError extends RangeError{
    constructor(property:string = "value"){
        super(`The ${property} is smaller or equals zero.`);
    }
}

export class ValueSmallerThanZeroError extends RangeError{
    constructor(property:string = "value"){
        super(`The ${property} is smaller than zero.`);
    }
}

export class NoProofAvaliableError extends Error{
    constructor(){
        super("No proof available, needs to process first.");
    }
}
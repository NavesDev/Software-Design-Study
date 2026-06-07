export class ValueSmallerOrEqualsZeroError extends Error{
    constructor(property:string = "value"){
        super(`The ${property} is smaller or equals zero.`);
    }
}

export class NoProofAvaliableError extends Error{
    constructor(){
        super("No proof available, needs to process first.");
    }
}
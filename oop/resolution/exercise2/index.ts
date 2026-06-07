// ABSTRACTION AND POLYMORPHISM

import { ValueSmallerOrEqualsZeroError } from "./error";
import { PROOFS } from "./constants";
import {randomUUID} from "crypto";


interface PaymentMethod{
    process(value:number):void,
    obtainProof():string
}

abstract class Payment{
    protected validateNumber(value:number){
        if(value<=0){
            throw new ValueSmallerOrEqualsZeroError()
        }
    }
}

export class PixPayment extends Payment implements PaymentMethod{
    private _finalValue:number = 0;
    private _pixKey:string = "";

    get finalValue(){
        return this._finalValue;
    }

    get pixKey(){
        return this._pixKey;
    }

    public process(value: number): void {
        this.validateNumber(value);
        this._finalValue = value;
        this._pixKey = randomUUID();
    }

    public obtainProof(): string {
        return PROOFS.PIX(this.pixKey,this.finalValue);
    }
}
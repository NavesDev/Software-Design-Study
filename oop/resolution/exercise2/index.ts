// ABSTRACTION AND POLYMORPHISM

import { NoProofAvaliableError, ValueSmallerOrEqualsZeroError, ValueSmallerThanZeroError } from "./error";
import { PROOFS } from "./constants";
import {randomUUID} from "crypto";

interface PaymentMethod{
    process(value:number):void,
    obtainProof():string
}

abstract class Payment{
    protected validateNumber(value:number){
        if(value<=0){
            throw new ValueSmallerOrEqualsZeroError();
        }
    }
    protected validateFeeRate(feeRate:number):void{
        if(feeRate < 0){
            throw new ValueSmallerThanZeroError;
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
        if(this._pixKey == ""){
            throw new NoProofAvaliableError();
        }
        return PROOFS.PIX(this.pixKey,this.finalValue);
    }
}

export class CardPayment extends Payment implements PaymentMethod{
    private _finalValue:number = 0;
    private _authCode:string = "";
    private _feeRate:number;

    constructor(feeRate:number){
        super();

        this.validateFeeRate(feeRate);
        this._feeRate = feeRate;
    }

    get finalValue(){
        return this._finalValue;
    }

    get authCode(){
        return this._authCode;
    }

    get feeRate(){
        return this._feeRate;
    }

    public process(value: number): void {
        this.validateNumber(value);
        this._finalValue = value * (this._feeRate + 1);
        this._authCode = Math.random().toString(36).substring(2,8).toUpperCase(); // Six digit alphanumeric code
    }

    public obtainProof(): string {
        if(this._authCode == ""){
            throw new NoProofAvaliableError();
        }
        return PROOFS.CARD(this._authCode,this._finalValue);
    }
}
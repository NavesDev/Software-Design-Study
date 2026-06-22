// ABSTRACTION AND POLYMORPHISM

import { NoProofAvaliableError, ValueSmallerOrEqualsZeroError, ValueSmallerThanZeroError } from "./error";
import { PROOFS, BOLETO_FEE } from "./constants";
import {randomUUID} from "crypto";

interface PaymentMethod{
    process(value:number):void,
    obtainProof():string
}

abstract class Payment{
    private _finalValue:number = 0;

    public get finalValue(){
        return this._finalValue;
    }

    protected set finalValue(value:number){
        this.validateNumber(value);
        this._finalValue = value;
    }

    private validateNumber(value:number){
        if(value<=0){
            throw new ValueSmallerOrEqualsZeroError();
        }
    }
}

// Payment method from Brazil
export class PixPayment extends Payment implements PaymentMethod{
    private _pixKey:string = "";

    public get pixKey(){
        return this._pixKey;
    }

    public process(value: number): void {
        this.finalValue = value;
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
    private _authCode:string = "";
    private _feeRate:number;

    constructor(feeRate:number){
        super();

        this.validateFeeRate(feeRate);
        this._feeRate = feeRate;
    }

    public get authCode(){
        return this._authCode;
    }

    public get feeRate(){
        return this._feeRate;
    }

    public process(value: number): void {
        this.finalValue = value * (this._feeRate + 1);
        this._authCode = Math.random().toString(36).substring(2,8).toUpperCase(); // Six digit alphanumeric code
    }

    public obtainProof(): string {
        if(this._authCode == ""){
            throw new NoProofAvaliableError();
        }
        return PROOFS.CARD(this._authCode,this.finalValue);
    }

    private validateFeeRate(feeRate:number):void{
        if(feeRate < 0){
            throw new ValueSmallerThanZeroError;
        }
    }
}

// Payment method from Brazil
export class BoletoPayment extends Payment implements PaymentMethod{
    private _boletoFee:number = BOLETO_FEE;
    private _barCode:string = "";

    public get barCode(){
        return this._barCode;
    };

    public process(value: number):void{
        this.finalValue = value;
        this.finalValue += this._boletoFee;     
        this._barCode = this.generateBarCode(); 
    }

    public obtainProof(): string {
        if(this._barCode == ""){
            throw new NoProofAvaliableError();
        }

        return PROOFS.BOLETO(this._barCode, this.finalValue)
    }

    private generateBarCode(): string {
        const randomBlock = ():number => Math.floor(Math.random() * 90000 + 10000);
        return `00090.${randomBlock()} ${randomBlock()}.${randomBlock()} ${randomBlock()}.${randomBlock()} 1 12340000000000`;
}

}
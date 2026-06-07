import {describe, test, expect, beforeEach} from "vitest"
import { PixPayment } from ".";
import { PROOFS } from "./constants"; 
import { ValueSmallerOrEqualsZeroError } from "./error";

describe("Pix Payment Test",()=> {
    let pixPayment:PixPayment;

    beforeEach(()=>{
        pixPayment = new PixPayment();
    })

    test("should process payment when value is positive",()=>{
        //Arrange
        const value = 100;
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

        //Act
        pixPayment.process(value);

        //Assert
        expect(pixPayment.finalValue).toBe(value);
        expect(pixPayment.pixKey).toMatch(uuidRegex);
    });

    test("should throw an error when value is smaller or equals zero",()=>{
        //Arrange
        const value = -100;

        //Act
        const act = ()=>{
            pixPayment.process(value);
        }

        //Assert
        expect(act).toThrow(ValueSmallerOrEqualsZeroError);
    })

    test("should show a receipt when it has",()=>{
        //Arrange
        const value = 100;

        //Act
        pixPayment.process(value);
        const proof = pixPayment.obtainProof();

        //Assert
        expect(proof).toBe(PROOFS.PIX(pixPayment.pixKey, pixPayment.finalValue));
    })
})
import {describe, test, expect, beforeEach} from "vitest"
import { PixPayment, CardPayment, BoletoPayment } from ".";
import { PROOFS, BOLETO_FEE } from "./constants"; 
import { ValueSmallerOrEqualsZeroError, ValueSmallerThanZeroError, NoProofAvaliableError } from "./error";


describe("Pix Payment Test",()=> {
    let pixPayment:PixPayment;

    beforeEach(()=>{
        pixPayment = new PixPayment();
    })

    test("should process payment when value >  0",()=>{
        //Arrange
        const value = 100;
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

        //Act
        pixPayment.process(value);

        //Assert
        expect(pixPayment.finalValue).toBe(value);
        expect(pixPayment.pixKey).toMatch(uuidRegex);
    });

    test("should throw an error when value <= zero",()=>{
        //Arrange
        const value = -100;

        //Act
        const act = ()=>{
            pixPayment.process(value);
        }

        //Assert
        expect(act).toThrow(ValueSmallerOrEqualsZeroError);
    })

    test("should throw an error when value == zero",()=>{
        //Arrange
        const value = 0;

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
    });

    test("should throw an exception when not processed",()=>{
        //Arrange
        const value = 100;

        //Act
        const act =()=>{
            const proof = pixPayment.obtainProof();
        }
        
        //Assert
        expect(act).toThrow(NoProofAvaliableError);
    });
})

describe("Card Payment Constructor Test",()=>{
    test("should add feeRate when is a valid value",()=>{
        //Arrange
        const feeRate = 0.2; 

        //Act
        const cardPayment = new CardPayment(feeRate);

        //Assert
        expect(cardPayment.feeRate).toBe(feeRate);
    });

    test("should throw an exception when fee rate < 0",()=>{
        //Arrange
        const feeRate = -0.2; 

        //Act
        const act = ()=>{new CardPayment(feeRate)};

        //Assert
        expect(act).toThrow(ValueSmallerThanZeroError);
    });
});

describe("Card Payment Test",()=> {
    let cardPayment:CardPayment;

    beforeEach(()=>{
        const feeRate = 0.2;

        cardPayment = new CardPayment(feeRate);
        
    })

    test("should process when is a valid value",()=>{
        //Arrange
        const value = 100;
        const authCodeRegex = /^[a-zA-Z0-9]{6}$/; 

        //Act 
        cardPayment.process(value);

        //Asseert
        expect(cardPayment.finalValue).toBe(value * (1 + cardPayment.feeRate));
        expect(cardPayment.authCode).toMatch(authCodeRegex);
    });

    test("should throw an exception when value == 0",()=>{
        //Arrange
        const value = 0;

        //Act 
        const act = ()=>{
            cardPayment.process(value);
        }

        //Assert
        expect(act).toThrow(ValueSmallerOrEqualsZeroError);
    });

    test("should throw an exception when value < 0",()=>{
        //Arrange
        const value = -100;

        //Act 
        const act = ()=>{
            cardPayment.process(value);
        }

        //Assert
        expect(act).toThrow(ValueSmallerOrEqualsZeroError);
    });

    test("should show proof when processed",()=>{
         //Arrange
        const value = 100;

        //Act 
        cardPayment.process(value);
        const proof = cardPayment.obtainProof();

        //Asseert
        expect(proof).toBe(PROOFS.CARD(cardPayment.authCode,cardPayment.finalValue));
    });

    test("should throw an exception when not processed",()=>{
        //Arrange

        //Act 
        const act = ()=>{cardPayment.obtainProof();} 

        //Asseert
        expect(act).toThrow(NoProofAvaliableError);
    });

});

describe("Boleto Payment Test",()=> {
    let boletoPayment:BoletoPayment;

    beforeEach(()=>{
        boletoPayment = new BoletoPayment();
    })

    test("should process payment when value >  0",()=>{
        //Arrange
        const value = 100;
        const barCodeRegex = /^00090\.\d{5} \d{5}\.\d{5} \d{5}\.\d{5} 1 12340000000000$/;

        //Act
        boletoPayment.process(value);

        //Assert
        expect(boletoPayment.finalValue).toBe(value + BOLETO_FEE);
        expect(boletoPayment.barCode).toMatch(barCodeRegex);
    });

    test("should throw an error when value <= zero",()=>{
        //Arrange
        const value = -100;

        //Act
        const act = ()=>{
            boletoPayment.process(value);
        }

        //Assert
        expect(act).toThrow(ValueSmallerOrEqualsZeroError);
    })

    test("should throw an error when value == zero",()=>{
        //Arrange
        const value = 0;

        //Act
        const act = ()=>{
            boletoPayment.process(value);
        }

        //Assert
        expect(act).toThrow(ValueSmallerOrEqualsZeroError);
    })

    test("should show a receipt when it has",()=>{
        //Arrange
        const value = 100;

        //Act
        boletoPayment.process(value);
        const proof = boletoPayment.obtainProof();

        //Assert
        expect(proof).toBe(PROOFS.BOLETO(boletoPayment.barCode, boletoPayment.finalValue));
    });

    test("should throw an exception when not processed",()=>{
        //Arrange
        const value = 100;

        //Act
        const act =()=>{
            const proof = boletoPayment.obtainProof();
        }
        
        //Assert
        expect(act).toThrow(NoProofAvaliableError);
    });
})

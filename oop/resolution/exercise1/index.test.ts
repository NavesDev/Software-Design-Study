import { describe, test, expect, beforeEach } from 'vitest';
import { Product } from '.';

describe("Product Class", ()=>{
    let product:Product;

    beforeEach(()=>{
        product = new Product("Personal Computer",1500.90,15,0.2)
    })

    test("should change name when a valid name provided",()=>{
        //Arrange
        const newName = "PC"

        //Act
        product.name = newName

        //Assert
        expect(product.name).toBe(newName)
    })

    test("should throw an error when name is empty",()=>{
        //Arrange
        const newName = ""

        //Act
        const act = ()=>{
            product.name = newName;
        }
        
        //Assert
        expect(act).toThrow()
    })

    test("should remove stock when quantity is a valid value",()=>{
        //Arrange
        const quantity = 13;

        //Act
        product.removeStock(quantity)
        
        //Assert
        expect(product.stockQuantity).toBe(2)
    })

    test("should throw an error when quantity is greater than stock quantity", ()=>{
        //Arrange
        const quantity = 16;

        //Act
        const act = ()=>{
            product.removeStock(16)
        }
        
        //Assert
        expect(act).toThrow()
    })

    test("should throw an error when quantity is smaller than '0'",()=>{
        //Arrange
        const quantity = -1;

        //Act
        const act = ()=>{
            product.removeStock(quantity)
        }
        
        //Assert
        expect(act).toThrow()
    })

    test("should calculate price with discount when discount is a valid value",()=>{
        //Arrange
        const discount = 0.15
        const expectedValue = product.price - (product.price * discount)


        //Act
        const finalPrice = product.calculatePriceWithDiscount(discount)

        //Assert
        expect(finalPrice).toBe(expectedValue)
    })
})
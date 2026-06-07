import { describe, test, expect } from 'vitest';
import { Product } from './exercise1';

describe("Product Class", ()=>{
    test("should change name when a valid name provided",()=>{
        //Arrange
        const product = new Product("Personal Computer",1500.90,15,0.2)
        
        //Act
        product.name = "PC"

        //Assert
        expect(product.name).toBe("PC")
    })

    test("should thrown an error when name is empty",()=>{
        //Arrange
        const product = new Product("Personal Computer",1500.90,15,0.2)

        //Act
        const act = ()=>{
            product.name = "";
        }
        
        //Assert
        expect(act).toThrow()
    })

    test("should remove stock when quantity is a valid value",()=>{
        //Arrange
        const product = new Product("Personal Computer",1500.90,15,0.2)

        //Act
        product.removeStock(13)
        
        //Assert
        expect(product.stockQuantity).toBe(2)
    })

    test("should throw an error when quantity is greater than stock quantity", ()=>{
        //Arrange
        const product = new Product("Personal Computer",1500.90,15,0.2)

        //Act
        const act = ()=>{
            product.removeStock(16)
        }
        
        //Assert
        expect(act).toThrow()
    })

    test("should throw an error when quantity is smaller than '0'",()=>{
        //Arrange
        const product = new Product("Personal Computer",1500.90,15,0.2)

        //Act
        const act = ()=>{
            product.removeStock(-1)
        }
        
        //Assert
        expect(act).toThrow()
    })
})
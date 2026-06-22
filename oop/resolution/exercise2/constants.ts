export const PROOFS = {
    PIX:(pixKey:string,finalValue:number)=>{
        return `**Payment Confirmed**\n- Pix Key: ${pixKey}\n- Value: ${finalValue}`
    },
    CARD:(authCode:string,finalValue:number)=>{
        return `**Payment Confirmed**\n- Auth Code: ${authCode}\n- Value: ${finalValue}`;
    },
    BOLETO:(barCode:string, finalValue:number)=>{
        return `**Payment Confirmed**\n- Value: ${finalValue}\n- Bar code: ${barCode}\n\n!! Payment may take up to 3 business days to be confirmed`;
    }
}

export const BOLETO_FEE:number = 2;
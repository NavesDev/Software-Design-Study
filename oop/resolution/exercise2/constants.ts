export const PROOFS = {
    PIX:(pixKey:string,finalValue:number)=>{
        return `**Payment Confirmed**\n- Pix Key: ${pixKey}\n- Value: ${finalValue}`
    },
    CARD:(authCode:string,finalValue:number)=>{
        return `**Payment Confirmed**\n- Auth Code: ${authCode}\n- Value: ${finalValue}`;
    }
}

export const PROPERTIES = {
    
}
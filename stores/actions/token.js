export const SAVE_TOKEN = 'SAVE_TOKEN'

export const saveToken = (token) =>{
    return{
        type: SAVE_TOKEN,token : token
    }
}
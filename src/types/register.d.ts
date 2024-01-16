export interface ISmsSendCode{
    code:string,
    [prop:string]:string
}
export interface ISmsSendCheck{
    ACK:string,
}
export interface IUserRegister{
    phone:number,
    username:string,
    password:string,
    code:string
}
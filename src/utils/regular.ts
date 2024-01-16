// 正则
export const PHONE_REG =/^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1589]))\d{8}$/
export const USERNAME_REG = /^[A-Za-z0-9]{6,18}$/
export const PWD_REG = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[@#$%&*?.]).{8,16}$/
export const SmsCode_REG = /^\d{6}$/
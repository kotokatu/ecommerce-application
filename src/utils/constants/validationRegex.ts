export const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
export const onlyLettersRegex = /^[\p{L}]+$/u;
export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?!.*\s)(?=.*[!@#$%^&*()-=_+|;':",.<>/?]).{8,}$/;
export const postalCodeRegex = /\b\d{5}\b$/;

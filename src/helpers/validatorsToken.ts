import {ICard} from "../interfaces/ICard";
import {AMEX, MASTERCARD, regex, VISA} from "../utils/constants";

export const validatorCard = (bodyJson: ICard) => {
    let messageError = "";

    if (!validarTarjetaLuhn(bodyJson.card_number)) {
        return messageError = `El numero de tarjeta ${bodyJson.card_number} no pertenece a Visa / Mastercad / Amex`;
    }
    if (!validateCvv(bodyJson.cvv)) {
        return messageError = `El cvv ${bodyJson.cvv} debe ser de 3 (Visa/Mastercad) o 4 digitos(Amex)`;
    }
    if (!validateMonth(bodyJson.expiration_month)) {
        return messageError = `${bodyJson.expiration_month} no es un mes que sea entre Enero - Diciembre`;
    }
    if (!validateYear(bodyJson.expiration_year)) {
        return messageError = `El año ${bodyJson.expiration_year} no es del año actual ni esta en un rango de 5 año mas`;
    }
    if (!validateEmail(bodyJson.email)) {
        return messageError = `El correo ${bodyJson.email} no es un mail valido (solo son validos con dominios “gmail.com”, “hotmail.com”, “yahoo.es`;
    }

    return messageError;
};

export const validarTarjetaLuhn = (card_number: number) => {
    return VISA.test(card_number.toString()) || MASTERCARD.test(card_number.toString()) || AMEX.test(card_number.toString());
};

export const validateCvv = (cvv: number) => {
    return cvv.toString().length >= 3 && cvv.toString().length <= 4;
};

export const validateMonth = (numberMount: string) => {
    return (parseInt(numberMount) >= 1 && parseInt(numberMount) <= 12);
};

export const validateYear = (expiration_year: string) => {
    const today = new Date();
    const currentYear = today.getFullYear();
    return parseInt(expiration_year) >= currentYear && parseInt(expiration_year) <= currentYear + 5;
};

export const validateEmail = (data: string) => {
    return regex.test(data);
};

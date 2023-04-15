import {letterAndNumbers} from "../utils/constants";

export const validateTokenAuth = (token: string) => {
    let messageError = "";
    if (token === "") {
        return "Debe mandar un token de autorizacion valido o con data";
    }
    if (!token.includes("pk_test_")) {
        return messageError = `El token ${token} no cumple con el formato pk_test_`;
    }
    return messageError;
};

export const validarToken = (token = "") => {
    let messageError = "";
    if (token.length !== 16) {
        return messageError = "El token debe tener 16 digitos";
    }

    const arrayLetraMinusculaNumero = letterAndNumbers;
    const tokenMinuscula = Array.from(token).map(data => data.toLowerCase());
    let error;

    for (let i = 0; i < tokenMinuscula.length; i++) {
        if (arrayLetraMinusculaNumero.includes(tokenMinuscula[i])) {
            error = false;
        } else {
            error = true;
            break;
        }
    }

    if (error) {
        return "El token no cumple con sus requisitos (tener 16 caracteres, donde utiliza números, letras minúsculas, letras mayúsculas)";
    }
    return messageError;
};

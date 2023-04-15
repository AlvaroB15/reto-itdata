import {minuscula, numeros} from "../utils/constants";

export const createToken = () => {

    const arrayLetraMinuscula = minuscula;
    const arrayLetraMayuscula = arrayLetraMinuscula.map(data => data.toUpperCase());
    const arrayTotal = [...(numeros), ...arrayLetraMinuscula, ...arrayLetraMayuscula];

    let token = "";
    const min = Math.ceil(0);
    const max = Math.floor(61);

    for (let i = 1; i <= 16; i++) {
        const indice = Math.floor(Math.random() * (max - min + 1) + min);
        token += arrayTotal[indice];
    }

    return token;
};

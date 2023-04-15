import {ICard, IRequest} from "../interfaces/ICard";
import {Card} from "../models/Card";
import {validarToken, validateTokenAuth} from "../helpers/validatorsCard";

export const getDataCard = async (bodyString: string, tokenAuth: string | string[] | undefined = "") => {

    let message = "";
    let data: ICard | [] | null;
    let error = false;

    const tokenGenerado = JSON.parse(bodyString);
    const valTokenAuth = validateTokenAuth(tokenAuth.toString());
    const valToken = validarToken(tokenGenerado.token);

    try {

        if (valToken != "") {
            throw valToken;
            // throw new Error(valToken);
        }
        if (valTokenAuth != "") {
            throw valTokenAuth;
        }
        data = await Card.findOne({token: tokenGenerado.token})
            .select("-_id card_number expiration_month expiration_year email token").lean();

        if (data !== null) {
            message = `Se encontro correctamente el registro del token ${tokenGenerado.token}`;
        } else {
            message = "No se encontro el token, recuerde que cada 1 minuto se borra el registro, intente generar un token de nuevo";
            data = [];
        }

    } catch (err) {
        message = "" + err;
        error = true;
        data = [];
    }

    const dataSent: IRequest = {
        message,
        data,
        error
    };

    return dataSent;
};

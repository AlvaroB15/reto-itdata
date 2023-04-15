import {ICard, IRequest} from "../interfaces/ICard";
import {Card} from "../models/Card";
import { validatorCard} from "../helpers/validatorsToken";
import {validateTokenAuth} from "../helpers/validatorsCard";

export const postDataCardGenerateToken = async (body: string, tokenGenerado: string, tokenAuth: string | string[] | undefined = "") => {

    let message = "";
    let data: ICard | [];
    let error = false;
    const bodyJson = JSON.parse(body);
    bodyJson["token"] = tokenGenerado;

    const dataValidator = validatorCard(bodyJson);
    const valTokenAuth = validateTokenAuth(tokenAuth.toString());

    try {
        if (dataValidator != "") {
            throw dataValidator;
        }
        if (valTokenAuth != "") {
            throw valTokenAuth;
        }
        const card = new Card(bodyJson);
        data = await card.save();
        message = "Se registró correctamente";

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

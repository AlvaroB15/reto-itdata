import {IncomingMessage, ServerResponse} from "http";
import {createToken} from "../helpers/createToken";
import {postDataCardGenerateToken} from "../controller/tokenController";
import {getDataCard} from "../controller/cardController";
import {IRequest} from "../interfaces/ICard";

export const handleToken = (req: IncomingMessage, res: ServerResponse) => {

    if (req.method === "POST") {
        handleRequest(req, res, "handleToken");
    } else {
        res.writeHead(404);
        res.write(JSON.stringify({error: "No hay request GET para este uri"}));
        res.end();
    }
};

export const handleCard = (req: IncomingMessage, res: ServerResponse) => {

    if (req.method === "GET") {
        handleRequest(req, res, "handleCard");
    } else {
        res.writeHead(404);
        res.write(JSON.stringify({error: "No hay request POST para este uri"}));
        res.end();
    }
};

const handleRequest = (req: IncomingMessage, res: ServerResponse, metodo: string) => {

    const tokenAuth: string | string[] | undefined = req.headers.token_authorization ? req.headers.token_authorization : "";

    if (tokenAuth === "") {
        res.write(JSON.stringify({
            error: {message: "Es obligatorio mandar un header de nombre 'token_authorization'"}
        }));
        res.end();
        return;
    }

    const body: Buffer[] = [];
    let bodyString = "";

    req.on("error", (err) => {
        console.error(err);
    }).on("data", (chunk) => {
        body.push(chunk);
    }).on("end", async () => {

        bodyString = Buffer.concat(body).toString();
        let dataResponse: IRequest = {
            message: "",
            data: {
                card_number: 0,
                cvv: 0,
                expiration_month: "",
                expiration_year: "",
                email: ""
            },
            error: false,
        };

        if (metodo === "handleToken") {
            const tokenGenerado = createToken();
            dataResponse = await postDataCardGenerateToken(bodyString, tokenGenerado, tokenAuth);
        }

        if (metodo === "handleCard") {
            dataResponse = await getDataCard(bodyString, tokenAuth);
        }

        res.writeHead(200, {"Content-Type": "application/json"});

        if (!dataResponse.error) {
            res.write(JSON.stringify({
                message: dataResponse.message,
                data: dataResponse.data
            }));
            res.end();
        } else {
            res.write(JSON.stringify({
                error: {message: dataResponse.message}
            }));
            res.end();
        }

    });
};
